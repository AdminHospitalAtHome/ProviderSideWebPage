import React, {useEffect, useState} from 'react'
import {
	ChatComposite, fromFlatCommunicationIdentifier,

	useAzureCommunicationChatAdapter
} from "@azure/communication-react";
import {ChatThreadClient} from "@azure/communication-chat";
import {endpointurl, getCommunicationToken} from '../../BackendFunctionCall/Message'
import {AzureCommunicationTokenCredential, CommunicationUserIdentifier} from "@azure/communication-common";

export default function ChatFrame({thread, communicationID}: {thread: ChatThreadClient, communicationID: string}):React.JSX.Element {


	const [credential, setCredential] = useState<any>(undefined);
	const userID = fromFlatCommunicationIdentifier(communicationID) as CommunicationUserIdentifier
	// const adapter = useAzureCommunicationChatAdapter({});

	useEffect(() => {
		getCommunicationToken(communicationID).then((cred) => {
			setCredential(new AzureCommunicationTokenCredential(cred));
		})
		console.log('Thread Created')
	}, [thread])

	//
	// useEffect(()=> {
	// 	 adapter = useAzureCommunicationChatAdapter({
	// 		endpoint: endpointurl,
	// 		userId: userID,
	// 		displayName: "TEMP NAME",
	// 		credential: credential,
	// 		threadId: thread.threadId
	// 	})
	// }, [credential])

	console.log("Run")

	const adapter = useAzureCommunicationChatAdapter({
		endpoint: endpointurl,
		userId: userID,
		displayName: "TEMP NAME",
		credential: credential,
		threadId: thread.threadId
	})


	if (adapter) {
		return (
			<div>
				<ChatComposite adapter={adapter}></ChatComposite>
			</div>
		);
	} else {
		return (<div></div>);
	}



}
