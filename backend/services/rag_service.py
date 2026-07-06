from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage

from config import GEMINI_API_KEY, MODEL_NAME
from utils.prompt import SYSTEM_PROMPT

from services.vector_service import embed_query
from database.chroma_db import search


SIMILARITY_THRESHOLD = 0.7


if GEMINI_API_KEY:
    llm = ChatGoogleGenerativeAI(
        model=MODEL_NAME,
        google_api_key=GEMINI_API_KEY,
        temperature=0
    )
else:
    llm = None



def ask_question(question: str):

    if llm is None:

        raise RuntimeError(
            "GEMINI_API_KEY missing"
        )


    # 1. Convert question → embedding

    query_embedding = embed_query(
        question
    )


    # 2. Search Chroma

    results = search(
        query_embedding
    )


    print(
        "\n===== CHROMA RESULTS ====="
    )

    print(results)



    documents = results.get(
        "documents",
        []
    )


    metadatas = results.get(
        "metadatas",
        []
    )


    distances = results.get(
        "distances",
        []
    )



    # No chunks returned

    if (
        not documents
        or not documents[0]
    ):

        return {

            "answer":
            "I couldn't find this information in the uploaded documents.",

            "sources":[]

        }



    # Distance guardrail ⭐

    best_distance = distances[0][0]



    if best_distance > SIMILARITY_THRESHOLD:


        return {

            "answer":
            "I couldn't find this information in the uploaded documents.",

            "sources":[]

        }



    # Relevant chunks only reach Gemini


    context = "\n\n".join(
        documents[0]
    )



    prompt = f"""

{SYSTEM_PROMPT}


You must answer only from the given context.

If the answer is not present in the context,
say:
"I couldn't find this information in the uploaded documents."


Context:

{context}


Question:

{question}

"""



    response = llm.invoke(

        [
            HumanMessage(
                content=prompt
            )
        ]

    )



    sources = []


    if metadatas and metadatas[0]:

        sources = metadatas[0]



    return {

        "answer": response.content,

        "sources": sources

    }