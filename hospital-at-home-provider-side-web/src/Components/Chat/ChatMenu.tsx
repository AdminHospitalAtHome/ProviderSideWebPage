import React from "react";
import ChatContactCard from "./ChatContactCard";
import {ChatClient, ChatThreadClient} from "@azure/communication-chat";
import {temp_communicationId} from "../../BackendFunctionCall/Message";
import ChatContactSearch from "./ChatContactSearch";

export default function ChatMenu({threadClients, setThread, chatClient, currentThread}: {
  threadClients: ChatThreadClient[],
  setThread: React.Dispatch<React.SetStateAction<ChatThreadClient | undefined>>
  chatClient: ChatClient
  currentThread: ChatThreadClient | undefined
}): React.JSX.Element {
  return (<div>
    <ChatContactSearch chatClient={chatClient} providerCommunicationId={temp_communicationId} setThread={setThread} threadClients={threadClients}/>
    {threadClients.map((threadClient) => {
      let selected = false
      if (currentThread) {
        if (currentThread.threadId === threadClient.threadId) {
          selected = true;
        }
      }
      return (

        <div onClick={() => {
          console.log("Click")
          setThread(threadClient);
        }}>
          <ChatContactCard selected={selected} threadClient={threadClient} providerCommunicationID={temp_communicationId}/>
        </div>)
    })}
  </div>)
}


