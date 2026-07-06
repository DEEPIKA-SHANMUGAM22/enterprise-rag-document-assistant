from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
    Depends
)

from pathlib import Path
import shutil
import time

from sqlalchemy.orm import Session


from services.index_service import index_document


from database.sqlite_db import get_db


from services.document_metadata_service import (
    save_document_metadata
)


router = APIRouter(
    tags=["Upload"]
)


UPLOAD_DIR = Path("uploads")

UPLOAD_DIR.mkdir(
    exist_ok=True
)



ALLOWED_EXTENSIONS = {

    ".pdf",
    ".docx",
    ".doc",
    ".xlsx",
    ".xls",
    ".csv",
    ".txt",

}




@router.post("/upload")
async def upload_document(

    file: UploadFile = File(...),

    db: Session = Depends(get_db)

):


    extension = (
        Path(file.filename)
        .suffix
        .lower()
    )



    if extension not in ALLOWED_EXTENSIONS:


        raise HTTPException(

            status_code=400,

            detail=f"Unsupported file type: {extension}"

        )




    unique_filename = (

        f"{int(time.time())}_{file.filename}"

    )


    file_path = (

        UPLOAD_DIR /
        unique_filename

    )



    with open(
        file_path,
        "wb"
    ) as buffer:


        shutil.copyfileobj(

            file.file,

            buffer

        )




    try:


        # create embeddings + store in Chroma

        result = index_document(
            str(file_path)
        )



        # save upload history in SQLite ⭐

        save_document_metadata(

            db=db,

            filename=unique_filename,

            chunk_count=result.get(
                "chunks",
                0
            )

        )



        return {

            "status": "success",

            "filename": unique_filename,

            **result

        }




    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )