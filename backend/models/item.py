from pydantic import BaseModel
from datetime import date

class Item(BaseModel):
    id: int
    date: date
    store: str
    amount: float
