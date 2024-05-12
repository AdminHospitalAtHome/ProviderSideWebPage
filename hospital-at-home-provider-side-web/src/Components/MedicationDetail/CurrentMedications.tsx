import Table from 'react-bootstrap/Table'
import {Form, FormLabel} from "react-bootstrap";
import React, {useState} from "react";
import './MedicationDetail.css'
// @ts-ignore
import cancelIcon from "../../icons/cancel.png";
// @ts-ignore
import saveIcon from "../../icons/save.png";
// @ts-ignore
import editIcon from "../../icons/edit.png";
// @ts-ignore
import deleteIcon from "../../icons/delete.png";
import {updatePatientMedication} from "../../BackendFunctionCall/MedicationFunctions";
import {PatientMedication} from "../../data";

export default function CurrentMedications({currentMedication, setCurrentMedication, setMedicationHistory}: {
	currentMedication: PatientMedication[],
	setCurrentMedication: React.Dispatch<React.SetStateAction<PatientMedication[] | undefined>>,
	setMedicationHistory: React.Dispatch<React.SetStateAction<PatientMedication[] | undefined>>
}): React.JSX.Element {
	const [editingMedicationId, setEditingMedicationId] = useState<number>()
	const [editAmount, setEditAmount] = useState<number>(0);
	const [editFrequency, setEditFrequency] = useState<number>(0);
	
	async function editOnSave(): Promise<void> {
		if (editingMedicationId) {
			await updatePatientMedication(editingMedicationId, editAmount, editFrequency, undefined);
			let temp_current_med = currentMedication;
			temp_current_med.map(med => {
				if (med.id === editingMedicationId) {
					med.frequency = editFrequency;
					med.amount = editAmount;
				}
			})
			setCurrentMedication(temp_current_med);
		}
		setEditingMedicationId(0);
	}
	
	async function deleteOnClick(med: PatientMedication): Promise<void> {
		await updatePatientMedication(med.id, undefined, undefined, new Date().toISOString().slice(0, 10))
		setCurrentMedication(medication => medication?.filter(m => m.id !== med.id));
		med.endDate = new Date().toISOString().slice(0, 10);
		setMedicationHistory(medication => ([...medication || [], med]))
	}
	
	
	return (
		<div>
			<div className={'label-container'}>
				<FormLabel style={{fontSize: 25}}>Current Medication Record</FormLabel>
			</div>
			<div className={'table-container'}>
				<Table>
					<thead>
					<tr>
						<th>Medication</th>
						<th>Type</th>
						<th>Amount</th>
						<th>Frequency</th>
						<th>Prescription Date</th>
						<th>Special Notes</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
					{
						currentMedication.map(med => (
							<tr key={med.id}>
								<td>{med.medicationName}</td>
								<td>{med.type}</td>
								{editingMedicationId === med.id ?
									<td>
										<div style={{display: "flex"}}><Form.Control style={{padding: 0, maxWidth: 30}}
										                                             defaultValue={med.amount}
										                                             onChange={(e) => setEditAmount(parseInt(e.target.value))}
										/> {med.unit}</div>
									</td> :
									<td>{med.amount} {med.unit}</td>}
								{editingMedicationId === med.id ?
									<td>
										<div style={{display: "flex"}}><Form.Control style={{padding: 0, maxWidth: 30}}
										                                             defaultValue={med.frequency}
										                                             onChange={(e) => setEditFrequency(parseInt(e.target.value))}
										/> times/day
										</div>
									</td> :
									<td>{med.frequency} times/day</td>}
								<td>{med.startDate}</td>
								{editingMedicationId === med.id ?
									<td>
										<div style={{display: "flex"}}><Form.Control style={{padding: 0, maxWidth: 200}}
										                                             value={"Take before meal"}/></div>
									</td> :
									<td>Take before meal</td>}
								<td>
									{editingMedicationId === med.id ?
										<button className="icon-button">
											<img
												src={cancelIcon} alt={"Cancel"} onClick={() => setEditingMedicationId(undefined)}
												style={{width: '20px', height: '20px'}}/>
										</button> :
										<button className="icon-button">
											<img
												src={editIcon} alt={"Edit"} onClick={() => {
												setEditingMedicationId(med.id);
												setEditAmount(med.amount);
												setEditFrequency(med.frequency);
											}}
												style={{width: '20px', height: '20px'}}/>
										</button>
									}
									{editingMedicationId === med.id ?
										<button className="icon-button" onClick={editOnSave}>
											<img
												src={saveIcon} alt={"Save"}
												style={{width: '20px', height: '20px'}}/>
										</button> :
										<button className="icon-button" onClick={() => deleteOnClick(med)}>
											<img
												src={deleteIcon} alt={"Delete"}
												style={{width: '20px', height: '20px'}}/>
										</button>}
								</td>
							</tr>
						))
					}
					</tbody>
				</Table>
			</div>
		
		</div>
	
	);
}
