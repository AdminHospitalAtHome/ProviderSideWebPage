import {useEffect, useState} from 'react';
import {getAllPatients} from '../../BackendFunctionCall/getPatientList';
import './AllPatientSideBar.css';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {getAlertLevel} from "../../BackendFunctionCall/getAlertLevel";
import StatusButton from "../Button/StatusButton";
import {BaselineVitalInterface, Patient, PatientNote, VitalDataInterface} from './PatientVitalInterface';
import PatientCard from "./PatientCard";

export default function AllPatientSideBar({patients, toggleExpanded, vitalData}: { patients: Patient[], toggleExpanded: (id: number) => void, vitalData: any }) {
  // This is the patientID of the expanded Patient Card
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [baseLineVitals, setBaseLineVitals] = useState<BaselineVitalInterface>({
    bloodOxygen: null,
    heartRate: null,
    weight: null,
    diastolicBloodPressure: null,
    systolicBloodPressure: null
  })

  const navigate = useNavigate();



  return (
    <div className="vital-container">
      {patients.map((patient) => {
        return (<PatientCard baseLineVitals={baseLineVitals}
                             expandedId={expandedId}
                             patient={patient}
                             setExpandedId={setExpandedId}
                             toggleExpanded={toggleExpanded}
                             vitalData={vitalData}
                             />
                            
                             
                             )
      })}

    </div>

  );
}
