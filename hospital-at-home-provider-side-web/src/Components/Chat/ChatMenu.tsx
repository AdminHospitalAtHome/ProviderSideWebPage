import {Container, Card} from 'react-bootstrap'
import React, {useEffect, useState} from "react";
import ChatContactCard from "./ChatContactCard";
import {ChatClient, ChatThreadClient} from "@azure/communication-chat";
import {ChatAdapter} from '@azure/communication-react'
import {getAllThreads, initChatClient, temp_communicationId} from "../../BackendFunctionCall/Message";

export default function ChatMenu({threadClients, setThread}: {threadClients: ChatThreadClient[], setThread: React.Dispatch<React.SetStateAction<ChatThreadClient | undefined>>}): React.JSX.Element{



  return (<div>
    {threadClients.map((threadClient) => {
      return (
        <div onClick={() => {
          console.log("Click")
          setThread(threadClient);
        }}>
          <ChatContactCard threadClient={threadClient} providerCommunicationID={temp_communicationId}/>
      </div>)
    })}

  </div>)

}


