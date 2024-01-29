import StatusButton from "../Button/StatusButton";
import {getAlertLevel} from "../../BackendFunctionCall/getAlertLevel";
import React, {SetStateAction, useState} from "react";
import {calculateAge, toggle} from "../../BackendFunctionCall/Vital/patientCard";
import './PatientCard.css';
import {VitalDataInterface, BaselineVitalInterface, Patient} from "./PatientVitalInterface";
import Button from "react-bootstrap/esm/Button";
import PatientNotes from "./PatientNotes";

export default function PatientCard({patient, toggleExpanded, setExpandedId, expandedId, vitalData, baseLineVitals, openNoteModal}: {
  patient: Patient,
  toggleExpanded: (id: number) => void,
  setExpandedId: React.Dispatch<SetStateAction<number | null>>,
  expandedId: number | null,
  vitalData: VitalDataInterface,
  baseLineVitals: BaselineVitalInterface,
  openNoteModal: any
}) {

  const range = {
    bloodPressure: 5,
    heartRate: 5,
    weight: 5,
    bloodOxygen: 5
  }

  return (
    <div key={patient.PatientID} className="patient-card-container">
      <button className={`patient-card-title ${expandedId === patient.PatientID ? 'expanded' : ''}`} onClick={() => toggle(patient.PatientID, toggleExpanded, setExpandedId)}>
        <div className="patient-card-avatar">{`${patient.FirstName[0]}${patient.LastName[0]}`}</div>
        <span className="patient-card-name">{patient.FirstName} {patient.LastName}</span>
      </button>
      <div className={`patient-card-details ${expandedId === patient.PatientID ? 'expanded' : ''}`}>
      <Button variant="light" onClick={() => {openNoteModal()}} className="patient-card-notes-button">
        Notes
    </Button>
        <p className="patient-card-detailText">Gender: {patient.Gender}</p>
        <p className="patient-card-detailText">Age: {calculateAge(patient.DateOfBirth)}</p>
        <div className="patient-card-separator"/>
        <p className="patient-card-detailText">
          Weight: {vitalData.weight}
          <StatusButton color={getAlertLevel({
            weight: {
              baseLineVital: baseLineVitals.weight,
              recentVitalData: vitalData.weight,
              range: range.weight
            },

          })}/>
        </p>
        <p className="patient-card-detailText">
          Heart Rate: {vitalData.heartRate}
          <StatusButton color={getAlertLevel({
            heartRate: {
              baseLineVital: baseLineVitals.heartRate,
              recentVitalData: vitalData.heartRate,
              range: range.heartRate
            },

          })}/>
        </p>
        <p className="patient-card-detailText">
          Blood Oxygen: {vitalData.bloodOxygen}
          <StatusButton color={getAlertLevel({
            bloodOxygen: {
              baseLineVital: baseLineVitals.bloodOxygen,
              recentVitalData: vitalData.bloodOxygen,
              range: range.bloodOxygen
            },

          })}/>
        </p>
        <p className="patient-card-detailText">
          Blood Pressure: {vitalData.bloodPressure}
          <StatusButton color={getAlertLevel({
            Systolic: {
              baseLineVital: baseLineVitals.systolicBloodPressure,
              recentVitalData: vitalData.bloodPressure == null ? null : vitalData.bloodPressure.split('/')[0],
              range: range.bloodOxygen
            },

            Diastolic: {
              baseLineVital: baseLineVitals.diastolicBloodPressure,
              recentVitalData: vitalData.bloodPressure == null ? null : vitalData.bloodPressure.split('/')[0],
              range: range.bloodOxygen
            },

          })}/>
        </p>
      </div>
    </div>
  )
}
