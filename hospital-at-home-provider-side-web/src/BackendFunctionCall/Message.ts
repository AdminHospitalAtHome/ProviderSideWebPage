import {ChatClient, ChatThreadClient} from "@azure/communication-chat";
import {AzureCommunicationTokenCredential, CommunicationUserIdentifier} from "@azure/communication-common";
import {fromFlatCommunicationIdentifier, useAzureCommunicationChatAdapter} from "@azure/communication-react";

const endpointurl =
	'https://hospitalathomechat.unitedstates.communication.azure.com';
//reference of mobile app function:https://github.com/AdminHospitalAtHome/2023-2024seniorProjectTest/blob/main/SeniorProjectApp/BackEndFunctionCall/ChatFunctions/Message.ts
//reference of web app functions: https://github.com/AdminHospitalAtHome/ProviderWebPage/blob/main/ProviderWebPage/app/BackendFunctions/Chat/Message.ts

export let temp_communicationId: string = ''


export function initChatClient(userId: number): Promise<ChatClient | undefined> {
	return new Promise<ChatClient | undefined>((resolve) => {
		getCommunicationId(userId).then(res => {
			temp_communicationId = res
			console.log(temp_communicationId);
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

export function getAllThreads(chatClient: ChatClient): Promise<ChatThreadClient[]> {
	return new Promise<ChatThreadClient[]>(async (resolve) => {
		const threads = chatClient.listChatThreads()
		let threadClients: ChatThreadClient[] = [];
		for await (const t of threads) {
			try {
				threadClients.push(chatClient.getChatThreadClient(t.id))
			} catch {
			
			}
		}
		resolve(threadClients);
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

export async function getParticipantInThread(chatThreadClient: ChatThreadClient, communicationID: string) {
	return new Promise<string | undefined>(async (resolve) => {
		let participants = chatThreadClient.listParticipants()
		for await (const p of participants) {
			try {
				// @ts-ignore
				if (p.id.communicationUserId !== communicationID) {
					resolve(p.displayName);
				}
			} catch {
			}
			// if (communicationID === p.id)
			// console.log(p.id);
		}
		resolve("Error");
	});
}

export function getThreadLastMessage(chatThreadClient: ChatThreadClient) {
	return new Promise(async (resolve) => {
		let messages = chatThreadClient.listMessages()
		messages.next().then((res) => {
			resolve(res.value)
		})
	})
}

export function createAdapter(chatThreadClient: ChatThreadClient, communicationUserId: string) {
	return new Promise((resolve) => )
	getCommunicationToken(communicationUserId).then((cred) => {
			return useAzureCommunicationChatAdapter({
				endpoint: endpointurl,
				userId: fromFlatCommunicationIdentifier(communicationUserId) as CommunicationUserIdentifier,
				displayName: "TEMP",
				credential: new AzureCommunicationTokenCredential(cred),
				threadId: chatThreadClient.threadId
			})
		}
	)
	
}
