from pydantic import BaseModel
from datetime import date
import uuid

class Item(BaseModel):
    id: int
    user_id: uuid.UUID
    purchase_date: date
    store: str
    amount: float
    category: str
