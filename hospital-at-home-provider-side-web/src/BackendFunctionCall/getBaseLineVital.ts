export function getBaseLineVitals(patientID: number | null): Promise<any> {
    if(!patientID){
        return new Promise((resolve, reject) => {
            reject("no patient ID");
        });
    }
    let url = `https://hosptial-at-home-js-api.azurewebsites.net/api/getBaseLineVitals?code=WEzRT_DAtsflyLkJxfkTd4KFaeI11NrmSuNdOTFzWwGmAzFuD-m59Q==&patientID=${patientID}`;
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(json => {
                resolve(json);
            });
    });
}
