from pydantic import BaseModel
from datetime import datetime

class NoteDTO(BaseModel):
    title: str
    description: str
    time: datetime = datetime.now()

class NoteVersionDTO(BaseModel):
    title: str
    description: str
    version: int
    time: datetime = datetime.now()