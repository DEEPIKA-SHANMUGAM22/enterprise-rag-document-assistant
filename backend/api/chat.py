from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session


from models.request_models import ChatRequest
from models.response_models import (
    ChatResponse,
    Source
)


from services.rag_service import ask_question


from database.sqlite_db import get_db


from services.history_service import (
    add_message,
    update_conversation_title
)


router = APIRouter(
    tags=["Chat"]
)


@router.post(
    "/chat",
    response_model=ChatResponse
)
async def chat(
    request: ChatRequest,
    db: Session = Depends(get_db)
):


    # 1. Save user question

    add_message(
        db=db,
        conversation_id=request.conversation_id,
        role="user",
        content=request.question
    )



    # 2. RAG + Gemini

    result = ask_question(
        request.question
    )



    # 3. Save AI response

    add_message(
        db=db,
        conversation_id=request.conversation_id,
        role="assistant",
        content=result["answer"]
    )



    # 4. Rename conversation using first question

    update_conversation_title(
        db=db,
        conversation_id=request.conversation_id,
        title=request.question
    )



    # 5. Sources

    source_objects = [

        Source(
            filename=source["filename"],
            chunk_number=source["chunk_number"]
        )

        for source in result["sources"]

    ]



    return ChatResponse(

        answer=result["answer"],

        sources=source_objects

    )