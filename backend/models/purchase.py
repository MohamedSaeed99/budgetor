from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
import uuid

class Purchase(BaseModel):
    id: Optional[uuid.UUID] = None
    tab_id: uuid.UUID
    purchase_date: date
    store: str
    amount: float
    category: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True