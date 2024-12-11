from fastapi import HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.domain.models.note_model import Note
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
    if not note:
        raise HTTPException(status_code=404, detail="Note no encontrada o acceso denegado")
    
    db.delete(note)
    db.commit()


def update_existing_note(db: Session, note_id: int, title: str, description: str, time: datetime, user_id: str):

    note = db.query(Note).join(User).filter(Note.id == note_id, User.username.like(user_id)).first()
    if not note:
        raise HTTPException(status_code=404, detail="Nota no encontrada o acceso denegado")
    
    # Actualizar los campos de la nota
    note.title = title
    note.description = description
    note.time = time
    
    db.commit()
    db.refresh(note)