from sqlalchemy.orm import Session
from app.domain.models.user_model import User

def create_user(db: Session, username: str, hashed_password: str) -> User:
    user = User(username=username, password=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
