
export async function getPatientNotes(patientID: number): Promise<any> {
    const url: string = `https://hosptial-at-home-js-api.azurewebsites.net/api/getPatientNotesNew?patientID=${patientID}&code=ANuYmp9mSaeRs0Y8bo0eCBUEQxG6Z3gyD86ciqZYBEOPAzFu2VbWyg==`;

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


export function updatePatientNote(uuid: string, noteText: string): Promise<string> {
    const url = 'https://hosptial-at-home-js-api.azurewebsites.net/api/updateNotesNew?code=cZ88dzL_E4sp05-2Bk9L5YtlnKSdE5uWgaxKlaLHqWyxAzFumJ16Jw==';
    const data = {
        "uuid": uuid,
        "noteText": noteText,
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



export async function deletePatientNote(uuid:string){
    const url = `https://hosptial-at-home-js-api.azurewebsites.net/api/deleteNotes?code=tLH0N13GToqXTfncOpeIYksjcWAF96ZKBrOv4nqnVh_MAzFut7YvIg==&uuid=${uuid}`;
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




export async function addPatientNote(noteType:string, noteText:string, patientId:number) {
    const url = 'https://hosptial-at-home-js-api.azurewebsites.net/api/addNote?code=Tcoa0nAhmkBbYFPcWHxVxdBlrjX-Qvuui6n29thSojiRAzFukM75Zw==';
    const data = {
        "noteType": noteType,
        "noteText": noteText,
        "patientId": patientId
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
        }).catch((err) => {
            console.log(err);
            resolve("BIG ERROR")
        })

    });
}

