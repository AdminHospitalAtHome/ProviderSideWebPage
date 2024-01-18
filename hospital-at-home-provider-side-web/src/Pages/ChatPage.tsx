import ChatMenu from "../Components/Chat/ChatMenu";
import ChatFrame from "../Components/Chat/ChatFrame";
import React, {useEffect, useState} from "react";
import {ChatAdapter} from "@azure/communication-react";
import {ChatClient, ChatThreadClient} from "@azure/communication-chat";
import {getAllThreads, initChatClient, temp_communicationId} from "../BackendFunctionCall/Message";



export default function ChatPage(): React.JSX.Element {
	// TODO: Add paramater for ThreadID
	//doc link: https://azure.github.io/communication-ui-library/?path=/docs/composites-chat-basicexample--basic-example
	const providerId: number = 300000001
	const patientId: number = 200000001
	const [chatClient, setChatClient] = useState<ChatClient | undefined>(undefined);
	const [threadClients, setThreadClients] = useState<ChatThreadClient[]>([]);
	const [chatThread, setChatThread] = useState<ChatThreadClient | undefined>(undefined);

	useEffect(() => {
		console.log("Run");
		initChatClient(providerId).then(res => {
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

	useEffect(() => {
		if (threadClients.length !== 0) {
			setChatThread(threadClients[0])
		}
	}, [threadClients]);







	if (chatThread) {
		return (<body style={{paddingTop: '60px', display: 'flex', flexDirection: 'row'}}>
		<div style={{flexGrow: 1}}><ChatMenu threadClients={threadClients} setThread={setChatThread}></ChatMenu></div>
		<div style={{flexGrow: 11}}>
			<ChatFrame thread={chatThread} communicationID={temp_communicationId}></ChatFrame>
		</div>
		</body>);
	} else {
		return (
		<body style={{paddingTop: '60px', display: 'flex', flexDirection: 'row'}}>
		<div style={{flexGrow: 11}}><ChatMenu threadClients={threadClients} setThread={setChatThread}></ChatMenu></div>

		</body>);
	}


}
