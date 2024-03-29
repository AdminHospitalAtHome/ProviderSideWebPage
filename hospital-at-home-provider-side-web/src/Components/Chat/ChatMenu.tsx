import React, {useReducer} from "react";
import ChatContactCard from "./ChatContactCard";
import './ChatMenu.css'
import {ChatClient, ChatThreadClient} from "@azure/communication-chat";
import {deleteThread, temp_communicationId} from "../../BackendFunctionCall/Message";
import ChatContactSearch from "./ChatContactSearch";
import Button from 'react-bootstrap/Button';

export default function ChatMenu({threadClients, setThread, chatClient, currentThread, forceUpdate}: {
  threadClients: ChatThreadClient[],
  setThread: React.Dispatch<React.SetStateAction<ChatThreadClient | undefined>>
  chatClient: ChatClient
  currentThread: ChatThreadClient | undefined
  forceUpdate: React.DispatchWithoutAction
}): React.JSX.Element {



  return (<div className="chat-menu-container">
    <ChatContactSearch chatClient={chatClient} providerCommunicationId={temp_communicationId} setThread={setThread} threadClients={threadClients}/>
    {threadClients.map((threadClient) => {
      let selected = false
      if (currentThread) {
        if (currentThread.threadId === threadClient.threadId) {
          selected = true;
        }

      }

      return (
        <div key={threadClient.threadId} style={{display: "flex", flexDirection: "row"}}>
          <div style={{width: '100%'}}
            onClick={() => {
            setThread(threadClient);
          }}>
            <ChatContactCard selected={selected} threadClient={threadClient} providerCommunicationID={temp_communicationId}/>
          </div>

          <div className="d-grid" style={{margin:"5px", marginLeft:"0"}}>
            <Button style={{flex:1}} onClick={() => {deleteThread(chatClient, setThread, threadClient).then(() => {
              forceUpdate()})}} variant="danger">Delete</Button>
          </div>
        </div>)
    })}
  </div>)
}

