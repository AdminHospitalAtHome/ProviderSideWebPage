import { useEffect, useState } from 'react';
import { getAllPatients } from '../../BackendFunctionCall/getPatientList';
import './AllPatientSideBar.css';
import React from 'react';
import {getAlertLevel} from "../../BackendFunctionCall/getAlertLevel";
import StatusButton from "../Button/StatusButton";
import { getBaseLineVitals } from '../../BackendFunctionCall/getBaseLineVital';
import { BaselineVitalInterface, VitalDataInterface } from './PatientVitalInterface';

interface Patient {
  PatientID: number;
  FirstName: string;
  LastName: string;
  Gender: string;
  DateOfBirth: string;
}

const styles = {
    detailText: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
};

export default function AllPatientSideBar({ patients,toggleExpanded, vitalData}: { patients: Patient[], toggleExpanded: (id: number) => void, vitalData:any}) {

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const[baseLineVitals, setBaseLineVitals] = useState<BaselineVitalInterface>({
    bloodOxygen: null,
		heartRate: null,
    weight: null,
		diastolicBloodPressure: null,
		systolicBloodPressure: null
  })

  const [alertLevel, setAlertLevel] = useState<VitalDataInterface>({
    bloodOxygen: null,
		heartRate: null,
		bloodPressure: null,
		weight: null
  })
    
  const range = {
    bloodPressure:5,
    heartRate:5,
    weight:5,
    bloodOxygen:5
  }

  const toggle = (id: number)=>{
    toggleExpanded(id);
    setExpandedId(prevExpandedId => (prevExpandedId === id ? null : id));
  }

  useEffect(() => {
    getBaseLineVitals(expandedId)
    .then(data => {
       console.log(data)
        const vitals = {
            bloodOxygen: data[0].BloodOxygenLevelInPercentage,
            heartRate: data[0].heartRateInBPM,
            weight: data[0].WeightInPounds,
            diastolicBloodPressure: data[0].DiastolicBloodPressureInMmHg,
            systolicBloodPressure: data[0].SystolicBloodPressureInMmHg
        };
        setBaseLineVitals(vitals);
        // console.log(expandedId);
        // console.log(baseLineVitals)
    })
    .catch(error => {
        console.error('Error fetching base line vitals:', error);
    });
  },[expandedId])


function calculateAge(birthdateStr:string) {
    const birthdate = new Date(birthdateStr);
    const today = new Date();
  
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <div className="container">
      {patients.map((patient) => (
        <div key={patient.PatientID}>
          <button className="tile" onClick={() => toggle(patient.PatientID)}>
            <div className="avatar">{`${patient.FirstName[0]}${patient.LastName[0]}`}</div>
            <span className="name">{patient.FirstName} {patient.LastName}</span>
          </button>
            <div className={`details ${expandedId === patient.PatientID ? 'expanded' : ''}`}>
                <p className="detailText">Gender: {patient.Gender}</p>
                <p className="detailText">Age: {calculateAge(patient.DateOfBirth)}</p>
                <div className="separator"/>
                <p className="detailText" style={styles.detailText}>
                    Weight: {vitalData.weight}
                    <StatusButton color={getAlertLevel({
                                                      weight: {
                                                          baseLineVital: baseLineVitals.weight, 
                                                          recentVitalData: vitalData.weight, 
                                                          range: range.weight
                                                      },
                                                    
                                                  })}/>
                </p>
                <p className="detailText" style={styles.detailText}>
                    Heart Rate: {vitalData.heartRate}
                    <StatusButton color={getAlertLevel({
                                                      heartRate: {
                                                          baseLineVital: baseLineVitals.heartRate, 
                                                          recentVitalData: vitalData.heartRate, 
                                                          range: range.heartRate
                                                      },
                                                    
                                                  })}/>
                </p>
                <p className="detailText" style={styles.detailText}>
                    Blood Oxygen: {vitalData.bloodOxygen}
                    <StatusButton color={getAlertLevel({
                                                      bloodOxygen: {
                                                          baseLineVital: baseLineVitals.bloodOxygen, 
                                                          recentVitalData: vitalData.bloodOxygen, 
                                                          range: range.bloodOxygen
                                                      },
                                                    
                                                  })}/>
                </p>
                <p className="detailText" style={styles.detailText}>
                    Blood Pressure: {vitalData.bloodPressure}
                    <StatusButton color={getAlertLevel({
                                                      Systolic: {
                                                          baseLineVital: baseLineVitals.systolicBloodPressure, 
                                                          recentVitalData: vitalData.bloodPressure == null ? null : vitalData.bloodPressure.split('/')[0], 
                                                          range: range.bloodOxygen
                                                      },

                                                      Diastolic:{
                                                        baseLineVital: baseLineVitals.diastolicBloodPressure, 
                                                        recentVitalData: vitalData.bloodPressure == null ? null : vitalData.bloodPressure.split('/')[0], 
                                                        range: range.bloodOxygen
                                                      },
                                                    
                                                  })}/>
                </p>
            </div>
        </div>
      ))}
    </div>
  );
}
