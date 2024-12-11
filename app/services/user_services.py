from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session
from app.domain.models.user_model import User
from app.infrastructure.repository.user_repository import create_user
from app.infrastructure.database import get_db
from app.utils.auth_service import verify_jwt_token
from app.utils.security import hash_password, check_encrypted_password

def register_user(db: Session, username: str, password: str):
    hashed_password = hash_password(password)
    return create_user(db, username, hashed_password)

def verify_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()

    if not user:
        raise NameError("Usuario o contraseña incorrectos")

    if not check_encrypted_password(password, user.password):
        
        raise NameError("Usuario o contraseña incorrectos")

    return user


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme)):
   
    payload = verify_jwt_token(token)
    return payload 