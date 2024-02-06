import ChatMenu from "../Components/Chat/ChatMenu";
import ChatFrame from "../Components/Chat/ChatFrame";
import './ChatPage.css'
import React, {useEffect, useReducer, useState} from "react";
import {ChatClient, ChatThreadClient} from "@azure/communication-chat";
import {
  getAllThreads,
  getCommunicationToken,
  initChatClient,
  temp_communicationId
} from "../BackendFunctionCall/Message";


export default function ChatPage(): React.JSX.Element {
  //doc link: https://azure.github.io/communication-ui-library/?path=/docs/composites-chat-basicexample--basic-example
  const providerId: number = 100001
  const [chatClient, setChatClient] = useState<ChatClient | undefined>(undefined);
  const [threadClients, setThreadClients] = useState<ChatThreadClient[]>([]);
  const [chatThread, setChatThread] = useState<ChatThreadClient | undefined>(undefined);
  const [communicationToken, setCommunicationToken] = useState<string>("")
  const [update, forceUpdate] = useReducer(x => x + 1, 0)

  useEffect(() => {
    initChatClient(providerId).then(res => {
      setChatClient(res);
      getCommunicationToken(temp_communicationId).then(setCommunicationToken)
    });

  }, []);

  useEffect(() => {
    if (chatClient) {
      getAllThreads(chatClient).then((res) => {
        setThreadClients(res);
      })
    }
  }, [chatClient, chatThread, update])




  if (chatThread && communicationToken !== "" && chatClient) {
    return (<div className="ChatPageContainer">
    <div style={{flex: 1}}><ChatMenu threadClients={threadClients} setThread={setChatThread} chatClient={chatClient} currentThread={chatThread} forceUpdate={forceUpdate}></ChatMenu></div>
    <div style={{flex: 3}}>
      <ChatFrame thread={chatThread} communicationID={temp_communicationId}
                 communicationToken={communicationToken}></ChatFrame>
    </div>
    </div>);
  } else if (chatClient) {
    return (
      <div className="ChatPageContainer">
      <div style={{flex: 1}}><ChatMenu threadClients={threadClients} setThread={setChatThread} chatClient={chatClient} currentThread={chatThread} forceUpdate={forceUpdate}></ChatMenu></div>
      <div style={{flex: 3, display: 'flex', justifyContent:'center',alignItems:'center', fontSize:'30px'}}>
        Please select a contact to start/continue chat
      </div>
      </div>);
  } else {
    return (<div className="ChatPageContainer">Loading</div>);
  }



}
