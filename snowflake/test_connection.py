# verify_connector.py
import os
from dotenv import load_dotenv
import snowflake_api
load_dotenv()

conn = snowflake_api.connector.connect(
    user=os.getenv("SNOWFLAKE_USERNAME"),
    password=os.getenv("SNOWFLAKE_PASSWORD"),
    account=os.getenv("SNOWFLAKE_ACCOUNT"),
    warehouse=os.getenv("SNOWFLAKE_WAREHOUSE"),
    database=os.getenv("SNOWFLAKE_DATABASE"),
    schema=os.getenv("SNOWFLAKE_SCHEMA"),
)
cur = conn.cursor()
try:
    cur.execute("SELECT CURRENT_VERSION()")
    print("Connected! Snowflake version:", cur.fetchone()[0])
finally:
    cur.close()
    conn.close()