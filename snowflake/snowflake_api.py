import unicodedata
import logging
import requests
import os
import os
import unicodedata
import requests  # type: ignore
from urllib.parse import quote_plus
from dotenv import load_dotenv  # type: ignore
load_dotenv()
import snowflake.connector # type: ignore
connector = snowflake.connector

# —————————————————————————————————————————————
# Make sure these env vars are in your .env:
# SNOWFLAKE_ACCOUNT   (e.g. PPJDCEB-NEB17744 or PPJDCEB-NEB17744.snowflakecomputing.com)
# SNOWFLAKE_USERNAME
# SNOWFLAKE_PASSWORD
# SNOWFLAKE_WAREHOUSE
# SNOWFLAKE_DATABASE
# SNOWFLAKE_SCHEMA
# —————————————————————————————————————————————

# It's safest to include the full host in SNOWFLAKE_ACCOUNT (with .snowflakecomputing.com)
ACCOUNT = os.getenv("SNOWFLAKE_ACCOUNT", "")
# normalize any fancy characters and force ascii hyphens
ACCOUNT = unicodedata.normalize("NFKC", ACCOUNT).replace("\u2011", "-")
USER = os.getenv("SNOWFLAKE_USERNAME", "")
PASSWORD = os.getenv("SNOWFLAKE_PASSWORD", "")
WAREHOUSE = os.getenv("SNOWFLAKE_WAREHOUSE", "COMPUTE_WH")
DATABASE = os.getenv("SNOWFLAKE_DATABASE", "DEMO_DB")
SCHEMA = os.getenv("SNOWFLAKE_SCHEMA", "PUBLIC")

# Base URL for login
LOGIN_URL = (
    f"http://{ACCOUNT}/session/v1/login-request"
    f"?warehouse={WAREHOUSE}&databaseName={DATABASE}&schemaName={SCHEMA}"
)


def _authenticate() -> str:
    """Log in and return a session token, or raise a clear error on failure."""
    payload = {"data": {"LOGIN_NAME": USER, "PASSWORD": PASSWORD}}
    print(USER, PASSWORD)
    resp = requests.post(LOGIN_URL, json=payload)
    resp.raise_for_status()
    body = resp.json()
    print(body)

    # If the response indicates a failure, Snowflake returns success=false
    if not body.get("success", False):
        msg = body.get("message") or body
        raise RuntimeError(f"Snowflake authentication failed: {msg}")

    # Extract and return the token
    try:
        return body["data"]["token"]
    except KeyError:
        raise RuntimeError(f"Unexpected Snowflake auth response: {body}")


# … your existing imports and _authenticate() …
# set up a basic logger
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


def run_query(sql_text: str, binds: list = None) -> dict:
    """
    Execute SQL via Snowflake’s REST API.
    Returns the parsed JSON response as a dict.
    """
    # grab a fresh token
    token = _authenticate()

    # build the URL
    request_id = os.urandom(8).hex()
    url = url = (
        f"https://{ACCOUNT}/queries/v1/query-request"
        f"?requestId={request_id}"

    )

    # payload and headers
    headers = {
        "Authorization": f"Snowflake Token=\"{token}\"",
        "Content-Type":    "application/json"
    }
    body = {
        "sqlText":     sql_text,
        "bindings":       binds or [],
        "describeOnly": False
    }

    # log everything
    logger.debug("→ Snowflake request ID: %s", request_id)
    logger.debug("→ URL: %s", url)
    logger.debug("→ Headers: %s", headers)
    logger.debug("→ Body: %s", body)

    # fire it off
    resp = requests.post(url, headers=headers, json=body)

    # log raw response
    logger.debug("← Response status: %s", resp.status_code)
    logger.debug("← Response headers: %s", resp.headers)
    # try to pretty‑print a JSON body if possible, else raw text
    try:
        logger.debug("← Response JSON:\n%s", resp.json())
    except ValueError:
        logger.debug("← Response text:\n%s", resp.text)

    # on HTTP error, log body one more time and re‑raise
    try:
        resp.raise_for_status()
    except requests.exceptions.HTTPError as e:
        logger.error("‼️  HTTPError %s: %s", resp.status_code, resp.text)
        raise

    return resp.json()
