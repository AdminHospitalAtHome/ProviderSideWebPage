import {ChatClient} from "@azure/communication-chat";
import {AzureCommunicationTokenCredential} from "@azure/communication-common";

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

export function getAllThreads(chatClient: ChatClient): Promise<String[]> {
	return new Promise<String[]>(async (resolve) => {
		const threads = chatClient.listChatThreads()
		let threadIDs: string[] = [];
		for await (const t of threads) {
			try {
				threadIDs.push(t.id);
			} catch {

			}
		}
		resolve(threadIDs);
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


