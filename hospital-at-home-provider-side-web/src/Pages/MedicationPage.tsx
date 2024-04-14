import PatientInfo from "../Components/MedicationDetail/PatientInfo";
import CurrentMedications from "../Components/MedicationDetail/CurrentMedications";
import MedicationHistory from "../Components/MedicationDetail/MedicationHistory";

export default function MedicationPage():React.JSX.Element{
	return(
		<div style={{paddingTop: '56px', height:'100%'}}>
			<PatientInfo/>

			<CurrentMedications/>

			<MedicationHistory/>
		</div>
	)
}
