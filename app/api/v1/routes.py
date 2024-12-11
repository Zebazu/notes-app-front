from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.infrastructure.repository.note_repository import create_note, erase_note, update_existing_note
from app.services.dto.note_dto import NoteDTO
from app.services.dto.user_dto import UserDTO
from app.services.note_service import get_notes_by_user
from app.services.user_services import get_current_user, register_user
from app.infrastructure.database import Base, engine
from app.services.user_services import verify_user
from app.utils.auth_service import create_access_token
from app.infrastructure.database import get_db

Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.post("/register")
def register(user: UserDTO, db: Session = Depends(get_db)):
    try:
        user_data = register_user(db, user.username, user.password)
        return {"message": "User registered successfully", "user_id": user_data.id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/login")
def login(user: UserDTO, db: Session = Depends(get_db)):
    try:
        verified_user = verify_user(db, user.username, user.password)
        
        access_token = create_access_token(data={"sub": verified_user.username})
        
        return {"access_token": access_token, "token_type": "bearer"}
    
    except Exception as e:
        raise HTTPException(status_code=401, detail=e.args)
    


@router.get("/notes")
def get_notes(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_id = current_user["sub"] 
    notes = get_notes_by_user(db, user_id)
    return {"notes": notes}

@router.post("/notes")
def add_note(note: NoteDTO, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user_id = current_user["sub"]
    
    try:
        created_note = create_note(db=db, title=note.title, description=note.description, time=note.time, user_id=user_id)
        return {"message": "Note created successfully", "note_id": created_note.id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.put("/notes/{note_id}")
def update_note(
    note_id: int, 
    note_data: NoteDTO, 
    db: Session = Depends(get_db), 
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user["sub"]
    try:
        update_existing_note(db=db, note_id=note_id, title=note_data.title, description=note_data.description, time=note_data.time, user_id=user_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"message": "Note updated successfully"}

@router.delete("/notes/{note_id}")
def delete_note(
    note_id: int, 
    db: Session = Depends(get_db), 
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user["sub"]

    try:
        erase_note(db=db,note_id=note_id, user_id=user_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    return {"message": "Note deleted successfully"}