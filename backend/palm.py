import os
# using dotenv to load API key from .env file
from dotenv import load_dotenv
load_dotenv()

# import the package
import google.generativeai as palm
palm.configure(api_key=os.getenv("PALM_KEY"))

def validate_prompt(prompt:str)->bool:
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
  prompt = "Check if the given prompt is about going from a retail item location to another, if it is Then return True else False. Prompt:-" + prompt
  response = palm.generate_text(
    **defaults,
    prompt=prompt
  )
  return eval(response.result)

def validate_prompt_to_from(prompt:str)->bool:
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
  prompt = "Check if the given prompt is about food or not, if about food return True else False. Prompt:-" + prompt
  response = palm.generate_text(
    **defaults,
    prompt=prompt
  )
  return eval(response.result)


def model_output(req_input:str)->dict:
  defaults = {
    'model': 'models/text-bison-001',
    'temperature': 0,
    'candidate_count': 3,
    'top_k': 20,
    'top_p': 1,
    'max_output_tokens': 1024,
    'stop_sequences': [],
    'safety_settings': [{"category":"HARM_CATEGORY_DEROGATORY","threshold":1},{"category":"HARM_CATEGORY_TOXICITY","threshold":1},{"category":"HARM_CATEGORY_VIOLENCE","threshold":2},{"category":"HARM_CATEGORY_SEXUAL","threshold":2},{"category":"HARM_CATEGORY_MEDICAL","threshold":2},{"category":"HARM_CATEGORY_DANGEROUS","threshold":2}],
  }
  if not validate_prompt(req_input):
    return []

  prompt = "Give me a checklist to make a" +req_input+ "in the form of a python list of tuples where first element of the tuple is the item and the second item is a string of quantity required in number of grams or milli litres of volume for liquids.If the discussion is not about edible food, then given out an empty list."

  response = palm.generate_text(
    **defaults,
    prompt=prompt
  )
  # convert the response to a list of tuples
  opening = response.result.find("[")
  required_list = response.result[opening:]
  required_list = required_list.lstrip("`")
  required_list = required_list.rstrip("`")
  required_list = eval(required_list)
  return required_list

def model_output_to_from(req_input:str)->list:
  defaults = {
    'model': 'models/text-bison-001',
    'temperature': 0,
    'candidate_count': 3,
    'top_k': 20,
    'top_p': 1,
    'max_output_tokens': 1024,
    'stop_sequences': [],
    'safety_settings': [{"category":"HARM_CATEGORY_DEROGATORY","threshold":1},{"category":"HARM_CATEGORY_TOXICITY","threshold":1},{"category":"HARM_CATEGORY_VIOLENCE","threshold":2},{"category":"HARM_CATEGORY_SEXUAL","threshold":2},{"category":"HARM_CATEGORY_MEDICAL","threshold":2},{"category":"HARM_CATEGORY_DANGEROUS","threshold":2}],
  }
  if not validate_prompt_to_from(req_input):
    return {}

  prompt = f"""Give me a python dictionary from the given prompt where there are only two keys which are strings i.e "from" and "to", you can omit the from and to keys from the dictionary if information relating to them doesn't exist Prompt:-{req_input}"""

  response = palm.generate_text(
    **defaults,
    prompt=prompt
  )
  # convert the response to a list of tuples
  print(response.result)
  opening = response.result.find("{")
  required_list = response.result[opening:]
  required_list = required_list.lstrip("`")
  required_list = required_list.rstrip("`")
  required_list = eval(required_list)
  return required_list
print(model_output_to_from("i am at bananas"))