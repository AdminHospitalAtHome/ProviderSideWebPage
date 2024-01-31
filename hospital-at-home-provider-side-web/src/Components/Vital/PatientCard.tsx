import StatusButton from "../Button/StatusButton";
import {getAlertLevel} from "../../BackendFunctionCall/getAlertLevel";
import React, {SetStateAction, useEffect, useState} from "react";
import {calculateAge, getColor, toggle} from "../../BackendFunctionCall/Vital/patientCard";
import './PatientCard.css';
import {VitalDataInterface, BaselineVitalInterface, Patient} from "./PatientVitalInterface";
import Button from "react-bootstrap/esm/Button";
import PatientNotes from "./PatientNotes";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import StatusButtonPopover from "../Button/StatusButtonPopover";
import Note from "./Notes";
import Popover from "react-bootstrap/Popover";

export default function PatientCard({
	                                    patient,
	                                    toggleExpanded,
	                                    setExpandedId,
	                                    expandedId,
	                                    vitalData,
	                                    baseLineVitals,
	                                    openNoteModal
                                    }: {
	patient: Patient,
	toggleExpanded: (id: number) => void,
	setExpandedId: React.Dispatch<SetStateAction<number | null>>,
	expandedId: number | null,
	vitalData: VitalDataInterface,
	baseLineVitals: BaselineVitalInterface,
	openNoteModal: any
}) {

	const [alertLevel, setAlertLevel] = useState<number[]>([-2, -2, -2, -2])
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
				{/*<Button variant="light" onClick={() => {*/}
				{/*	openNoteModal()*/}
				{/*}} className="patient-card-notes-button">*/}
				{/*	Notes*/}
				{/*</Button>*/}
				<p className="patient-card-detailText">Gender: {patient.Gender}</p>
				<p className="patient-card-detailText">Age: {calculateAge(patient.DateOfBirth)}</p>
				<div className="patient-card-separator"/>
				<p className="patient-card-detailText">
					Weight: {vitalData.weight}
					<StatusButton color={getColor(alertLevel[0])}/>
				</p>
				<p className="patient-card-detailText">
					Heart Rate: {vitalData.heartRate}
					<StatusButton color={getColor(alertLevel[1])}/>
				</p>
				<p className="patient-card-detailText">
					Blood Oxygen: {vitalData.bloodOxygen}
					<StatusButton color={getColor(alertLevel[2])}/>
				</p>
				<p className="patient-card-detailText">
					Blood Pressure: {vitalData.bloodPressure}
					{/*<OverlayTrigger trigger="hover" placement="right" overlay={StatusButtonPopover}>*/}
					{/*	<div>*/}
						<StatusButton color={getColor(alertLevel[3])}/>
					{/*	</div>*/}
					{/*</OverlayTrigger>*/}
				</p>
				<div className="patient-card-separator"/>
				{
					expandedId === patient.PatientID && <Note patientId = {patient.PatientID}/>
				}
			</div>

		</div>
	)
}
