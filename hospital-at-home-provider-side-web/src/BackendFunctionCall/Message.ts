const endpointurl =
	'https://hospitalathomechat.unitedstates.communication.azure.com';
//reference of mobile app function:https://github.com/AdminHospitalAtHome/2023-2024seniorProjectTest/blob/main/SeniorProjectApp/BackEndFunctionCall/ChatFunctions/Message.ts
//reference of web app functions: https://github.com/AdminHospitalAtHome/ProviderWebPage/blob/main/ProviderWebPage/app/BackendFunctions/Chat/Message.ts
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


