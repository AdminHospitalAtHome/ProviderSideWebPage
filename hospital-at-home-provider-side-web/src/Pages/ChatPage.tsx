import ChatMenu from "../Components/Chat/ChatMenu";
import ChatFrame from "../Components/Chat/ChatFrame";


export default function ChatPage(): JSX.Element {
	// TODO: Add paramater for ThreadID
	//doc link: https://azure.github.io/communication-ui-library/?path=/docs/composites-chat-basicexample--basic-example
	const providerId: number = 300000001
	const patientId: number = 200000001
	
	return (
		<body style={{paddingTop: '60px'}}>
		<ChatMenu providerID={providerId}></ChatMenu>
		<ChatFrame></ChatFrame>
		</body>

	);
}
