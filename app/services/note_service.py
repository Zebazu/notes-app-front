from datetime import datetime
from sqlalchemy.orm import Session
from app.domain.models.note_model import Note
from app.domain.models.user_model import User
from app.infrastructure.repository.interfaces.user_note_interfaces import CRUDRep

def create_note(db: Session, title: str, description: str, time: datetime, user_id: int):
    if time is None:
            time = datetime.now()
    CRUDRep.create_note(db,title,description,time,)

def get_notes_by_user(db: Session, user_id: str):

    return CRUDRep.get_notes_by_user_rep(db, user_id)

def getHistory(db: Session,  note_id: int, user_id=str):
    return CRUDRep.get_notes_history(db, note_id, user_id)