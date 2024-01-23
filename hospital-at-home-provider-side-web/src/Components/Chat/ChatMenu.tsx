import React, {useEffect} from "react";
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
	useEffect( () => {
	temp().then((res) => {
		console.log("Done")
	})
		for (let i of threadClients) {
			console.log(i)
		}
		
	
	}, [threadClients,chatClient]);
	
	return (<div>
		<ChatContactSearch chatClient={chatClient} providerCommunicationId={temp_communicationId} setThread={setThread}
		                   threadClients={threadClients}/>
		
		{threadClients.map((threadClient) => {
			let selected = false
			if (currentThread) {
				if (currentThread.threadId === threadClient.threadId) {
					selected = true;
				}
			}
			try {
				return (
					<div onClick={() => {
						setThread(threadClient);
					}}>
						<ChatContactCard selected={selected} threadClient={threadClient}
						                 providerCommunicationID={temp_communicationId}/>
					</div>)
			} catch {
				console.log("ERROR")
				console.log(threadClient)
				return(<div></div>)
			}
			
		})}
	</div>)
}


function temp() {
	return new Promise(async (resolve) => {
		let threadClients: ChatThreadClient[] = [];
		for await (const t of threadClients) {
			try {
				console.log(t)
			} catch {
				console.log("HEY")
			}
		}
		resolve("")
	})
}
