import ChatMenu from "../Components/Chat/ChatMenu";
import ChatFrame from "../Components/Chat/ChatFrame";
import React, {useEffect, useState} from "react";
import {ChatClient, ChatThreadClient} from "@azure/communication-chat";
import {
  getAllThreads,
  getCommunicationToken,
  initChatClient,
  temp_communicationId
} from "../BackendFunctionCall/Message";


export default function ChatPage(): React.JSX.Element {
  //doc link: https://azure.github.io/communication-ui-library/?path=/docs/composites-chat-basicexample--basic-example
  const providerId: number = 300000001
  const [chatClient, setChatClient] = useState<ChatClient | undefined>(undefined);
  const [threadClients, setThreadClients] = useState<ChatThreadClient[]>([]);
  const [chatThread, setChatThread] = useState<ChatThreadClient | undefined>(undefined);
  const [communicationToken, setCommunicationToken] = useState<string>("")

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
  }, [chatClient, chatThread])


  if (chatThread && communicationToken !== "" && chatClient) {
    return (<body style={{paddingTop: '60px', display: 'flex', flexDirection: 'row'}}>
    <div style={{flexGrow: 1}}><ChatMenu threadClients={threadClients} setThread={setChatThread} chatClient={chatClient} currentThread={chatThread}></ChatMenu></div>
    <div style={{flexGrow: 11}}>
      <ChatFrame thread={chatThread} communicationID={temp_communicationId}
                 communicationToken={communicationToken}></ChatFrame>
    </div>
    </body>);
  } else if (chatClient) {
    return (
      <body style={{paddingTop: '60px', display: 'flex', flexDirection: 'row'}}>
      <div style={{flexGrow: 1}}><ChatMenu threadClients={threadClients} setThread={setChatThread} chatClient={chatClient} currentThread={chatThread}></ChatMenu></div>
      <div style={{flexGrow: 11}}>
        Please Select a Chat...
      </div>
      </body>);
  } else {
    return (<body style={{paddingTop: '60px', display: 'flex', flexDirection: 'row'}}></body>);
  }



}
