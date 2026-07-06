from pathlib import Path
import pandas as pd

from langchain_community.document_loaders import (
    PyPDFLoader,
    CSVLoader,
    TextLoader,
    Docx2txtLoader,
)

# Mapping file extensions to their respective loaders
LOADERS = {
    ".pdf": PyPDFLoader,
    ".docx": Docx2txtLoader,
    ".csv": CSVLoader,
    ".txt": TextLoader,
}


def load_document(file_path: str) -> str:
    """
    Reads different document types and returns extracted text.

    Supported:
    - PDF
    - DOCX
    - CSV
    - TXT
    - XLS
    - XLSX
    """

    path = Path(file_path)

    extension = path.suffix.lower()

    # ---------- PDF / DOCX / CSV / TXT ----------
    if extension in LOADERS:

        loader = LOADERS[extension](file_path)

        documents = loader.load()

        text = "\n".join(
            doc.page_content
            for doc in documents
        )

        return text

    # ---------- Excel ----------
    elif extension in [".xlsx", ".xls"]:

        df = pd.read_excel(file_path)

        return df.to_string(index=False)

    # ---------- Unsupported ----------
    else:
        raise ValueError(
            f"Unsupported file type: {extension}"
        )