import React, {useState} from "react";
import Table from "react-bootstrap/Table";
import {FormLabel, ModalBody} from "react-bootstrap";
import './MedicationDetail.css'
// @ts-ignore
import editIcon from "../../icons/edit.png";
// @ts-ignore
import deleteIcon from "../../icons/delete.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ModalContext from "react-bootstrap/ModalContext";


export default function MedicationHistory({medicationHistory}: { medicationHistory: any[] }): React.JSX.Element {
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
	const deleteMedicationHistoryModal: React.JSX.Element = <Modal show={showDeleteModal}
	                                                               onHide={() => setShowDeleteModal(false)}>
		<Modal.Header style={{backgroundColor: '#FBDEA6'}}>
			<Modal.Title>Caution</Modal.Title>
		</Modal.Header>
		<ModalBody>
			You are attempting to permanently delete the medication history from the database. Please note that this operation is irreversible.
		</ModalBody>
		<Modal.Footer style={{backgroundColor: '#FFF8DC'}}>
			<Button style={{backgroundColor: 'grey', borderColor: 'grey'}}
			        onClick={() => setShowDeleteModal(false)}>Cancel</Button>
			<Button>Confirm and Remove</Button>
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
					<tr>
						<td>medB</td>
						<td>Heart</td>
						<td>30 mg</td>
						<td>3 times/day</td>
						<td>2023/05/11</td>
						<td>2023/05/30</td>
						<td>
							<button className="icon-button">
								<img
									src={editIcon} alt={"Edit"}
									style={{width: '20px', height: '20px'}}/>
							</button>
							<button className="icon-button" onClick={() => setShowDeleteModal(true)}>
								<img
									src={deleteIcon} alt={"Delete"}
									style={{width: '20px', height: '20px'}}/>
							</button>
						</td>
					</tr>
					<tr>
						<td>medC</td>
						<td>Blood Pressure</td>
						<td>50 mg</td>
						<td>1 time/day</td>
						<td>2023/05/15</td>
						<td>2023/05/30</td>
						<td>
							<button className="icon-button">
								<img
									src={editIcon} alt={"Edit"}
									style={{width: '20px', height: '20px'}}/>
							</button>
							<button className="icon-button">
								<img
									src={deleteIcon} alt={"Delete"}
									style={{width: '20px', height: '20px'}}/>
							</button>
						</td>
					</tr>
					</tbody>
				</Table>
			</div>
		
		</div>
	
	);
}
