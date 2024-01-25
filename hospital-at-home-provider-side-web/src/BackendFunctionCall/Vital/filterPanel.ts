import React, {SetStateAction} from "react";
import {Patient} from "../../Components/Vital/PatientVitalInterface";

export function handleFilterChange(name: string, value: string, setFilters: React.Dispatch<SetStateAction<{ providerID: string, firstName: string, lastName: string, gender: string }>>) {
  setFilters(prevFilters => ({
    ...prevFilters,
    [name]: value
  }));
}

export function applyFilters(filters: { providerID: string, firstName: string, lastName: string, gender: string },
                             setPatients: React.Dispatch<SetStateAction<Patient[]>>) {
  // Convert the filters object into a query string, appending 'null' for null, undefined, or empty string values
  const filterParams = Object.entries(filters)
    .map(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        return `${encodeURIComponent(key)}=null`;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');


  filterPatients(filterParams)
    .then((patientData: any) => {
      const patients: Patient[] = patientData as Patient[];
      setPatients(patients);
    })
    .catch(error => {
      console.error('Error fetching patients:', error);
    });
};

export function filterPatients(queryString:string) {
  const url = `https://hosptial-at-home-js-api.azurewebsites.net/api/filterPatient2?code=HxYJ_tPohRTKCOZKfinm9f49rfEUxjvT5HfafRtVnRKKAzFujz7zkg==&${queryString}`;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        reject(error);
      });
  });
}
