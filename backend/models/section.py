from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid

class Section(BaseModel):
    id: Optional[uuid.UUID] = None
    section_name: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True 