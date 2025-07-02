from pydantic import BaseModel
from typing import Optional
import uuid

class UserEntity(BaseModel):
    id: Optional[uuid.UUID] = None
    full_name: str
    email: str
    password_hash: str

class User(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None

