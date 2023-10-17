from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class customer(BaseModel):
    given_name: str
    family_name: str
    email_address: str

class BasePrice(BaseModel):
    amount: int
    currency: str
    
class Item(BaseModel):
    name: str
    quantity: str
    base_price_money: BasePrice
    
class Order(BaseModel):
    items: list[Item]

