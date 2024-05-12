import React from "react";
import './MedicationDetail.css'

export default function PatientInfo({patientInfo}: { patientInfo: any }): React.JSX.Element {
	return (
		<div>
			<div>
				<div className={'label-container'}>
					<label style={{fontSize: 30}}>{patientInfo.FirstName}{patientInfo.LastName}</label>
				</div>
				<div className={'detail-container'}>
					<label style={{fontSize: 20}}>Age: {patientInfo.Age}</label>
					<label style={{fontSize: 20}}>Gender: {patientInfo.Gender}</label>
					<label style={{fontSize: 20}}>Allergy:</label>
					<ul>
						<li>Nut</li>
						<li>Tylenol</li>
						<li>Lactose</li>
					</ul>
				</div>
			</div>
		</div>
	
	)
		;
	
}
