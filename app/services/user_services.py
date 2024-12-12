from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session
from app.infrastructure.database import get_db
from app.infrastructure.repository.interfaces.user_note_interfaces import CRUDRep
from app.utils.auth_service import verify_jwt_token
from app.utils.security import hash_password

def register_user(db: Session, username: str, password: str):
    hashed_password = hash_password(password)
    return CRUDRep.create_user(db, username, hashed_password)

def verify_user(db: Session, username: str, password: str):
    user =  CRUDRep.verify_user(db,username,password)

    return user


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme)):
   
    payload = verify_jwt_token(token)
    return payload 