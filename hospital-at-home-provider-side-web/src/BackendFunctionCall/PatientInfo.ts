export async function getPatientInfo(patientId: number): Promise<any> {
	const url: string = `https://hosptial-at-home-js-api.azurewebsites.net/api/getPatientInfo?patientID=${patientId}&code=piO9MZacn4gt6wC-VuzjMCAwvJuO7us_vXfGCJ-oesgrAzFu140Xpw==`
	return new Promise((resolve) => {
		fetch(url)
			.then(res => res.json())
			.then(output => resolve(output[0]));
	})
}
