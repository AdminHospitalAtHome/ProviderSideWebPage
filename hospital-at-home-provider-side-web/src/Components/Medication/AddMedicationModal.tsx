import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import SelectSearch from "react-select-search";
import {useEffect, useState} from "react";
import {addPatientMedication, getMedication} from "../../BackendFunctionCall/MedicationFunctions";

export default function AddMedicationModal({show, setShow, patientId, patientMedication, patientMedicationSetter}: {
	show: boolean,
	setShow: React.Dispatch<React.SetStateAction<boolean>>,
	patientId: number,
	patientMedication: any[],
	patientMedicationSetter: React.Dispatch<React.SetStateAction<any>>
}): React.JSX.Element {
	const [allMedication, setAllMedication] = useState<any[]>([]);
	const [displayMedication, setDisplayMedication] = useState<any[]>([])
	const [selectedMedication, setSelectedMedication] = useState<any>(null);
	const [amount, setAmount] = useState<string>('');
	const [unit, setUnit] = useState<string>('mL');
	const [frequency, setFrequency] = useState<number>(0);
	
	const handleClose = () => setShow(false);
	const handleSave = () => {
		const type = displayMedication.find(medication => medication.name === selectedMedication).type;
		addPatientMedication(patientId, selectedMedication, amount, unit, type, frequency).then(res => {
			let newMedication = [res, ...patientMedication];
			patientMedicationSetter(newMedication);
		})
		handleClose();
	}
	const applyMedicationFilter = (e: any) => {
		if (e.target.value === 'all') {
			setDisplayMedication(allMedication);
		} else {
			let temp_displayMedication = allMedication.filter(medication => medication.type === e.target.value);
			setDisplayMedication(temp_displayMedication);
		}
		
	}
	
	useEffect(() => {
		let temp_medication: any[] = []
		getMedication().then(res => {
			res.map((medication: { name: string; type: string; }) => {
				temp_medication.push({
					key: medication.name,
					value: medication.name,
					name: medication.name,
					type: medication.type
				})
			})
			setAllMedication(temp_medication);
			setDisplayMedication(temp_medication);
		});
		
	}, []);
	
	
	return (<Modal show={show} onHide={handleClose}>
		<Modal.Header style={{backgroundColor: '#FBDEA6'}}>
			<Modal.Title>Add Medication</Modal.Title>
		</Modal.Header>
		<Modal.Body style={{backgroundColor: '#FFF8DC'}}>
			<div>
				<Form.Label>Medication Type</Form.Label>
				<div>
					<Form.Select onChange={e => applyMedicationFilter(e)}>
						<option>all</option>
						<option>heart</option>
						<option>blood pressure</option>
					</Form.Select>
				</div>
			</div>
			<div>
				<Form.Label>Medication</Form.Label>
				<SelectSearch onChange={setSelectedMedication} options={displayMedication} search={true}
				              placeholder={"Search Medication"}/>
			</div>
			<div>
				<Form.Label>Amount</Form.Label>
				<Form.Control onChange={e => setAmount(e.target.value)}/>
			</div>
			<div>
				<Form.Label>Unit</Form.Label>
				<Form.Select onChange={(e) => setUnit(e.target.value)}>
					<option>mg</option>
					<option>mL</option>
					<option>pill</option>
				</Form.Select>
			</div>
			<div>
				<Form.Label>Frequency(times/day)</Form.Label>
				<Form.Control type={"number"}
				              onChange={(e) => setFrequency((parseInt(e.target.value)))}/>
			</div>
		
		</Modal.Body>
		<Modal.Footer style={{backgroundColor: '#FFF8DC'}}>
			<Button style={{backgroundColor: 'grey', borderColor: 'grey'}} onClick={handleClose}>Cancel</Button>
			<Button onClick={handleSave}>Save</Button>
		</Modal.Footer>
	</Modal>);
}
