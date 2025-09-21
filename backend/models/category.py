from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
import uuid

class Category(BaseModel):
    id: Optional[uuid.UUID] = None
    section_id: uuid.UUID
    category_name: str
    budget_amount: float

    def to_entity(self, user_id: str) -> 'CategoryEntity':
        return CategoryEntity(
            id=self.id,
            user_id=user_id,
            section_id=self.section_id,
            category_name=self.category_name,
            budget_amount=self.budget_amount
        )

class CategoryEntity(BaseModel):
    id: Optional[uuid.UUID] = None
    user_id: uuid.UUID
    section_id: uuid.UUID
    category_name: str
    budget_amount: float
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    def to_response(self) -> Category:
        return Category(
            id=self.id,
            section_id=self.section_id,
            category_name=self.category_name,
            budget_amount=self.budget_amount
        )

    class Config:
        from_attributes = True