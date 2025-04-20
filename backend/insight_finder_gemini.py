
import os
import dotenv
import json
import google.generativeai as genai
from flask import jsonify


from websearch import Tavily

dotenv.load_dotenv()

# Configure the Gemini API with the provided API key
genai.configure(api_key="AIzaSyCtxMAgc7pblqAE5_oFBOw7SnIOI0fQR3s")

model = genai.GenerativeModel("gemini-2.0-flash")

SEARCH_PROMPT = """    
You are a trade analyst looking to see if the ethics of a specific company is up to current ethical, environmental, and fair trade standards.
You are given a product name and a company name. In that order.

Your task now is that you're given access to search on the web. Your reply to this prompt would be 
the search term that you want to search in order to effectively track down public opinions and insights
about this particular product. Only reply to this prompt with the search term and nothing else.

Here's the product name and company:
"""

ANALYZE_PROMPT = """
You are a trade analyst looking to see if the ethics of a specific company is up to current ethical, environmental, and fair trade standards.
You are given a product name and a company name, along with search results about the company and product.

Use that information to summarize what the public opinion and general sentiment is around the company and product.
Highlight any red flags, controversies, or praise that stands out.

Use this json schema:
{
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

Here are the product, company, and search results:
Only give me the given schema and no explanation or anything else!
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

def ask_gemini(prompt):
    response = model.generate_content(prompt)
    return response.text.strip()

def find_insight(product):
    query = ask_gemini(SEARCH_PROMPT + f"Product and company: {product}\n")
    print("Generated search query:", query)

    result_text = Tavily(query)

    analysis_prompt = ANALYZE_PROMPT + f"\nProduct and Company: {product}\nSearch Results:\n{result_text}"

    print(analysis_prompt)

    insights = ask_gemini(analysis_prompt)


    # print("Raw Gemini output:\n", insights)  # <-- DEBUGGING LINE

    # If it starts with ```json and ends with ```
    if insights.startswith("```json"):  # Replace $$$ with actual backticks if testing
        insights = insights[len("```json"):].strip()
    if insights.endswith("```"):  # Replace $$$ with actual backticks
        insights = insights[:-3].strip()

    try:
        parsed = json.loads(insights)
        return parsed
    except json.JSONDecodeError as e:
        print("❌ Failed to parse JSON. Gemini output was:")
        print(insights)
        raise e



def get_environmental_impact_score(company_name: str) -> float:
    insights = ask_gemini(f"{ENVIRONMENTAL_IMPACT_PROMPT}\nCompany: {company_name}")

    return insights

def get_social_impact_score(company_name: str) -> float:
    insights = ask_gemini(f"{SOCIAL_IMPACT_PROMPT}\nCompany: {company_name}")

    return insights

# print(find_insight("nike socks"))