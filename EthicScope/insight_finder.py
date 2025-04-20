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

ENVIRONMENTAL_IMPACT_PROMPT = """
You are an environmental ethics analyst assessing the environmental impact of a company.

Your goal is to return a single environmental impact score from 0 to 10, where:
0 means highly unethical and damaging to the environment,
10 means fully ethical and environmentally sustainable.

Consider:
- Pollution and emissions
- Resource usage and sustainability
- Waste management
- Climate change impact
- Renewable energy adoption
- Green certifications

Use publicly available data and news to inform your response. Think holistically.

Output only a number from 0 to 10. Nothing else.
"""

SOCIAL_IMPACT_PROMPT = """
You are a social ethics analyst evaluating a company's social impact.

Your goal is to return a single social impact score from 0 to 10, where:
0 means the company is known for unethical labor practices, discrimination, or poor social responsibility,
10 means the company is a model for inclusivity, fairness, worker treatment, and community engagement.

Consider:
- Worker conditions and rights
- Diversity and inclusion
- Community investment
- Human rights compliance
- Labor practices in the supply chain

Use public perception and news sources to guide your assessment.

Output only a number from 0 to 10. Nothing else.
"""

analyze_search_term_schema = {
    "type": "object",
    "properties": {
        "response": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "Source": {"type": "string"},
                    "Review": {"type": "string"}
                },
                "required": ["Source", "Review"],
                "additionalProperties": False
            }
        }
    },
    "required": ["response"],
    "additionalProperties": False
}


def find_product_search_term(product_mat):
    print(f"PRODUCT MAT!!! {product_mat}")
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"{SEARCH_PROMPT} \nProduct details and company: {product_mat}",
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
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "product_search_term_schema",
                "strict": True,
                "schema": analyze_search_term_schema
            }
        },
        model="llama-4-scout-17b-16e-instruct",
    )

    return chat_completion.choices[0].message.content

def get_insights(item) -> list:
    print(f"item!!! {item}")
    search_term = find_product_search_term(item)
    print(f"SEARCH TERM!!! {search_term}")
    search_results = Tavily(search_term)
    analysis = analyze_searches(search_results)

    try:
        data = json.loads(analysis)
        # print("Successfully parsed JSON:", data)
        return data["response"]
    except json.JSONDecodeError as e:
        print("Failed to parse JSON:", e)
        return [0]

def get_environmental_impact_score(company_name: str) -> float:
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"{ENVIRONMENTAL_IMPACT_PROMPT}\nCompany: {company_name}"
            }
        ],
        model="llama-4-scout-17b-16e-instruct"
    )

    try:
        score = float(chat_completion.choices[0].message.content.strip())
        print(f"Environmental Impact Score for {company_name}: {score}")
        return score
    except ValueError:
        print("Failed to parse score.")
        return -1

def get_social_impact_score(company_name: str) -> float:
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"{SOCIAL_IMPACT_PROMPT}\nCompany: {company_name}"
            }
        ],
        model="llama-4-scout-17b-16e-instruct"
    )

    try:
        score = float(chat_completion.choices[0].message.content.strip())
        print(f"Social Impact Score for {company_name}: {score}")
        return score
    except ValueError:
        print("Failed to parse score.")
        return -1

# print(get_insights("nike socks"))






