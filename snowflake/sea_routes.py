# sea_routes.py
import os
import requests

# Example SeaRoutes stub or real integration
SEAROUTES_KEY = os.getenv("SEAROUTES_KEY", "").strip()
BASE_URL      = "https://api.searoutes.com/v1/estimate"

def estimate_sea_route(origin: dict, destination: dict) -> dict:
    """
    Given origin/destination {lat, lng}, returns distance and ETA.
    If SEAROUTES_KEY is unset, returns a stub.
    """
    if not SEAROUTES_KEY:
        return {
            "distance_nm": None,
            "eta_days": None,
            "note": "No SEAROUTES_KEY; running stub."
        }
    payload = {"origin": origin, "destination": destination}
    headers = {"Authorization": f"Bearer {SEAROUTES_KEY}"}
    resp = requests.post(BASE_URL, json=payload, headers=headers, timeout=10)
    resp.raise_for_status()
    return resp.json()