from pydantic import BaseModel
from typing import Optional
import uuid

class Tab(BaseModel):
    id: Optional[uuid.UUID] = None
    section_id: uuid.UUID
    tab_name: str

    def to_entity(self, user_id: str) -> 'TabEntity':
        return TabEntity(
            id=self.id,
            user_id=user_id,
            section_id=self.section_id,
            tab_name=self.tab_name
        )

class TabEntity(BaseModel):
    id: Optional[uuid.UUID] = None
    user_id: uuid.UUID
    section_id: uuid.UUID
    tab_name: str

    def to_response(self) -> Tab:
        return Tab(
            id=self.id,
            section_id=self.section_id,
            tab_name=self.tab_name
        )

    class Config:
        from_attributes = True 

