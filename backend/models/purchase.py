from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
import uuid

class Purchase(BaseModel):
    id: Optional[int] = None
    tab_id: uuid.UUID
    purchase_date: date
    store: str
    amount: float
    category: str

class PurchaseEntity(BaseModel):
    id: Optional[int] = None
    user_id: uuid.UUID
    tab_id: uuid.UUID
    purchase_date: date
    store: str
    amount: float
    category: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

def toPurchase(purchase_entity: PurchaseEntity):
    return Purchase(
        id=purchase_entity.id,
        tab_id="aaaabbbb-aaaa-bbbb-aaaa-bbbbccccdddd",
        purchase_date=purchase_entity.purchase_date,
        store=purchase_entity.store,
        amount=purchase_entity.amount,
        category=purchase_entity.category
    )

def toPurchaseEntity(user_id: str, purchase: Purchase):
    return PurchaseEntity(
        id=purchase.id,
        user_id=user_id, 
        tab_id="aaaabbbb-aaaa-bbbb-aaaa-bbbbccccdddd", 
        purchase_date=purchase.purchase_date, 
        store=purchase.store, 
        amount=purchase.amount, 
        category=purchase.category
    )