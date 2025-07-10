from pydantic import BaseModel
from typing import Optional
import uuid

class Section(BaseModel):
    id: Optional[uuid.UUID] = None
    section_name: str

    def to_entity(self, user_id: str) -> 'SectionEntity':
        return SectionEntity(
            id=self.id,
            user_id=user_id,
            section_name=self.section_name
        )

class SectionEntity(BaseModel):
    id: Optional[uuid.UUID] = None
    user_id: uuid.UUID
    section_name: str

    def to_response(self) -> Section:
        return Section(
            id=self.id,
            user_id=self.user_id,
            section_name=self.section_name
        )

    class Config:
        from_attributes = True 