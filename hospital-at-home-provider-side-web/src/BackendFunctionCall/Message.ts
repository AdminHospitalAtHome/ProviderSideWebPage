import {ChatClient, ChatMessage, ChatThreadClient} from "@azure/communication-chat";
import {AzureCommunicationTokenCredential} from "@azure/communication-common";
import {GiftedChat, IMessage} from "react-native-gifted-chat";

const endpointurl =
	'https://hospitalathomechat.unitedstates.communication.azure.com';
export let temp_communicationId: string = ''


export function initChatClient(userId: number): Promise<ChatClient | undefined> {
	return new Promise<ChatClient | undefined>((resolve) => {
		getCommunicationId(userId).then(res => {
			temp_communicationId = res
			getCommunicationToken(res).then(accessToken => {
				resolve(new ChatClient(endpointurl, new AzureCommunicationTokenCredential(accessToken)));
			}).catch(() => {
				console.error("Failed to init chat client");
				resolve(undefined);
			});
		}).catch(() => {
			console.error("Failed to init chat client");
			resolve(undefined);
		});
	});
}

export function initChatThreadClient(chatClient: ChatClient): Promise<ChatThreadClient | undefined> {
	return new Promise(resolve => {
		if (temp_communicationId !== '') {
			getChatThread(temp_communicationId).then(res => {
				resolve(chatClient.getChatThreadClient(res))
			}).catch(() => {
				resolve(undefined);
			})
		} else {
			console.error("no communication id set")
			resolve(undefined);
		}
	})
	
}

export function getCommunicationId(userId: number): Promise<string> {
	return new Promise((resolve, reject) => {
		fetch(
			`https://hosptial-at-home-js-api.azurewebsites.net/api/getCommunicationId?patientID=${userId}`,
		)
			.then(res => res.json())
			.then(res => {
				if (res.length === 1) {
					resolve(res[0].CommunicationId);
				} else {
					reject('failed to get communicationId');
				}
			});
	});
}

//should modify later when the provider site sis ready, call it on contact page
export function getChatThread(communicationId: string): Promise<string> {
	return new Promise((resolve, reject) => {
		fetch(
			`https://hosptial-at-home-js-api.azurewebsites.net/api/getChatThread?UserId=${communicationId}`,
		)
			.then(response => response.json())
			.then(res => {
				resolve(res[0].ThreadId);
			});
	});
}

export function getCommunicationToken(communicationId: string): Promise<string> {
	return new Promise((resolve, reject) => {
		fetch(
			`https://hosptial-at-home-js-api.azurewebsites.net/api/getUserToken?userId=${communicationId}`,
		)
			.then(res => res.json())
			.then(res => {
				resolve(res.token);
			});
	});
}

//todo: rewrite

// export function getMessage(
//   threadId: string,
//   accessToken: string,
// ): Promise<any> {
//   return new Promise((resolve, reject) => {
//     fetch(
//       `https://hospitalathomechat.unitedstates.communication.azure.com/chat/threads/${threadId}/messages?api-version=2023-11-07`,
//       {method: 'GET', headers: {Authorization: `Bearer ${accessToken}`}},
//     )
//       .then(res => res.json())
//       .then(res => resolve(res));
//   });
// }

export function getMessageNotification(chatClient: ChatClient, setChatMessages: React.Dispatch<React.SetStateAction<any[]>>) {
	chatClient.startRealtimeNotifications();
	chatClient.on('chatMessageReceived', (m) => {
		try {
			let dictionary = {
				_id: m.id,
				text: m.message,
				createdAt: m.createdOn,
				user: {
					_id: m.sender.communicationUserId,
					name: 'TEMPROARY',
				}
			}
			setChatMessages(previous => GiftedChat.append(previous, [dictionary]));
		} catch {
		}
		
	})
}


export function getAllMessages(chatThreadClient: ChatThreadClient): Promise<any[]> {
	return new Promise(async resolve => {
		const messages = chatThreadClient.listMessages()
		let parsedMessages = [];
		resolve(parsedMessages);
		for await (const m of messages) {
			// Incase it is a different kind of message like user added to chat or topic changed...
			try {
				let dictionary = {
					_id: m.id,
					text: m.content.message,
					createdAt: m.createdOn,
					user: {
						_id: m.sender.communicationUserId,
						name: 'TEMPROARY',
					}
				}
				parsedMessages.push(dictionary);
			} catch {
			
			}
		}
	});
}


export function sendMessage(chatThreadClient: ChatThreadClient, message: IMessage[], setChatMessages: React.Dispatch<React.SetStateAction<any[]>>) {
	const snedMessageRessageRequest = {content: message[0].text}
	try {
		chatThreadClient.sendMessage(snedMessageRessageRequest);
	} catch {
		console.error("Could not send message");
	}
	setChatMessages(previous => previous);
}
