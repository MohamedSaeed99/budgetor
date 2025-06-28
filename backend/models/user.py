from pydantic import BaseModel
from typing import Optional
import uuid

class User(BaseModel):
    id: Optional[uuid.UUID] = None
    full_name: str
    email: str
    password_hash: str

class UserClient(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None

