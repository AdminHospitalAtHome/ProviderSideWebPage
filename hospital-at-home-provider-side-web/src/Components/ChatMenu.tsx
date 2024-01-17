import {Container, Card} from 'react-bootstrap'
import React, {useEffect, useState} from "react";
import ChatContactCard from "./ChatContactCard";
import {ChatClient, ChatThreadClient} from "@azure/communication-chat";
import {initChatClient} from "../BackendFunctionCall/Message";

export default function ChatMenu({providerID}:{providerID: number}): React.JSX.Element{
  const [chatClient, setChatClient] = useState<ChatClient | undefined>(undefined);
  const [threadIDs, setThreadIDs] = useState<string[]>([]);

  useEffect(() => {
    console.log("Run");
    initChatClient(providerID).then(res => {
      setChatClient(res);
    });
  }, []);

  useEffect(() => {
    console.log("GetAllThreads");
    
  })

  return (<div>
    <ChatContactCard threadID={"1"}></ChatContactCard>
    <ChatContactCard threadID={"1"}></ChatContactCard>
  </div>)
}
