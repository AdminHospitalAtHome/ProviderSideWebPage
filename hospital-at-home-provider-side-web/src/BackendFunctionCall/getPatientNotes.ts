import { PatientNote } from "../Components/Vital/PatientVitalInterface";

export async function getPatientNotes(patientID: number | null): Promise<PatientNote | null> {
    const baseUrl = "https://hosptial-at-home-js-api.azurewebsites.net/api/getPatientNote?code=Q2TpG8CH4KtvsmAP3Lox_OyGPuOYUfMLlhupxWWSo5L2AzFu1aCjIA=="
    const url = `${baseUrl}&patientID=${patientID}`;
    console.log(url);
    
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((json: PatientNote) => json)
      .catch(error => {
        console.error(error);
        return null;
      });
  }
  
  export async function updatePatientNotes(
    Subjective: string,
    Objective: string,
    Assessment: string,
    Plan: string,
    PatientId: number | null
  ): Promise<any> {
    const url = "https://hosptial-at-home-js-api.azurewebsites.net/api/updatePatientNotes?code=_1u4ZyfA1ysbsvlruWoEzjflfKIptrgkni0vn-KO92tDAzFuyZOloA==";

    const data = {
      "subjective": Subjective,
      "objective": Objective,
      "assessment": Assessment,
      "plan": Plan,
      "patientId": PatientId,
    };

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        return await response.json();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during fetch operation:', error);
      throw error;
    }
  }

