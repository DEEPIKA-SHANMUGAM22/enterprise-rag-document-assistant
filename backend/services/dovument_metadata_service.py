from sqlalchemy.orm import Session

from models.history_models import Document


def save_document_metadata(
    db: Session,
    filename: str,
    chunk_count: int
):

    document = Document(
        filename=filename,
        chunk_count=chunk_count,
        status="Processed"
    )


    db.add(document)

    db.commit()

    db.refresh(document)


    return document



def get_uploaded_documents(
    db: Session
):

    return (

        db.query(Document)

        .order_by(
            Document.uploaded_at.desc()
        )

        .all()

    )