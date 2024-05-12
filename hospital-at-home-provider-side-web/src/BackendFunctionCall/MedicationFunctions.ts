import {promises, resolve} from "dns";

export async function addMedication(name: string, type: string) {
	const url = 'https://hosptial-at-home-js-api.azurewebsites.net/api/addMedication?code=4VAUDupAuBUSNjrtbjimScJo2L5cl5lHCjagDs8g753PAzFuKiqPrA==';
	const data = {
		"name": name,
		"type": type
	};
	
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				resolve(data);
			})
		
	});
}


export async function getPatientMedication(patientId: number): Promise<any> {
	const url = `https://hosptial-at-home-js-api.azurewebsites.net/api/getPatientMedication?patientID=${patientId}&code=Ym7JEhYE-10Z9rWHnUoLez9JNuxoOoqY8v-5Rg5_RZLbAzFu-22DMA==`;
	
	
	return new Promise((resolve) => {
		fetch(
			url,
		)
			.then(res => res.json())
			.then(output => {
				resolve(output);
			});
	});
}

export async function getMedication(): Promise<any> {
	const url = `https://hosptial-at-home-js-api.azurewebsites.net/api/getMedication?code=5fK7lqN5CInxa9YceM0f-kgO6NMxkCEF3nJHDhBs2j4RAzFuieqp9A==`;
	
	
	return new Promise((resolve) => {
		fetch(
			url,
		)
			.then(res => res.json())
			.then(output => {
				resolve(output);
			});
	});
}


export async function deletePatientMedication(id: number): Promise<any> {
	const url = `https://hosptial-at-home-js-api.azurewebsites.net/api/deletePatientMedication?code=eF2AaQIahCW6IveOBeofYVOyIhXMsDEN_V6qLBfn7KHHAzFusNIq3w==&id=${id}`;
	try {
		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		
		return await response.json();
	} catch (error) {
		console.error('There was a problem with the fetch operation:', error);
		throw error;
	}
}


export async function addPatientMedication(patientId: number, medicationName: string, amount: string, unit: string, type: string, frequency: number) {
	const url = 'https://hosptial-at-home-js-api.azurewebsites.net/api/addPatientMedication?code=3mxlebfOfAfA_OPnvYYabTSER13AUoWCWqMl9B7br-ljAzFuoaTOPA==';
	console.log(new Date().toISOString().slice(0, 10));
	const data = {
		"patientID": patientId,
		"medicationName": medicationName,
		"amount": amount,
		"unit": unit,
		"type": type,
		"frequency": frequency,
		"startDate": new Date().toISOString().slice(0, 10)
	}
	
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				resolve(data);
			})
		
	});
}

export async function getPatientAllergy(patientId: number): Promise<any> {
	const url = `https://hosptial-at-home-js-api.azurewebsites.net/api/getPatientAllergy?patientID=${patientId}code=bufIZF8lU4veGYO0thJNyP28Gi9DsPifWudMxkaDycv7AzFuzSe-_Q==`
	return new Promise((resolve, reject) => {
		fetch(url)
			.then(res => res.json())
			.then(res => resolve(res)
			)
	})
}

export async function updatePatientMedication(id: number, amount?: number, frequency?: number, endDate?: string): Promise<any> {
	const url: string = 'https://hosptial-at-home-js-api.azurewebsites.net/api/updatePatientMedication?code=hIjsqmkrlNSmsWERv6EJJ985dpHgM4bjykeJXbDl3StfAzFuM44u-g%3D%3D';
	
	const body = {
		id, // Always required
		...(amount != null && {amount}), // Include amount only if provided
		...(frequency != null && {frequency}), // Include frequency only if provided
		...(endDate != null && {endDate}) // Include endDate only if provided
	};
	
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body)
		})
			.then(response => {
				resolve(response);
			})
			.catch(error => reject(error));
	});
}



