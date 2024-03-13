import Form from 'react-bootstrap/Form';
import React, {useEffect, useState} from "react";
import {getPatientMedication} from '../../BackendFunctionCall/MedicationFunctions'
// @ts-ignore
import addIcon from "../../icons/add.png";
// @ts-ignore
import cancel from "../../icons/cancel.png";
// @ts-ignore
import save from "../../icons/save.png";
// @ts-ignore
import editIcon from "../../icons/edit.png";
// @ts-ignore
import deleteIcon from "../../icons/delete.png";
import AddMedicationModal from "./AddMedicationModal";

export default function Medication({patientId}: { patientId: number }): React.JSX.Element {
	
	const [allMedication, setAllMedication] = useState<any[]>([]);
	const [displayMedication, setDisplayMedication] = useState<any[]>([]);
	const [showModal, setShowModal] = useState<boolean>(false);
	
	useEffect(() => {
		getPatientMedication(patientId).then((res) => {
			setAllMedication(res);
		})
	}, [patientId]);
	
	function medicationTypeFilterOnChange(type: string): void {
		let temp_medication_list: any[] = []
		if (type === 'All') {
			setDisplayMedication(allMedication);
		} else {
			for (let medication of allMedication) {
				if (medication.type === type) {
					temp_medication_list.push(medication)
				}
			}
			setDisplayMedication(temp_medication_list);
		}
	}
	
	return (
		<div>
			<div style={{display: 'flex', flexDirection: 'row'}}>
				<Form.Select onChange={(e) => medicationTypeFilterOnChange(e.target.value)}>
					<option>All</option>
					<option>Heart</option>
					<option>Blood Pressure</option>
				</Form.Select>
				<button className="icon-button" onClick={()=>setShowModal(true)}><img src={addIcon}
				                                     alt={"Add"}
				                                     style={{
					                                     width: '20px',
					                                     height: '20px'
				                                     }}/>
				</button>
				<AddMedicationModal show={showModal} setShow={setShowModal}/>
			</div>
			
			<ul>
				{allMedication.map((medication) => (
					<li>
						<div>
							<label style={{fontWeight: 'bold'}}>{medication.medicationName}</label>
							<div>amount: {medication.amount} {medication.unit}
							
							</div>
							<div>
								<button className="icon-button">
									<img
										src={editIcon}
										alt={"Edit"}
										style={{
											width: '20px',
											height: '20px'
										}}/></button>
								<button className="icon-button"
								>
									<img
										src={deleteIcon} alt={"Delete"}
										style={{width: '20px', height: '20px'}}/></button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	
	);
}
