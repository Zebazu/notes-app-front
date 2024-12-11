from pydantic import BaseModel

class UserDTO(BaseModel):
    username: str
    password: str

class UserNotesDTO(BaseModel):
    username: str
    password: str
    id: int
