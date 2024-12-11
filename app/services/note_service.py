from sqlalchemy.orm import Session
from app.domain.models.note_model import Note
from app.domain.models.user_model import User

def get_notes_by_user(db: Session, user_id: str):
    return db.query(Note).join(User).filter(User.username.like(user_id), User.id==Note.user_id ).all()