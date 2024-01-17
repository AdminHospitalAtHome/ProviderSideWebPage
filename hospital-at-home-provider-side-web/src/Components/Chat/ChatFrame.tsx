import React, {useEffect, useState} from 'react'
import {
	ChatAdapter, ChatComposite,
	useAzureCommunicationCallAdapter,
	useAzureCommunicationChatAdapter
} from "@azure/communication-react";

export default function ChatFrame({adapter}: {adapter: ChatAdapter | undefined}):React.JSX.Element{
	
	if (adapter) {
		return(
			<div>
				<ChatComposite adapter={adapter}></ChatComposite>
			</div>
		);
	} else {
		return(<div></div>)
	}
	
}
