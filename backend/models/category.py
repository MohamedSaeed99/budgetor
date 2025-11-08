from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
import uuid

class Category(BaseModel):
    id: Optional[uuid.UUID] = None
    budget_id: uuid.UUID
    category_name: str
    amount: float
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True