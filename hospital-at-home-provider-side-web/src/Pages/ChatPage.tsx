import ChatMenu from "../Components/Chat/ChatMenu";
import ChatFrame from "../Components/Chat/ChatFrame";
import {useState} from "react";
import {ChatAdapter} from "@azure/communication-react";


export default function ChatPage(): JSX.Element {
	// TODO: Add paramater for ThreadID
	//doc link: https://azure.github.io/communication-ui-library/?path=/docs/composites-chat-basicexample--basic-example
	const providerId: number = 300000001
	const patientId: number = 200000001
	
	const [adapter, setAdapter] = useState<ChatAdapter | undefined>(undefined);
	
	return (
		<body style={{paddingTop: '60px', display: 'flex', flexDirection: 'row'}}>
		<div style={{flexGrow: 1}}><ChatMenu setAdapter={setAdapter} providerID={providerId}></ChatMenu></div>
		<div style={{flexGrow: 11}}><ChatFrame adapter={adapter}></ChatFrame></div>
		</body>
	
	);
}
