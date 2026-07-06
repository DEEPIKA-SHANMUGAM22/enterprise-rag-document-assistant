import { useEffect, useState } from "react";

import {
  Plus,
  MessageSquare,
  Trash2,
  Pencil,
} from "lucide-react";


import {
  createConversation,
  deleteConversation,
  getConversations,
  renameConversation,
} from "../../services/historyService";


import type {
  Conversation,
} from "../../services/historyService";



type SidebarProps = {

  refreshHistory:number;

  onSelectConversation:
    (id: number) => void;


  onNewConversation:
    (id: number) => void;

};



export default function Sidebar({
  refreshHistory,
  onSelectConversation,
  onNewConversation,
}: SidebarProps) {


  const [conversations, setConversations] =
    useState<Conversation[]>([]);


  const [editingId, setEditingId] =
    useState<number | null>(null);


  const [editTitle, setEditTitle] =
    useState("");



  const loadConversations = async () => {

    const data =
      await getConversations();


    setConversations(data);

  };



  useEffect(() => {

    loadConversations();

  }, [refreshHistory]);




  const handleNewChat = async () => {


    const conversation =
      await createConversation();



    onNewConversation(
      conversation.id
    );


    loadConversations();

  };




  const handleDelete = async (
    id:number
  ) => {


    await deleteConversation(id);


    loadConversations();

  };




  const handleRename = async (
    id:number
  ) => {


    if(!editTitle.trim()){

      return;

    }


    await renameConversation(
      id,
      editTitle
    );


    setEditingId(null);

    setEditTitle("");


    loadConversations();


  };




  return (


    <aside className="
      w-72
      h-full
      bg-background
      border-r
      border-border
      flex
      flex-col
    ">



      {/* New Chat */}

      <div className="p-4">


        <button

          onClick={handleNewChat}

          className="
          w-full
          flex
          gap-2
          justify-center
          items-center
          rounded-xl
          bg-blue-600
          text-white
          py-3
          hover:bg-blue-700
          "

        >


          <Plus size={18}/>


          New Chat


        </button>


      </div>





      {/* Chat List */}

      <div className="
      flex-1
      px-3
      overflow-y-auto
      ">



        <p className="
        text-xs
        uppercase
        text-slate-500
        mb-3
        ">

          Recent Chats

        </p>





        {conversations.map(
          (chat)=>(


          <div

            key={chat.id}

            className="
            group
            flex
            justify-between
            items-center
            gap-2
            rounded-lg
            px-3
            py-2
            hover:bg-slate-800
            cursor-pointer
            "

          >



            <div

              onClick={() =>
                onSelectConversation(chat.id)
              }

              className="
              flex
              gap-3
              items-center
              flex-1
              overflow-hidden
              "

            >


              <MessageSquare size={17}/>



              {editingId === chat.id ? (


                <input

                  autoFocus

                  value={editTitle}


                  onChange={(e)=>

                    setEditTitle(
                      e.target.value
                    )

                  }


                  onClick={(e)=>
                    e.stopPropagation()
                  }


                  onKeyDown={(e)=>{

                    if(e.key==="Enter"){

                      handleRename(
                        chat.id
                      );

                    }

                  }}


                  className="
                  bg-transparent
                  border
                  border-slate-600
                  rounded
                  px-2
                  py-1
                  text-sm
                  outline-none
                  w-full
                  "

                />


              ):(


                <span className="
                text-sm
                truncate
                ">


                  {chat.title}


                </span>


              )}



            </div>




            {/* Rename */}

            <Pencil

              size={15}

              onClick={(e)=>{

                e.stopPropagation();


                setEditingId(
                  chat.id
                );


                setEditTitle(
                  chat.title
                );

              }}


              className="
              opacity-0
              group-hover:opacity-100
              text-slate-400
              hover:text-white
              "

            />





            {/* Delete */}

            <Trash2

              size={15}


              onClick={(e)=>{

                e.stopPropagation();

                handleDelete(
                  chat.id
                );

              }}


              className="
              opacity-0
              group-hover:opacity-100
              text-red-400
              "

            />



          </div>


        ))}


      </div>



    </aside>


  );

}