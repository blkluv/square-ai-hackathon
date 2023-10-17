from fastapi import FastAPI,Body
from typing import Annotated,List
from fastapi.middleware.cors import CORSMiddleware
from square.client import Client
from base_models import customer, Order
import os,time,json
from dotenv import load_dotenv
import uuid,pprint
from categories import categorize
from graph import product_graph
from palm import model_output

load_dotenv()
app = FastAPI()
location = "LJJRKZX08FCW9"


# CORS
origins = ["*"]
app.add_middleware(
    CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"]
)

@app.get("/")
def hello():
  return "Hello Google and Square!"

@app.post("/token/auth")
def authorize():
    scope = "ORDERS_WRITE%20INVOICES_WRITE%20INVOICES_READ%20CUSTOMERS_READ%20CUSTOMERS_WRITE%20MERCHANT_PROFILE_READ"
    return f"https://connect.squareupsandbox.com/oauth2/authorize?client_id={os.getenv('CLIENT_ID')}&scope={scope}"
    
@app.post("/token/get")
def get_token(code:Annotated[str, Body()]):
    """
    params:
    code : the code that is returned from frontend
    """
    client = Client(
    access_token=os.environ['SQUARE_ACCESS_TOKEN'],
    environment='sandbox')
    result = client.o_auth.obtain_token(
    body = {
        "client_id": os.getenv("CLIENT_ID"),
        "client_secret": os.getenv("CLIENT_SECRET"),
        "code": code,
        "grant_type": "authorization_code"
    }
    )

    if result.is_success():
        # print(result.body)
        return {"access_token": result.body.get('access_token')}
    elif result.is_error():
        print(result.errors)
        return "Error!"
        
@app.get("/locations")
def get_locations(access_token):
    """
    params:
    EAAAEIylKKpcD2QYDjqLRUCuc8sZaXzoS31f30G0Xpoe0papCkX0cxGpsQaHOjHP
    """
    client = Client(
    access_token=access_token,
    environment='sandbox')
    result = client.locations.list_locations()
    location_list = []
    for location in result.body['locations']:
        location_list.append(location['id'])
        # print(f"{location['id']}: ", end="")
        # print(f"{location['name']}, ", end="")
        # print(f"{location['address']['address_line_1']}, ", end="")
        # print(f"{location['address']['locality']}")
    return location_list

@app.post("/inventory/put")
def get_inventory(at:Annotated[str, Body()]):
    # t = time.time()
    # print(t)
    client = Client(
    access_token=at,
    environment='sandbox')
    idempotency_key = str(uuid.uuid4())
    body = {
    'idempotency_key': idempotency_key,
    'changes': [
        {
            'type': 'PHYSICAL_COUNT',
            'physical_count': {
                'reference_id': '1536bfbf-efed-48bf-b17d-a197141b2a93',
                'catalog_object_id': 'ATV6GAD6WHJ7AOAZABQM4VFL',
                'state': 'IN_STOCK',
                'location_id': 'LJJRKZX08FCW9',
                'quantity': '5',
                'team_member_id': 'LRK57NSQ5X7PUD05',
                'occurred_at': '2023-10-15T22:25:24.878Z'
            }
        }
    ],
    'ignore_unchanged_counts': True
}
    result = client.inventory.batch_change_inventory(body)
    if result.is_success():
        # pprint.pprint(result.body)
        return result.body
    elif result.is_error():
        pprint.pprint(result.errors)
        return "Error! Please try again"
    
@app.post("/inventory/put")
def add_inventory(at:Annotated[str, Body()]):
    client = Client(
    access_token=at,
    environment='sandbox')
    idempotency_key = str(uuid.uuid4())
    body = {
    'idempotency_key': idempotency_key,
    'changes': [
        {
            'type': 'PHYSICAL_COUNT',
            'physical_count': {
                'reference_id': '1536bfbf-efed-48bf-b17d-a197141b2a93',
                'catalog_object_id': 'ATV6GAD6WHJ7AOAZABQM4VFL',
                'state': 'IN_STOCK',
                'location_id': 'LJJRKZX08FCW9',
                'quantity': '5',
                'team_member_id': 'LRK57NSQ5X7PUD05',
                'occurred_at': '2023-10-15T22:25:24.878Z'
            }
        }
    ],
    'ignore_unchanged_counts': True
}
    result = client.inventory.batch_change_inventory(body)
    if result.is_success():
        # pprint.pprint(result.body.get('id_mappings'))
        return "Success. See Terminal"
    elif result.is_error():
        pprint.pprint(result.errors)
        return "Error. See Terminal"

