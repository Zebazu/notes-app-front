import os

class Settings:
    SECRET_KEY: str = os.getenv("SECRET_KEY", "mysecretkey")  
    ALGORITHM: str = "HS256"

settings = Settings()
