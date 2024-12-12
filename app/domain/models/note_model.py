from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.infrastructure.database import Base

class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    timestamp = Column(String) 
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="notes")

class NoteHistory(Base):
    __tablename__ = "note_history"
    id = Column(Integer, primary_key=True, index=True)
    note_id = Column(Integer, ForeignKey("notes.id"))
    previous_title = Column(String, nullable=False)
    previous_description = Column(String, nullable=False)
    previous_timestamp = Column(String) 
    updated_at = Column(String, default=datetime.utcnow)
