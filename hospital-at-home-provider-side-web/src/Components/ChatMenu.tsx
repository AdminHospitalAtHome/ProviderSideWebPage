import {Container, Card} from 'react-bootstrap'
import React, {useEffect, useState} from "react";
import ChatContactCard from "./ChatContactCard";
import {ChatClient, ChatThreadClient} from "@azure/communication-chat";
import {getAllThreads, initChatClient, temp_communicationId} from "../BackendFunctionCall/Message";

export default function ChatMenu({providerID}:{providerID: number}): React.JSX.Element{
  const [chatClient, setChatClient] = useState<ChatClient | undefined>(undefined);
  const [threadClients, setThreadClients] = useState<ChatThreadClient[]>([]);

  useEffect(() => {
    console.log("Run");
    initChatClient(providerID).then(res => {
      setChatClient(res);
    });
  }, []);
  
  useEffect(() => {
    console.log("GetAllThreads");
    if (chatClient) {
      getAllThreads(chatClient).then((res) => {
        setThreadClients(res);
      })
    }
  },[chatClient])

  
  return (<div>
    {threadClients.map((threadClient) => {
      return (<ChatContactCard threadClient={threadClient} providerCommunicationID={temp_communicationId}/>)
    })}
 
  </div>)
}
