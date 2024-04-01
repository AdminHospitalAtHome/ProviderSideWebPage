import StatusButton from "../Button/StatusButton";
import {getAlertLevel} from "../../BackendFunctionCall/getAlertLevel";
import React, {SetStateAction, useEffect, useState} from "react";
import {calculateAge, getColor, toggle} from "../../BackendFunctionCall/Vital/patientCard";
import './PatientCard.css';
import {Patient} from "./PatientVitalInterface";
import NotePad from "../Notes/NotePad";
import {
	getRecentBloodOxygen,
	getRecentBloodPressure,
	getRecentHeartRate, getRecentSpirometry,
	getRecentWeight
} from "../../BackendFunctionCall/getVitalData";
import ManualTriggerModal from "./ManualTriggerModal";
import Medication from "../Medication/Medication";

export default function PatientCard({
	                                    patient,
	                                    toggleExpanded,
	                                    setExpandedId,
	                                    expandedId,
                                    }: {
	patient: Patient,
	toggleExpanded: (id: number) => void,
	setExpandedId: React.Dispatch<SetStateAction<number | null>>,
	expandedId: number | null,
}) {

	const [recentBloodPressure, setRecentBloodPressure] = useState("Loading...")
	const [recentWeight, setRecentWeight] = useState("Loading...")
	const [recentBloodOxygen, setRecentBloodOxygen] = useState("Loading...")
	const [recentHeartRate, setRecentHeartRate] = useState("Loading...")
	const [recentSpirometry, setRecentSpirometry] = useState("Loading...")
	const [alertLevel, setAlertLevel] = useState<number[]>([-2, -2, -2, -2, -2])
	/* Alert Level Key:
		-2: Loading
		-1: No Data (Gray)
		 0: All Good (Green)
		 1: Concern (Yellow)
		 2: Alert (Red)
	*/


	useEffect(() => {
		if (expandedId && expandedId === patient.PatientID) {
			getAlertLevel(expandedId).then(setAlertLevel)
			getRecentBloodPressure(patient.PatientID).then(setRecentBloodPressure)
			getRecentWeight(patient.PatientID).then(setRecentWeight)
			getRecentBloodOxygen(patient.PatientID).then(setRecentBloodOxygen)
			getRecentHeartRate(patient.PatientID).then(setRecentHeartRate)
			getRecentSpirometry(patient.PatientID).then(setRecentSpirometry)

		}
	}, [expandedId]);


	return (
		<div key={patient.PatientID} className="patient-card-container">
			<button className={`patient-card-title ${expandedId === patient.PatientID ? 'expanded' : ''}`}
			        onClick={() => toggle(patient.PatientID, toggleExpanded, setExpandedId)}>
				<div className="patient-card-avatar">{`${patient.FirstName[0]}${patient.LastName[0]}`}</div>
				<span className="patient-card-name">{patient.FirstName} {patient.LastName}</span>
			</button>
			<div className={`patient-card-details ${expandedId === patient.PatientID ? 'expanded' : ''}`}>
				<p className="patient-card-detailText">Gender: {patient.Gender}</p>
				<p className="patient-card-detailText">Age: {calculateAge(patient.DateOfBirth)}</p>
				<div className="patient-card-separator"/>
				<ManualTriggerModal patientID={patient.PatientID}/>
				<p className="patient-card-detailText">
					Weight: {recentWeight}
					<StatusButton color={getColor(alertLevel[0])}/>
				</p>
				<p className="patient-card-detailText">
					Heart Rate: {recentHeartRate}
					<StatusButton color={getColor(alertLevel[1])}/>
				</p>
				<p className="patient-card-detailText">
					Blood Oxygen: {recentBloodOxygen}
					<StatusButton color={getColor(alertLevel[2])}/>
				</p>
				<p className="patient-card-detailText">
					Blood Pressure: {recentBloodPressure}
					<StatusButton color={getColor(alertLevel[3])}/>
				</p>
				<p className="patient-card-detailText">
					Spirometry (FEV1): {recentSpirometry}
					<StatusButton color={getColor(alertLevel[4])}/>
				</p>
				<div className="patient-card-separator"/>
				{
					expandedId === patient.PatientID && <NotePad patientId={patient.PatientID}/>
				}
				<div className={'patient-card-separator'}></div>
				{expandedId === patient.PatientID && <Medication patientId={patient.PatientID}/>}

			</div>

		</div>
	)
}
