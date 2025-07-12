from pydantic import BaseModel
from typing import Optional
import bcrypt
import uuid

class UserEntity(BaseModel):
    id: Optional[uuid.UUID] = None
    full_name: str
    email: str
    password_hash: str

    class Config:
        from_attributes = True 

class User(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None

    def to_entity(self) -> UserEntity:
        salt = bcrypt.gensalt(rounds=12)
        hashed_password = bcrypt.hashpw(self.password.encode("utf-8"), salt)
        return UserEntity(
            full_name=self.full_name,
            email=self.email,
            password_hash=hashed_password
        )