@app.post("/catalog/set_item")
def add_item(at:Annotated[str, Body()],name:str = "Cocoa",price:int = 350,currency="USD"):
    client = Client(
    access_token=at,
    environment='sandbox')
    # generate a unique idempotency key
    idempotency_key = str(uuid.uuid4())
    result = client.catalog.upsert_catalog_object(
  body = {
    "idempotency_key": idempotency_key,
    "object": {
      "type": "ITEM",
      "id": "#Cocoa",
      "item_data": {
        "name": name,
        "description": "Hot Chocolate",
        "abbreviation": "Ch",
        "variations": [
          {
            "type": "ITEM_VARIATION",
            "id": "#Small",
            "item_variation_data": {
              "item_id": "#Cocoa",
              "name": "Small",
              'price_money': {'amount': price,
                            'currency': currency},
                'pricing_type': 'FIXED_PRICING',
            }
          },
        ]
      }
    }
  }
)

    if result.is_success():
        # pprint.pprint(result.body)
        return "Success. See Terminal"
    elif result.is_error():
        pprint.pprint(result.errors)
        return "Error. See Terminal"
    
@app.get("/catalog/get")
def get_catalog(at:Annotated[str, Body()]):
    client = Client(
    access_token=at,
    environment='sandbox')
    result = client.catalog.list_catalog()
    if result.is_success():
        # pprint.pprint(result.body.get('objects'))
        return "Success. See Terminal"
    elif result.is_error():
        pprint.pprint(result.errors)
        return "Error. See Terminal"

@app.post("/catalog/delete")
def delete_catalog(at:Annotated[str, Body()],id="#Cocoa"):
    client = Client(
    access_token=at,
    environment='sandbox')
    result = client.catalog.delete_catalog_object(
    object_id = id
)
    if result.is_success():
        # pprint.pprint(result.body)
        return "Success. See Terminal"
    elif result.is_error():
        pprint.pprint(result.errors)
        return "Error. See Terminal"
    
@app.post("/invoices/get/order")
def get_invoices(at:Annotated[str, Body()],inv:Annotated[str, Body()]):
    """
    Function to return all the invoices for a particular location id
    This data will be useful for getting the invoices and running the machine learning model from this
    data to determine the best layout of the store
    params:
    EAAAEIylKKpcD2QYDjqLRUCuc8sZaXzoS31f30G0Xpoe0papCkX0cxGpsQaHOjHP,
    
    """
    client = Client(
    access_token=at,
    environment='sandbox')
    result = client.invoices.get_invoice(
  invoice_id = inv
)

    if result.is_success():
      # print(result.body)
      print("Order ID identified: " + result.body.get('invoice').get('order_id'))
      return result.body.get('invoice').get('order_id')
    elif result.is_error():
      print(result.errors)

@app.post("/invoice/create")
def create_order(at:Annotated[str, Body()],order_id:Annotated[str, Body()],customer_id:Annotated[str, Body()]):
    """
    Function to create an order from a json file
    params:
    EAAAEIylKKpcD2QYDjqLRUCuc8sZaXzoS31f30G0Xpoe0papCkX0cxGpsQaHOjHP,
    V1y7jOPar9YOg4QVLWYGf6lq7eRZY,
    MK42BJ196CFB654Q1XB4JZBWWC
    """
    client = Client(
    access_token=at,
    environment='sandbox')
    idempotency_key = str(uuid.uuid4())
    result = client.invoices.create_invoice(
  body = {
    "invoice": {
      "location_id": location,
      "order_id": order_id,
      "primary_recipient": {
        "customer_id": customer_id
      },
      "payment_requests": [
        {
          "request_type": "BALANCE",
          "due_date": "2030-01-24",
          "tipping_enabled": True,
          "automatic_payment_source": "NONE",
          "reminders": [
            {
              "relative_scheduled_days": -1,
              "message": "Your invoice is due tomorrow"
            }
          ]
        }
      ],
      "delivery_method": "EMAIL",
      "invoice_number": str(uuid.uuid4()),
      "title": "Event Planning Services",
      "description": "We appreciate your business!",
      "scheduled_at": "2030-01-13T10:00:00Z",
      "accepted_payment_methods": {
        "card": True,
        "square_gift_card": False,
        "bank_account": False,
        "buy_now_pay_later": False,
        "cash_app_pay": False
      },
      "sale_or_service_date": "2030-01-24",
      "store_payment_method_enabled": False
    },
    "idempotency_key": idempotency_key
  }
)

    if result.is_success():
        # pprint.pprint(result.body)
        return {"invoice_id" :result.body.get('invoice').get('id')}
    elif result.is_error():
        pprint.pprint(result.errors)

@app.post("/order/get/categories")
def get_orders(at:Annotated[str, Body()],inv:Annotated[str, Body()]):
  order = get_invoices(at,inv)
  client = Client(
    access_token=at,
    environment='sandbox')
  result = client.orders.batch_retrieve_orders(
  body = {
    "location_id": location,
    "order_ids": [
      order
    ]
  }
)
  

  if result.is_success():
    # print(type(result.body))
    data_dict = result.body

