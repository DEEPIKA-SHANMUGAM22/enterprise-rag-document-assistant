from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session


from database.sqlite_db import get_db


from services.document_metadata_service import (
    get_uploaded_documents
)



router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)



@router.get("/")
def documents(
    db: Session = Depends(get_db)
):

    return get_uploaded_documents(
        db
    )