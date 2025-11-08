from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
import uuid

class Budget(BaseModel):
    id: Optional[uuid.UUID] = None
    section_id: Optional[uuid.UUID] = None
    amount: float
    period: str
    category: Category

    def to_entity(self) -> 'BudgetEntity':
        return BudgetEntity(
            id=self.id,
            section_id=self.section_id,
            amount=self.amount,
            period=self.period,
        )

class BudgetEntity(BaseModel):
    id: Optional[uuid.UUID] = None
    section_id: uuid.UUID
    amount: float
    period: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    def to_response(self) -> Budget:
        return Budget(
            id=self.id,
            section_id=self.section_id,
            amount=self.amount,
            period=self.period,
        )

    class Config:
        from_attributes = True