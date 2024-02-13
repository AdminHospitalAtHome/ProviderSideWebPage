export async function addMedication(name:string, prescription:boolean) {
    const url = 'https://hosptial-at-home-js-api.azurewebsites.net/api/addMedication?code=4VAUDupAuBUSNjrtbjimScJo2L5cl5lHCjagDs8g753PAzFuKiqPrA==';
    const data = {
        "name": name,
        "prescription": prescription,
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


export async function getPatientMedication(patientId:string) {
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

export async function getMedication(patientId:string) {
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


export function updatePatientNote(id: number, prescription: boolean, amount:string): Promise<string> {
    const url = 'https://hosptial-at-home-js-api.azurewebsites.net/api/updatePatientMedication?code=hIjsqmkrlNSmsWERv6EJJ985dpHgM4bjykeJXbDl3StfAzFuM44u-g==';
    const data = {
        "id": id,
        "prescription": prescription,
        "amount":amount
    };

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'PUT',
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

export async function addPatientMedication(patientId:string, medicationName:string, amount:string, prescription: boolean) {
    const url = 'https://hosptial-at-home-js-api.azurewebsites.net/api/addPatientMedication?code=3mxlebfOfAfA_OPnvYYabTSER13AUoWCWqMl9B7br-ljAzFuoaTOPA==';
    const data = {
        "patientID": patientId,
        "medicationName":medicationName,
        "amount":amount,
        "prescription":prescription
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


