import api from "./api";


export interface Source {

  filename: string;

  chunk_number: number;

}


export interface ChatResponse {

  answer: string;

  sources: Source[];

}



export async function askQuestion(

  conversationId: number,

  question: string

): Promise<ChatResponse> {


  const response = await api.post(

    "/chat",

    {

      conversation_id: conversationId,

      question: question,

    }

  );


  return response.data;

}