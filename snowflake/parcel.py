# parcel.py
import os
import requests  # type: ignore

# EasyPost parcel tracking
EASYPOST_KEY = os.getenv("EASYPOST_KEY", "").strip()
if not EASYPOST_KEY:
    raise RuntimeError("Missing EASYPOST_KEY in environment")

API_URL = "https://api.easypost.com/v2/trackers"

def track_parcel(tracking_code: str) -> list:
    """
    Track a parcel via EasyPost API.
    Returns list of tracking event dicts.
    """
    if not tracking_code:
        return []
    resp = requests.post(
        API_URL,
        auth=(EASYPOST_KEY, ""),
        data={"tracker[tracking_code]": tracking_code},
        timeout=5
    )
    resp.raise_for_status()
    data = resp.json()
    return data.get("tracker", {}).get("tracking_details", [])