from sqlalchemy.orm import Session

from models.history_models import Conversation
from models.history_models import Message


def create_conversation(
    db: Session,
    title: str
):

    conversation = Conversation(
        title=title
    )

    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    return conversation


def get_conversations(
    db: Session
):

    return (
        db.query(Conversation)
        .order_by(
            Conversation.created_at.desc()
        )
        .all()
    )


def get_conversation(
    db: Session,
    conversation_id: int
):

    return (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id
        )
        .first()
    )


def add_message(
    db: Session,
    conversation_id: int,
    role: str,
    content: str
):

    message = Message(
        conversation_id=conversation_id,
        role=role,
        content=content
    )

    db.add(message)
    db.commit()
    db.refresh(message)

    return message

def update_conversation_title(
    db: Session,
    conversation_id: int,
    title: str
):

    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id
        )
        .first()
    )

    if conversation:

        conversation.title = title[:60]

        db.commit()

        db.refresh(conversation)

    return conversation

def get_messages(
    db: Session,
    conversation_id: int
):

    return (
        db.query(Message)
        .filter(
            Message.conversation_id == conversation_id
        )
        .order_by(
            Message.created_at.asc()
        )
        .all()
    )


def delete_conversation(
    db: Session,
    conversation_id: int
):

    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id
        )
        .first()
    )

    if conversation:

        db.delete(conversation)
        db.commit()

    return conversation

def rename_conversation(
    db: Session,
    conversation_id: int,
    new_title: str
):

    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id
        )
        .first()
    )


    if conversation:

        conversation.title = new_title

        db.commit()

        db.refresh(conversation)


    return conversation