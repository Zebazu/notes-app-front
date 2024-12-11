import os

class Settings:
    SECRET_KEY: str = os.getenv("SECRET_KEY", "mysecretkey")  # Asegúrate de usar una clave secreta segura
    ALGORITHM: str = "HS256"

settings = Settings()
