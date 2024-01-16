export function getAllPatients(): Promise<any> {
    const url = 'https://hosptial-at-home-js-api.azurewebsites.net/api/getPatients';
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(json => {
          resolve(json);
        });
    });
  }

export function getAllPatientsByProviderID(providerID: number): Promise<any> {
    const url = `https://hosptial-at-home-js-api.azurewebsites.net/api/getPatientsByProviderID?providerID=${providerID}`;
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(json => {
                resolve(json);
            });
    });
}
