# oc_nominatim.py
import requests  # type: ignore

# Identify your app per Nominatim policy
HEADERS = {
    "User-Agent": "HackDavis2025-TraceApp/1.0 (email@example.com)"
}

def geocode_company(name: str) -> dict:
    """
    Geocode a company or free‑text name using Nominatim.
    Returns { company, address, coordinates: [lon, lat] }
    """
    params = {"q": name, "format": "json", "limit": 1}
    resp = requests.get(
        "https://nominatim.openstreetmap.org/search",
        params=params,
        headers=HEADERS,
        timeout=5
    )
    resp.raise_for_status()
    data = resp.json()
    if not data:
        raise ValueError(f"No geocoding results for {name!r}")
    first = data[0]
    return {
        "company": name,
        "address": first.get("display_name"),
        "coordinates": [float(first["lon"]), float(first["lat"])]
    }

def geocode_address(address: str) -> dict:
    """
    Geocode any free‑text address using Nominatim.
    Returns { address, display_name, coordinates: [lon, lat] }
    """
    params = {"q": address, "format": "json", "limit": 1}
    resp = requests.get(
        "https://nominatim.openstreetmap.org/search",
        params=params,
        headers=HEADERS,
        timeout=5
    )
    resp.raise_for_status()
    data = resp.json()
    if not data:
        raise ValueError(f"No geocoding results for {address!r}")
    first = data[0]
    return {
        "address": address,
        "display_name": first["display_name"],
        "coordinates": [float(first["lon"]), float(first["lat"])]
    }