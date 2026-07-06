import { useState, useEffect, useRef } from "react";

import TypingIndicator from "./TypingIndicator";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

import { askQuestion } from "../../services/chatService";

import {
  getConversationMessages,
} from "../../services/historyService";


type ChatMessage = {
  role: "user" | "assistant";

  message: string;

  source?: {
    filename: string;
    chunk_number: number;
  };
};


type ChatWindowProps = {

  conversationId: number | null;

  onHistoryUpdate?: () => void;

};


export default function ChatWindow({
  conversationId,
  onHistoryUpdate,
}: ChatWindowProps) {


  const [messages, setMessages] =
    useState<ChatMessage[]>([]);


  const [loading, setLoading] =
    useState(false);


  const bottomRef =
    useRef<HTMLDivElement>(null);



  // auto scroll
  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);



  // load old conversation messages
  useEffect(() => {


    async function loadMessages() {


      if (!conversationId) {

        setMessages([]);

        return;

      }


      const oldMessages =
        await getConversationMessages(
          conversationId
        );


      setMessages(

        oldMessages.map(
          (msg:any)=>({

            role: msg.role,

            message: msg.content,

          })

        )

      );

    }


    loadMessages();


  }, [conversationId]);




  const handleSend = async (
    question:string
  ) => {


    if (!conversationId) {

      alert(
        "Create a new chat first"
      );

      return;

    }



    const userMessage: ChatMessage = {

      role:"user",

      message:question,

    };


    setMessages(
      (prev)=>[
        ...prev,
        userMessage
      ]
    );

    onHistoryUpdate?.();
    setLoading(true);


    try {


      const result =
        await askQuestion(
          conversationId,
          question
        );



      const assistantMessage:ChatMessage = {

        role:"assistant",

        message:result.answer,

        source:
          result.sources?.[0],

      };


      setMessages(
        (prev)=>[
          ...prev,
          assistantMessage
        ]
      );


    }

    catch(error){


      console.error(error);


      setMessages(
        (prev)=>[
          ...prev,
          {
            role:"assistant",
            message:
            "Something went wrong while contacting server."
          }
        ]
      );


    }

    finally{

      setLoading(false);

    }

  };



  return (

    <div className="
    flex-1 
    flex 
    flex-col 
    bg-slate-950
    ">


      <div className="
      flex-1 
      overflow-y-auto 
      p-8
      ">


        {messages.length === 0 && (

          <div className="
          flex 
          h-full
          items-center 
          justify-center
          ">


            <div className="
            text-center
            ">


              <div className="text-6xl mb-5">
                🤖
              </div>


              <h1 className="
              text-5xl 
              font-bold
              ">

                AI Document Assistant

              </h1>


              <p className="
              text-slate-400
              mt-5
              ">

                Upload documents and ask questions.

              </p>


            </div>


          </div>

        )}




        {messages.map(
          (msg,index)=>(


          <MessageBubble

            key={index}

            role={msg.role}

            message={msg.message}

            source={msg.source}

          />


        ))}




        {loading && (

          <TypingIndicator/>

        )}


        <div ref={bottomRef}/>


      </div>



      <ChatInput

        onSend={handleSend}

        loading={loading}

      />



    </div>

  );

}