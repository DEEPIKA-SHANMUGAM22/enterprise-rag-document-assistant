import api from "./api";


export interface Conversation {
  id: number;
  title: string;
  created_at: string;
}


export interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}


export async function createConversation() {

  const response = await api.post(
    "/conversations/"
  );

  return response.data;

}


export async function getConversations()
: Promise<Conversation[]> {

  const response = await api.get(
    "/conversations/"
  );

  return response.data;

}


export async function getConversationMessages(
  conversationId: number
) {

  const response = await api.get(
    `/conversations/${conversationId}`
  );

  return response.data.messages;

}


export async function deleteConversation(
  conversationId: number
) {

  const response = await api.delete(
    `/conversations/${conversationId}`
  );

  return response.data;

}

export async function renameConversation(
  id:number,
  title:string
){

 const response = await api.put(
   `/conversations/${id}/rename`,
   {
     title:title
   }
 );

 return response.data;

}