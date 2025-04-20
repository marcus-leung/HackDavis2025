# oc_gleif.py
import requests

# Free LEI lookup via GLEIF (no API key required)
BASE_URL = "https://api.gleif.org/api/v1/lei-records"

def lookup_company(name: str) -> dict:
    """
    Performs a free LEI lookup using GLEIF. Filters by `entity.legalName`
    and returns the first match's name, LEI, and registered address.
    """
    params = {
        "filter[entity.legalName]": name,
        "page[size]": 5
    }
    resp = requests.get(BASE_URL, params=params, timeout=5)
    resp.raise_for_status()
    data = resp.json()
    records = data.get("data", [])
    if not records:
        raise ValueError(f"No LEI records found for {name!r}")
    rec   = records[0]
    attrs = rec.get("attributes", {})
    ent   = attrs.get("entity", {})
    addr  = ent.get("legalAddress", {}).get("address", {})
    street  = addr.get("addressLine1", "")
    city    = addr.get("city", "")
    region  = addr.get("region", "")
    country = addr.get("country", "")
    full_addr = ", ".join(filter(None, [street, city, region, country]))
    return {
        "name": ent.get("legalName"),
        "lei": attrs.get("lei"),
        "registered_address": full_addr
    }