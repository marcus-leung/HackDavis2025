import os

import dotenv
import requests
from dotenv import load_dotenv

load_dotenv()

TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

def Tavily(query: str, search_depth: str = "advanced", max_results: int = 5, chunks_per_source : int = 1) -> dict:
    """
    Sends a query to the Tavily API and returns the search results.

    Parameters:
        query (str): The question or search term to ask Tavily.
        search_depth (str): 'basic' or 'advanced' search depth.
        max_results (int): Maximum number of results to retrieve.

    Returns:
        dict: JSON response from the Tavily API.
    """

    url = "https://api.tavily.com/search"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {TAVILY_API_KEY}"
    }
    payload = {
        "query": query,
        "search_depth": search_depth,
        "max_results": max_results,
        "chunk_per_source": chunks_per_source
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

