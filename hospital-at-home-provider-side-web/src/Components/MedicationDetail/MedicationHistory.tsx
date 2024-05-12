import React, {useState} from "react";
import Table from "react-bootstrap/Table";
import {Form, FormLabel, ModalBody} from "react-bootstrap";
import './MedicationDetail.css'
// @ts-ignore
import editIcon from "../../icons/edit.png";
// @ts-ignore
import deleteIcon from "../../icons/delete.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ModalContext from "react-bootstrap/ModalContext";
import {PatientMedication} from "../../data";
// @ts-ignore
import cancelIcon from "../../icons/cancel.png";
// @ts-ignore
import saveIcon from "../../icons/save.png";
import {deletePatientMedication, updatePatientMedication} from "../../BackendFunctionCall/MedicationFunctions";


export default function MedicationHistory({medicationHistory, setMedicationHistory}: {
	medicationHistory: PatientMedication[],
	setMedicationHistory: React.Dispatch<React.SetStateAction<PatientMedication[] | undefined>>
}): React.JSX.Element {
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
	const [editingMedicationId, setEditingMedicationId] = useState<number>()
	const [editAmount, setEditAmount] = useState<number>(0);
	const [editFrequency, setEditFrequency] = useState<number>(0);
	const [deletingMedicationId, setDeletingMedicationId] = useState<number>(0);
	
	async function editOnSave(): Promise<void> {
		if (editingMedicationId) {
			await updatePatientMedication(editingMedicationId, editAmount, editFrequency, undefined);
			let temp_med_history = medicationHistory;
			temp_med_history.map(med => {
				if (med.id === editingMedicationId) {
					med.frequency = editFrequency;
					med.amount = editAmount;
				}
			})
			setMedicationHistory(temp_med_history)
		}
		setEditingMedicationId(0);
	}
	
	async function deleteOnConfirm(): Promise<void> {
		// await deletePatientMedication(deletingMedicationId);
		const temp_med: PatientMedication[] = medicationHistory;
		setMedicationHistory(temp_med.filter(med => med.id !== deletingMedicationId));
		setDeletingMedicationId(0);
		setShowDeleteModal(false);
	}
	
	const deleteMedicationHistoryModal: React.JSX.Element = <Modal show={showDeleteModal}
	                                                               onHide={() => setShowDeleteModal(false)}>
		<Modal.Header style={{backgroundColor: '#FBDEA6'}}>
			<Modal.Title>Caution</Modal.Title>
		</Modal.Header>
		<ModalBody>
			You are attempting to permanently delete the medication history from the database. Please note that this operation
			is irreversible.
		</ModalBody>
		<Modal.Footer style={{backgroundColor: '#FFF8DC'}}>
			<Button style={{backgroundColor: 'grey', borderColor: 'grey'}}
			        onClick={() => setShowDeleteModal(false)}>Cancel</Button>
			<Button onClick={deleteOnConfirm}>Confirm and Remove</Button>
		</Modal.Footer>
	</Modal>
	
	return (
		<div>
			{deleteMedicationHistoryModal}
			<div className={'label-container'}>
				<FormLabel style={{fontSize: 25}}>Medication History</FormLabel>
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
						<th>End Prescription Date</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
					{
						medicationHistory.map(med => (
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
								<td>{med.endDate}</td>
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
										<button className="icon-button" onClick={() => {
											setShowDeleteModal(true);
											setDeletingMedicationId(med.id)
										}}>
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
