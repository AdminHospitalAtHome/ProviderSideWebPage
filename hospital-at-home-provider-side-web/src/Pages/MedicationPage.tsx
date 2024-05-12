import PatientInfo from "../Components/MedicationDetail/PatientInfo";
import CurrentMedications from "../Components/MedicationDetail/CurrentMedications";
import MedicationHistory from "../Components/MedicationDetail/MedicationHistory";
import {FormControl} from "react-bootstrap";
import SelectSearch from "react-select-search";
import {useEffect, useState} from "react";
import {getPatients} from "../BackendFunctionCall/Message";
import {getPatientMedication} from "../BackendFunctionCall/MedicationFunctions";
import {getPatientInfo} from "../BackendFunctionCall/PatientInfo";
import {PatientMedication} from "../data";

export default function MedicationPage(): React.JSX.Element {
	const [selectedPatientId, setSelectedPatientId] = useState<any>();
	const [patientIdOption, setPatientIdOption] = useState<any[]>();
	const [patientInfo, setPatientInfo] = useState<any[]>();
	const [patientMedication, setPatientMedication] = useState<PatientMedication[]>();
	const [patientCurrentMedication,setPatientCurrentMedication] = useState<PatientMedication[]>();
	const [patientMedicationHistory, setPatientMedicationHistory] = useState<PatientMedication[]>();
	useEffect(() => {
		getPatients().then(res => {
			let temp_patient: any[] = []
			res.map((patient: { name: string, value: number }) => {
				temp_patient.push({key: patient.value, value: patient.value, name: patient.name})
			})
			setPatientIdOption(temp_patient);
		})
	}, []);
	
	//update patient Info & patient medication when the selection happens
	useEffect(() => {
		if(selectedPatientId){
			getPatientInfo(selectedPatientId).then(res=>{
				setPatientInfo(res);
			})
			getPatientMedication(selectedPatientId).then(res => {
				const currentMedication = res.filter((med:any) => !med.endDate);
				setPatientCurrentMedication(currentMedication);
				const medicationHistory = res.filter(((med:any) => med.endDate));
				setPatientMedicationHistory(medicationHistory);
			})
		}
	}, [selectedPatientId]);
	

	
	return (
		<div style={{paddingTop: '56px', height: '100%'}}>
			{
				patientIdOption && <SelectSearch onChange={setSelectedPatientId} options={patientIdOption} search={true}
				                                 placeholder={'Please search with patient name'}></SelectSearch>
			}
			{patientInfo && <PatientInfo patientInfo = {patientInfo}/>}
			{(patientCurrentMedication) && <CurrentMedications currentMedication={patientCurrentMedication} setCurrentMedication={setPatientCurrentMedication} setMedicationHistory={setPatientMedicationHistory}/>}
			{(patientMedicationHistory) && <MedicationHistory medicationHistory={patientMedicationHistory} setMedicationHistory={setPatientMedicationHistory}/>}
		</div>
	)
}
