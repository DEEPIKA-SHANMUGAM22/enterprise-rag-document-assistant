import chromadb

# Create persistent client
client = chromadb.PersistentClient(path="chroma_storage")

# Create or load collection
collection = client.get_or_create_collection(
    name="documents_v2"
)

def store_embeddings(ids, embeddings, documents, metadatas):

    collection.add(
        ids=ids,
        embeddings=embeddings.tolist(),
        documents=documents,
        metadatas=metadatas
    )

def search(query_embedding, top_k=5):

    results = collection.query(
        query_embeddings=[query_embedding.tolist()],
        n_results=top_k,
        include=[
        "documents",
        "metadatas",
        "distances"
    ]
    )

    return results