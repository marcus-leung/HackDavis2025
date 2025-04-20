import json
from snowflake_api import run_query


def get_source(barcode: str) -> dict:
    # build one‑liner SQL
    sql = (
        "SELECT sources "
        "FROM SUPPLIER_SOURCES "
        f"WHERE barcode = '{barcode}' "
        "LIMIT 1"
    )
    print("DEBUG ▶️ SQL:", sql)

    try:
        resp = run_query(sql)               # no binds
    except Exception as e:
        # if it's an HTTPError, dump the JSON body:
        if hasattr(e, 'response') and e.response is not None:
            print("▶️ Snowflake replied:", e.response.text)
        raise

    rows = resp.get("rowset", [])
    if not rows:
        return {}
    return json.loads(rows[0][0])
