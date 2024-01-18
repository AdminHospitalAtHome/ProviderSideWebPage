import React, {useEffect, useMemo, useState} from 'react'
import {
	ChatComposite, fromFlatCommunicationIdentifier,

	useAzureCommunicationChatAdapter
} from "@azure/communication-react";
import {ChatThreadClient} from "@azure/communication-chat";
import {endpointurl, getCommunicationToken} from '../../BackendFunctionCall/Message'
import {AzureCommunicationTokenCredential, CommunicationUserIdentifier} from "@azure/communication-common";

export default function ChatFrame({thread, communicationID}: {thread: ChatThreadClient, communicationID: string}):React.JSX.Element {


	const [credential, setCredential] = useState<any>(undefined);
	// const userID = fromFlatCommunicationIdentifier(communicationID) as CommunicationUserIdentifier

	const userId = useMemo( () => {
		return fromFlatCommunicationIdentifier(communicationID) as CommunicationUserIdentifier
	}, [communicationID])

	// const credential = useMemo(async () => {
	// 	await getCommunicationToken(communicationID).then((cred) => {
	// 		return (new AzureCommunicationTokenCredential(cred));
	// 	})
	// 	console.log('Thread Created')
	// }, [communicationID])

	useEffect(() => {
		getCommunicationToken(communicationID).then((cred) => {
			setCredential(new AzureCommunicationTokenCredential(cred));
		})
	}, [thread])


	console.log("Run")

	const adapter = useAzureCommunicationChatAdapter({
		endpoint: endpointurl,
		userId: userId,
		displayName: "TEMP NAME",
		credential: credential,
		threadId: thread.threadId
	})
	// let adapter = ""


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
