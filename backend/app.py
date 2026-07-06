from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.upload import router as upload_router
from api.chat import router as chat_router
from api.history import router as history_router
from database.sqlite_db import Base
from database.sqlite_db import engine
from api.documents import router as document_router
import models.history_models

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Document Assistant",
    version="1.0.0",
    description="Production-ready RAG Chatbot"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to Document Assistant!"
    }

app.include_router(upload_router)
app.include_router(chat_router)
app.include_router(history_router)
app.include_router(document_router)