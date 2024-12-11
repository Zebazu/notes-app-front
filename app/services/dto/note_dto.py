from pydantic import BaseModel
from datetime import datetime

class NoteDTO(BaseModel):
    title: str
    description: str
    time: datetime = datetime.now()