from fastapi import FastAPI
from app.api.v1.routes import router as api_router  
#from app.core.config import settings  # Configuración global

app = FastAPI(
    title="NOTES-BACK",#settings.PROJECT_NAME,
    version="V1"#settings.PROJECT_VERSION
)

app.include_router(api_router, prefix="/api/v1")  

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
