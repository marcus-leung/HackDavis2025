import os

import dotenv
from cerebras.cloud.sdk import Cerebras
import json

from websearch import Tavily

dotenv.load_dotenv()

client = Cerebras(
    # This is the default and can be omitted
    api_key=os.getenv("CEREBRAS_API_KEY")
)

SEARCH_PROMPT = """    
    You are a trade analyst looking to see if the ethics of a specific company is up to current ethical, environmental, and fair trade standards
    You are given a product name and a company name. In that order.
    
    Your task now is that your given access to search on the web. Your reply to this prompt would be 
    the search term that you want to search in order to effectively track down public opinions and insights
    about this particular product. Only reply to this prompt with the search term and nothing else.
    
    Here's the product name and company:
"""

ANALYZE_PROMPT = """
    You are a trade analyst looking to see if the ethics of a specific company is up to current ethical, environmental, and fair trade standards.
    
    You are given search results relating to this topic. Your task is to analyze these search results and return relevant
    customer feedback, blog post opinions, news paper opinions, and etcetera that relate to the mission of getting public insights about a specific company
    
    What you're supposed to return is a cleanly formatted json response with the source name and the opinion as follows:
    {"response": [{"Source" : "some link here", "Review": "their respective review here"}, {"Source" : "", "Review" : ""}]}
    Collate all this into a single object.
    
    If the reviews of the source seems incomplete, it is your job to fix it and make continue the train of thought the review is heading to.
    
    Do not put in any json format subscripts in your response. I do not need them.
     
    You should strictly only output the JSON object and nothing else!
"""



def find_product_search_term(product_mat, product_company):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"{SEARCH_PROMPT} \nProduct details: {product_mat}, \nCompany: {product_company}",
            }
    ],
        model="llama-4-scout-17b-16e-instruct",
    )

    return chat_completion.choices[0].message.content

def analyze_searches(search_results):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"{ANALYZE_PROMPT} \nWeb search results: {search_results}",
            }
        ],
        model="llama-4-scout-17b-16e-instruct",
    )

    return chat_completion.choices[0].message.content

def get_insights(item, company) -> list:
    search_term = find_product_search_term(item, company)
    search_results = Tavily(search_term)
    analysis = analyze_searches(search_results)

    try:
        data = json.loads(analysis)
        print("Successfully parsed JSON:", data)
        return data["response"]
    except json.JSONDecodeError as e:
        print("Failed to parse JSON:", e)
        return [0]






