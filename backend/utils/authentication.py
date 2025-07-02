import jwt
import os

from dotenv import load_dotenv
from datetime import timedelta, datetime, timezone

load_dotenv()

class AuthenticationUtils():
    SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "dev-secret-key")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 15
    REFRESH_TOKEN_EXPIRE_DAYS = 7

    def create_access_token(self, data: dict, expires_delta: timedelta = None) -> str:
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=self.ACCESS_TOKEN_EXPIRE_MINUTES))
        to_encode.update({"exp": expire, "type": "access"})

        return jwt.encode(to_encode, self.SECRET_KEY, algorithm=self.ALGORITHM)
    
    def create_refresh_token(self, data: dict, expires_delta: timedelta = None) -> str:
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + (expires_delta or timedelta(days=self.REFRESH_TOKEN_EXPIRE_DAYS))
        to_encode.update({"exp": expire, "type": "refresh"})
        
        return jwt.encode(to_encode, self.SECRET_KEY, algorithm=self.ALGORITHM)
    
    def decode_token(self, token: str) -> dict[str, any]:
        return jwt.decode(token, self.SECRET_KEY, algorithms=[self.ALGORITHM])
    
    def get_current_user(self, token: str) -> str:
        try:
            payload = self.decode_token(token)
            user_id = payload.get("sub")

            if user_id is None:
                raise Exception("Invalid token: no subject")
            
            if payload.get("type") != "access":
                raise Exception("Not an access token")

            return user_id
        except jwt.ExpiredSignatureError:
            raise Exception("Token has expired")
        except jwt.DecodeError:
            raise Exception("Invalid token")

    def refresh_access_token(self, refresh_token: str) -> dict[str, any]:
        print(refresh_token)
        try:
            payload = self.decode_token(refresh_token)
            if payload.get("type") != "refresh":
                raise Exception("Not a refresh token")
            
            user_id = payload.get("sub")
            email = payload.get("email")

            return {"access_token": self.create_access_token({"sub": user_id, "email": email})}
        except jwt.ExpiredSignatureError:
            raise Exception("Refresh token has expired")
        except jwt.DecodeError:
            raise Exception("Invalid refresh token")
