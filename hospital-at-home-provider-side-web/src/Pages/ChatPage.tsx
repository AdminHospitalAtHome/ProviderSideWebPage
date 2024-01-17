import {AzureCommunicationTokenCredential, CommunicationUserIdentifier} from "@azure/communication-common";
import {
	ChatComposite,
	fromFlatCommunicationIdentifier,
	useAzureCommunicationChatAdapter
} from "@azure/communication-react";
import {useEffect, useMemo, useState} from "react";
import {getCommunicationId} from "../BackendFunctionCall/Message";
import ChatMenu from "../Components/ChatMenu";

export default function ChatPage(): JSX.Element {
	// TODO: Add paramater for ThreadID
	//doc link: https://azure.github.io/communication-ui-library/?path=/docs/composites-chat-basicexample--basic-example
	const providerId: number = 300000001
	const patientId: number = 200000001
	const endpointurl: string = 'https://hospitalathomechat.unitedstates.communication.azure.com';
	// const patientCommunicationID = useMemo(() => {
	// 	getCommunicationId(providerid)
	// })
	// const credential = useMemo(() => {
	// 	try {
	// 		return new AzureCommunicationTokenCredential()
	// 	}
	// })

	// const adapter = useAzureCommunicationChatAdapter({
	// 	endpoint: endpointurl,
	// 	userId: fromFlatCommunicationIdentifier(communicationId) as CommunicationUserIdentifier,
	// 	displayName: 'provider',
	// 	credential: AzureCommunicationTokenCredential(accessToken)
	// })





	return (
		<body style={{paddingTop: '60px'}}>
		<ChatMenu providerID={providerId}></ChatMenu>
		</body>

	);
}
