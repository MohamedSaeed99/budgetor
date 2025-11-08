from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid

class Tab(BaseModel):
    id: Optional[uuid.UUID] = None
    section_id: uuid.UUID
    tab_name: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True 

