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

    def to_entity(self, user_id: str) -> 'PurchaseEntity':
        return PurchaseEntity(
            id=self.id,
            user_id=user_id,
            tab_id=self.tab_id,
            purchase_date=self.purchase_date,
            store=self.store,
            amount=self.amount,
            category=self.category
        )

class PurchaseEntity(BaseModel):
    id: Optional[uuid.UUID] = None
    user_id: uuid.UUID
    tab_id: uuid.UUID
    purchase_date: date
    store: str
    amount: float
    category: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    def to_response(self) -> Purchase:
        return Purchase(
            id=self.id,
            tab_id=self.tab_id,
            purchase_date=self.purchase_date,
            store=self.store,
            amount=self.amount,
            category=self.category
        )

    class Config:
        from_attributes = True