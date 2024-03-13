import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import SelectSearch from "react-select-search";
import {useEffect, useState} from "react";
import {getMedication} from "../../BackendFunctionCall/MedicationFunctions";

export default function AddMedicationModal({show, setShow}: {
	show: boolean,
	setShow: React.Dispatch<React.SetStateAction<boolean>>
}): React.JSX.Element {
	const [allMedication, setAllMedication] = useState<any[]>([]);
	const [displayMedication, setDisplayMedication] = useState<any[]>([])
	
	const handleClose = () => setShow(false);
	
	
	return (<Modal show={show} onHide={handleClose}>
		<Modal.Header>
			<Modal.Title>Add Medication</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<div>
				<Form.Label>Medication Type</Form.Label>
				<div>
					<Form.Select>
						<option>All</option>
						<option>Heart</option>
						<option>Blood Pressure</option>
					</Form.Select>
				</div>
			</div>
			<div>
				<Form.Label>Medication</Form.Label>
				{/*<SelectSearch options={}/>*/}
			</div>
			<div>
				<Form.Label>Amount</Form.Label>
				<Form.Control/>
			</div>
			<div>
				<Form.Label>Unit</Form.Label>
				<Form.Select>
					<option>mL</option>
					<option>mg</option>
					<option>pill</option>
				</Form.Select>
			</div>
		
		</Modal.Body>
		<Modal.Footer>
			<Button onClick={handleClose}>Cancel</Button>
			<Button onClick={handleClose}>Save</Button>
		</Modal.Footer>
	</Modal>);
}
