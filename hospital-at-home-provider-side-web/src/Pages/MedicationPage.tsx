import PatientInfo from "../Components/MedicationDetail/PatientInfo";
import CurrentMedications from "../Components/MedicationDetail/CurrentMedications";
import MedicationHistory from "../Components/MedicationDetail/MedicationHistory";
import {FormControl} from "react-bootstrap";
import SelectSearch from "react-select-search";
import {useEffect, useState} from "react";
import {getPatients} from "../BackendFunctionCall/Message";
import {getPatientMedication} from "../BackendFunctionCall/MedicationFunctions";

export default function MedicationPage(): React.JSX.Element {
	const [selectedPatientId, setSelectedPatientId] = useState<any>();
	const [patientIdOption, setPatientIdOption] = useState<any[]>();
	const [patientMedication, setPatientMedication] = useState<any[]>();
	useEffect(() => {
		getPatients().then(res => {
			let temp_patient: any[] = []
			res.map((patient: { name: string, value: number }) => {
				temp_patient.push({key: patient.value, value: patient.value, name: patient.name})
			})
			setPatientIdOption(temp_patient);
		})
	}, []);
	
	useEffect(() => {
		if(selectedPatientId){
			getPatientMedication(selectedPatientId).then(res => {
				console.log(res);
			})
		}
	}, [selectedPatientId]);
	
	return (
		<div style={{paddingTop: '56px', height: '100%'}}>
			{
				patientIdOption && <SelectSearch onChange={setSelectedPatientId} options={patientIdOption} search={true}
				                                 placeholder={'Please search with patient name'}></SelectSearch>
			}<PatientInfo/>
			<CurrentMedications/>
			<MedicationHistory/>
		</div>
	)
}
