import { useState } from "react";

import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import ChatWindow from "./components/Chat/ChatWindow";


export default function App() {


  const [
    currentConversationId,
    setCurrentConversationId
  ] = useState<number | null>(null);


  const [
    refreshHistory,
    setRefreshHistory
  ] = useState(0);



  return (

    <div className="
    h-screen
    flex
    bg-background
    text-foreground
    ">


      <Sidebar

        refreshHistory={refreshHistory}


        onSelectConversation={(id)=>
          setCurrentConversationId(id)
        }


        onNewConversation={(id)=>
          setCurrentConversationId(id)
        }

      />



      <div className="
      flex
      flex-col
      flex-1
      ">


        <Header />


        <ChatWindow

          conversationId={
            currentConversationId
          }


          onHistoryUpdate={()=>{

            setRefreshHistory(
              prev=>prev+1
            );

          }}

        />


      </div>


    </div>

  );

}