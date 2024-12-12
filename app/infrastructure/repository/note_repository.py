from fastapi import HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.domain.models.note_model import Note, NoteHistory
from app.domain.models.user_model import User

def create_note(db: Session, title: str, description: str, time: datetime, user_id: int):
    
    if time is None:
        time = datetime.now()
    
    user_id_reference=db.query(User).filter(user_id == User.username).first().id
    db_note = Note(title=title, description=description, timestamp=time, user_id=user_id_reference)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

def erase_note(db: Session, note_id: int, user_id:str):
    note = db.query(Note).join(User).filter(User.username.like(user_id),Note.id == note_id).first()
    
    noteHistory= db.query(NoteHistory).filter(note.id == NoteHistory.note_id).all()
    if not note:
        raise HTTPException(status_code=404, detail="Note no encontrada o acceso denegado")
    
    db.delete(note)
    db.delete(noteHistory)
    db.commit()


def update_existing_note(db: Session, note_id: int, title: str, description: str, time: datetime, user_id: str):

    note = db.query(Note).join(User).filter(Note.id == note_id, User.username.like(user_id)).first()

    history = NoteHistory(
        note_id=note.id,
        previous_title=note.title,
        previous_description=note.description,
        previous_timestamp=note.timestamp
    )
    db.add(history)

    note.title = title
    note.description = description
    note.timestamp = datetime.utcnow()

    db.commit()
    db.refresh(note)
    return note