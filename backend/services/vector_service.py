from sentence_transformers import SentenceTransformer

embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def embed_chunks(chunks: list[str]):

    return embedding_model.encode(chunks)


def embed_query(query: str):

    return embedding_model.encode(query)