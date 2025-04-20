import os
from flask import Flask, request, jsonify
from flask_cors import CORS
                        # ← make sure this is installed
from supplier_sources import get_source
from oc_gleif import lookup_company
from oc_nominatim import geocode_company, geocode_address
from sea_routes import estimate_sea_route  # type: ignore
from parcel import track_parcel
import insight_finder

app = Flask(__name__)
CORS(app)


@app.route("/barcode", methods=["GET"])
def get_company():
    """
    Returns the product description for a given barcode.
    """
    code = request.args.get("barcode_number", "")
    if not code:
        return jsonify({"error": "barcode_number query param required"}), 400

    try:
        title = barcode.get_barcode_title(code)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"item_description": title})


@app.route("/sources", methods=["GET"])
def sources():
    """
    Returns manual supplier sources for a given barcode from Snowflake.
    """
    code = request.args.get("barcode", "")
    if not code:
        return jsonify({"error": "barcode query param required"}), 400

    try:
        data = get_source(code)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    if not data:
        return jsonify({"error": "no sources found"}), 404

    return jsonify(data)


@app.route("/insights", methods=["GET"])
def insight():
    """
    Returns AI-driven insights for a given company query.
    """
    company = request.args.get("company", "")
    if not company:
        return jsonify({"error": "company query param required"}), 400

    try:
        response = insight_finder.get_insights(company)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify(response)


# Optional: wire up your other helper modules
@app.route("/company", methods=["GET"])
def company_info():
    """
    Combines registry lookup with geocoding.
    """
    name = request.args.get("name", "")
    if not name:
        return jsonify({"error": "name query param required"}), 400

    try:
        reg = lookup_company(name)
        geo = geocode_company(name)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"registry": reg, "location": geo})


@app.route("/parcel", methods=["GET"])
def parcel_tracking():
    """
    Tracks a parcel given its tracking number.
    """
    tn = request.args.get("tracking_number", "")
    if not tn:
        return jsonify({"error": "tracking_number query param required"}), 400

    try:
        status = track_parcel(tn)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify(status)


@app.route("/sea-route", methods=["GET"])
def sea_route():
    """
    Estimates a sea route between two ports.
    """
    origin = request.args.get("origin", "")
    dest = request.args.get("destination", "")
    if not origin or not dest:
        return jsonify({"error": "origin and destination are required"}), 400

    try:
        est = estimate_sea_route(origin, dest)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify(est)


if __name__ == "__main__":
    host  = os.getenv("HOST", "127.0.0.1")
    port  = int(os.getenv("PORT", 5000))
    debug = os.getenv("FLASK_DEBUG", "0") == "1"
    app.run(host=host, port=port, debug=debug)