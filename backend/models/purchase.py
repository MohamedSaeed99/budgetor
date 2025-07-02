from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
import uuid

class Purchase(BaseModel):
    id: int
    user_id: uuid.UUID
    purchase_date: date
    store: str
    amount: float
    category: str

class PurchaseEntity(BaseModel):
    id: Optional[int] = None
    user_id: uuid.UUID
    tab_id: uuid.UUID
    purchase_date: datetime
    store: str
    amount: float
    category: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
