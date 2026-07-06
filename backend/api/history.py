from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from database.sqlite_db import get_db
from pydantic import BaseModel
from services.history_service import (
    create_conversation,
    get_conversations,
    get_conversation,
    get_messages,
    delete_conversation,
    rename_conversation,
)

router = APIRouter(
    prefix="/conversations",
    tags=["History"]
)


@router.post("/")
def new_conversation(
    db: Session = Depends(get_db)
):

    conversation = create_conversation(
        db=db,
        title="New Chat"
    )

    return conversation


@router.get("/")
def list_conversations(
    db: Session = Depends(get_db)
):

    return get_conversations(db)


@router.get("/{conversation_id}")
def load_conversation(
    conversation_id: int,
    db: Session = Depends(get_db)
):

    conversation = get_conversation(
        db,
        conversation_id
    )

    messages = get_messages(
        db,
        conversation_id
    )

    return {
        "conversation": conversation,
        "messages": messages
    }


@router.delete("/{conversation_id}")
def remove_conversation(
    conversation_id: int,
    db: Session = Depends(get_db)
):

    delete_conversation(
        db,
        conversation_id
    )

    return {
        "message": "Conversation deleted successfully."
    }

class RenameRequest(BaseModel):

    title: str



@router.put(
    "/{conversation_id}/rename"
)
def rename_chat(

    conversation_id:int,

    request: RenameRequest,

    db:Session = Depends(get_db)

):

    conversation = rename_conversation(
        db=db,
        conversation_id=conversation_id,
        new_title=request.title
    )


    return conversation