import React from "react";
import ChatContactCard from "./ChatContactCard";
import {ChatClient, ChatThreadClient} from "@azure/communication-chat";
import {temp_communicationId} from "../../BackendFunctionCall/Message";
import ChatContactSearch from "./ChatContactSearch";

export default function ChatMenu({threadClients, setThread, chatClient}: {
  threadClients: ChatThreadClient[],
  setThread: React.Dispatch<React.SetStateAction<ChatThreadClient | undefined>>
  chatClient: ChatClient
}): React.JSX.Element {
  return (<div>
    <ChatContactSearch chatClient={chatClient} providerCommunicationId={temp_communicationId} setThread={setThread} threadClients={threadClients}/>
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


