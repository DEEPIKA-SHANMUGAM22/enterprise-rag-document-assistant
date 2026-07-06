from services.document_service import load_document
from services.chunk_service import chunk_text
from services.vector_service import embed_chunks

from database.chroma_db import store_embeddings
from pathlib import Path


def index_document(file_path: str):
    """
    Complete indexing pipeline.
    """

    # Step 1
    text = load_document(file_path)

    # Step 2
    chunks = chunk_text(text)

    # Step 3
    embeddings = embed_chunks(chunks)

    # Step 4
    ids = [
        f"chunk_{i}"
        for i in range(len(chunks))
    ]

    metadata = []

    for i in range(len(chunks)):
        metadata.append({
            "filename": Path(file_path).name,
            "chunk_number": i + 1
        })

    store_embeddings(
        ids=ids,
        embeddings=embeddings,
        documents=chunks,
        metadatas=metadata
    )

    return {
        "chunks": len(chunks),
        "characters": len(text)
    }