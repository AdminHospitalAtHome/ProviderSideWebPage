import {useEffect, useState} from 'react';
import {getAllPatients} from '../../BackendFunctionCall/getPatientList';
import './AllPatientSideBar.css';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {getAlertLevel} from "../../BackendFunctionCall/getAlertLevel";
import StatusButton from "../Button/StatusButton";
import {BaselineVitalInterface, Patient, PatientNote, VitalDataInterface} from './PatientVitalInterface';
import PatientCard from "./PatientCard";
import PatientNotes from './PatientNotes';
import { getPatientNotes, updatePatientNotes } from '../../BackendFunctionCall/getPatientNotes';

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
  
  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [patientNote, setPatientNote] = useState<PatientNote | null>(null);
    const openModal = async () => {
      setNoteModalOpen(true)
        await getPatientNotes(expandedId).then((data) => {
        setPatientNote(data);
      })
    };
    const closeModal = (formData: PatientNote) => {
      setNoteModalOpen(false);
    };

    const onNotesUpdated = async () => {
      if (expandedId) {
        const updatedNotes = await getPatientNotes(expandedId);
        setPatientNote(updatedNotes);
      }
    };




  return (
    <div className="vital-container">
      {patients.map((patient) => {
        return (<PatientCard baseLineVitals={baseLineVitals}
                             expandedId={expandedId}
                             patient={patient}
                             setExpandedId={setExpandedId}
                             toggleExpanded={toggleExpanded}
                             vitalData={vitalData}
                             openNoteModal={openModal}
                             />
                            
                             
                             )
      })}
        {isNoteModalOpen && (
          <PatientNotes onNotesUpdated = {onNotesUpdated} patientId= {expandedId} data = {patientNote} closeModal={closeModal}/>
        )}
    </div>

  );
}