# Extract the list of names from line_items
    line_items = data_dict["orders"][0]["line_items"]
    names = [item["name"] for item in line_items]
    quantity = [item["quantity"] for item in line_items]
    # print("List of name identified:",names)
    categories = categorize(names)
    res = []
    if len(categories) != len(quantity):
      return []
    for i in categories:
      res.append([i,quantity[categories.index(i)]])
    
    return res
  elif result.is_error():
    print(result.errors)
    return "Error! Please try later"

@app.post("/order/create")
def create_order(at:Annotated[str, Body()],order_list:Order,category:str = "Food"):
    """
    exmaple request params
    EAAAEIylKKpcD2QYDjqLRUCuc8sZaXzoS31f30G0Xpoe0papCkX0cxGpsQaHOjHP,
    [
        {
          "name": "Steak",
          "quantity": "1",
          "base_price_money": {
            "amount": 1599,
            "currency": "USD"
          }
          "metadata": {
          "Category": "Food"
          }
        },
        {
          "name": "Apple",
          "quantity": "1",
          "base_price_money": {
            "amount": 12,
            "currency": "USD"
          }
          "metadata": {
          "Category": "Food"
          }
        }
    ]
    """
    """
    Function to create an order from a json file
    """
    client = Client(
    access_token=at,
    environment='sandbox')
    idempotency_key = str(uuid.uuid4())
    # print(order_list.model_dump()['items'])
    result = client.orders.create_order(
    body = {
        "order": {
        "location_id": location,
        "line_items": order_list.model_dump()['items'],
        },
        "idempotency_key": idempotency_key,
    }
    )

    if result.is_success():
        # pprint.pprint(result.body)
        return {"order_id" : result.body.get('order').get('id')}
    elif result.is_error():
        pprint.pprint(result.errors)
        return "Error! Please try later"
    
@app.get("/customer/get")
def get_customer(at:Annotated[str, Body()]):
    """
    Example request params:
    EAAAEIylKKpcD2QYDjqLRUCuc8sZaXzoS31f30G0Xpoe0papCkX0cxGpsQaHOjHP
    """
    client = Client(
    access_token=at,
    environment='sandbox')
    result = client.customers.list_customers()

    if result.is_success():
        # print(result.body)
        return result.body
    elif result.is_error():
        print(result.errors)
    

@app.post("/customer/create")
def create_customer(at:Annotated[str, Body()],customer_details:customer):
    """
    Example request params:
    EAAAEIylKKpcD2QYDjqLRUCuc8sZaXzoS31f30G0Xpoe0papCkX0cxGpsQaHOjHP,
    {
    "given_name": "Jashwanth",
    "family_name": "Peddisetty",
    "email_address": "jashwanth0712@gmail.com"
  }
    """
    client = Client(
    access_token=at,
    environment='sandbox')
    result = client.customers.create_customer(
  body = customer_details.model_dump()
)

    if result.is_success():
        # print(result.body)
        return {"customer_id" :result.body.get('customer').get('id')}
    elif result.is_error():
        print(result.errors)
        return "Error!"
    
@app.post("/checklist")
def get_checklist(tag:Annotated[str, Body()],message:Annotated[str, Body()]):
    if tag == "checklist":
      return [
                "2 cartons of eggs",
                "1 loaf of bread",
                "1 bag of sugar (200g)",
                "1 container of cocoa powder (100g)",
                "1 bottle of vanilla extract (1 tsp)",
                "1 liter of milk",
                "1 bottle of vegetable oil (1/2 cup)",
                "1 can of baking powder (1 tsp)",
                "1 box of baking soda (1/2 tsp)",
                "1 box of salt (1/2 tsp)"
            ]
    elif tag == "from":
      return "pineapple"
    elif tag == "to":
      return "Ice Cream"

@app.post("/model")
def get_model_data(at):
  """
  param:
  EAAAEIylKKpcD2QYDjqLRUCuc8sZaXzoS31f30G0Xpoe0papCkX0cxGpsQaHOjHP
  """
  client = Client(
    access_token=at,
    environment='sandbox')
  result = client.invoices.list_invoices(
    location_id = location,
    limit = 25
  )

  if result.is_success():
    inv_list = []
    for i in result.body.get('invoices'):
      inv_list.append(i.get('id'))
    # print(len(inv_list))
    res = []
    for j in inv_list:
      res.append(get_orders(at,j))
    # write to file
    with open('sample.json', 'w') as outfile:
      json.dump(res, outfile)
    return res
  elif result.is_error():
    print(result.errors)
    
@app.post("/product/graph")
def get_matrix(at):
  """
  param:
  EAAAEIylKKpcD2QYDjqLRUCuc8sZaXzoS31f30G0Xpoe0papCkX0cxGpsQaHOjHP
  """
  try:
    
    with open('sample.json') as f:
      data = json.load(f)
      if data is not None:
        print("Using the invoice data from past. Need to update this file each day for optimal results")
  except:
    print("There is no valid data. Calling /model from inside. Will take a couple of minutes...")
    data = get_model_data(at)
  return str(product_graph(data))