import React from "react";
import './MedicationDetail.css'

export default function PatientInfo(): React.JSX.Element {
	return (
		<div>
			<div>
				<div className={'label-container'}>
					<label style={{fontSize: 30}}>Patient Name </label>
				</div>
				<div className={'detail-container'}>
					<label style={{fontSize: 20}}>Age: 45 </label>
					<label style={{fontSize: 20}}>Gender: Female </label>
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
