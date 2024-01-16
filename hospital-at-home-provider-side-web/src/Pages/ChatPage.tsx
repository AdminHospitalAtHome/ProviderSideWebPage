import {AzureCommunicationTokenCredential, CommunicationUserIdentifier} from "@azure/communication-common";
import {
	ChatComposite,
	fromFlatCommunicationIdentifier,
	useAzureCommunicationChatAdapter
} from "@azure/communication-react";
import {useEffect, useMemo, useState} from "react";
import {getCommunicationId} from "../BackendFunctionCall/Message";

export default function ChatPage(): JSX.Element {
	
	//doc link: https://azure.github.io/communication-ui-library/?path=/docs/composites-chat-basicexample--basic-example
	const providerId: number = 300000001
	const patientId: number = 200000001
	const endpointurl: string = 'https://hospitalathomechat.unitedstates.communication.azure.com';
	
	
	// const adapter = useAzureCommunicationChatAdapter({
	// 	endpoint: endpointurl,
	// 	userId: fromFlatCommunicationIdentifier(communicationId) as CommunicationUserIdentifier,
	// 	displayName: 'provider',
	// 	credential: AzureCommunicationTokenCredential(accessToken)
	// })
	return (<div>
		this is chat page
	</div>);
}
