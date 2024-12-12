from fastapi import FastAPI
from app.api.v1.routes import router as api_router  
from fastapi.middleware.cors import CORSMiddleware

#from app.core.config import settings  # Configuración global


app = FastAPI(
    title="NOTES-BACK",#settings.PROJECT_NAME,
    version="V1"#settings.PROJECT_VERSION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia "*" por un dominio específico en producción
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

app.include_router(api_router, prefix="/api/v1")  

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
