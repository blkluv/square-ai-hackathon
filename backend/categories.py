import os
from typing import List
# using dotenv to load API key from .env file
from dotenv import load_dotenv
load_dotenv()

import google.generativeai as palm
palm.configure(api_key=os.getenv("PALM_KEY"))

def validate_prompt(l:List[str])->bool:
  defaults = {
    'model': 'models/text-bison-001',
    'temperature': 0,
    'candidate_count': 3,
    'top_k': 20,
    'top_p': 1,
    'max_output_tokens': 1024,
    'stop_sequences': [],
    'safety_settings': [{"category": "HARM_CATEGORY_DEROGATORY", "threshold": 1},
                        {"category": "HARM_CATEGORY_TOXICITY", "threshold": 1},
                        {"category": "HARM_CATEGORY_VIOLENCE", "threshold": 2},
                        {"category": "HARM_CATEGORY_SEXUAL", "threshold": 2},
                        {"category": "HARM_CATEGORY_MEDICAL", "threshold": 2},
                        {"category": "HARM_CATEGORY_DANGEROUS", "threshold": 2}],
  }
  prompt = f"Check if the given list is about retail products or not, if about return True else False. List:- {l}"
  response = palm.generate_text(
    **defaults,
    prompt=prompt
  )
  return eval(response.result)

def categorize(l: List[str])->List[str]:
    if not validate_prompt(l):
        return []
    defaults = {
    'model': 'models/text-bison-001',
    'temperature': 0,
    'candidate_count': 1,
    'top_k': 40,
    'top_p': 0.95,
    'max_output_tokens': 1024,
    'stop_sequences': [],
    'safety_settings': [{"category":"HARM_CATEGORY_DEROGATORY","threshold":1},{"category":"HARM_CATEGORY_TOXICITY","threshold":1},{"category":"HARM_CATEGORY_VIOLENCE","threshold":2},{"category":"HARM_CATEGORY_SEXUAL","threshold":2},{"category":"HARM_CATEGORY_MEDICAL","threshold":2},{"category":"HARM_CATEGORY_DANGEROUS","threshold":2}],
    }
    prompt = f"""Given this list of strings ,{l} classify each of them into these categories [
      "Fruits & Vegetables",
      "Dairy",
      "Meat",
      "Condiments & Spices",
      "Snacks",
      "Beverages",
      "Cereal",
      "Household & Cleaning Supplies"
      ]
      and return the results as just a python list without anything else.
      """

    response = palm.generate_text(
    **defaults,
    prompt=prompt
    )
    # print("response",response.result)
    s = response.result.lstrip("`")
    s = s.rstrip("`")
    if type(eval(s))!=list:
      print("Error")
      return []
    return eval(s)
