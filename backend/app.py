# app.py
import os
from flask import Flask, request, jsonify  # type: ignore
from dotenv import load_dotenv  # type: ignore
import db

# load environment variables from .env
load_dotenv()

# Helper modules

import insight_finder
import insight_finder_gemini

from flask_cors import CORS

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/barcode", methods=["POST"])
def get_company():
    data = request.get_json()
    id_code = data.get("id_code")
    print(f"id_code: {id_code}")
    return jsonify({"company_name": db.code_match(str(id_code))})



@app.route("/insights", methods=["POST"])
def insight():
    data = request.get_json()
    query = data.get("company")
    is_gemini = data.get("is_gemini")

    if is_gemini:
        response = insight_finder_gemini.find_insight(query)
    else:
        response = insight_finder.get_insights(query)

    return jsonify(response)


@app.route("/environmental_impact", methods=["POST"])
def envs():
    data = request.get_json()
    query = data.get("company")
    is_gemini = data.get("is_gemini", False)

    if is_gemini:
        response = insight_finder_gemini.get_environmental_impact_score(query)
    else:
        response = insight_finder.get_environmental_impact_score(query)

    return jsonify({"environmental_impact": response})

@app.route("/social_impact", methods=["POST"])
def sos():
    data = request.get_json()
    query = data.get("company")
    is_gemini = data.get("is_gemini", False)

    if is_gemini:
        response = insight_finder_gemini.get_social_impact_score(query)
    else:
        response = insight_finder.get_social_impact_score(query)

    return jsonify({"social_impact": response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)