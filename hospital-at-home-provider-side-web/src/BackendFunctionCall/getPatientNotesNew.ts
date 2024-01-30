export async function getPatientNotes(patientID: number): Promise<any> {
    const url: string = `https://hosptial-at-home-js-api.azurewebsites.net/api/getPatientNotesNew?patientID=${patientID}&code=ANuYmp9mSaeRs0Y8bo0eCBUEQxG6Z3gyD86ciqZYBEOPAzFu2VbWyg==`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; 
    }
}


export async function updatePatientNote(uuid:string, noteText:string) {
    const url = 'https://hosptial-at-home-js-api.azurewebsites.net/api/updateNotesNew?code=cZ88dzL_E4sp05-2Bk9L5YtlnKSdE5uWgaxKlaLHqWyxAzFumJ16Jw==';
    const data = {
        "uuid": uuid,
        "noteText": noteText,
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
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

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
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


