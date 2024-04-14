import React from "react";
import Table from "react-bootstrap/Table";
import {FormLabel} from "react-bootstrap";
import './MedicationDetail.css'

export default function MedicationHistory(): React.JSX.Element {
	return (
		<div>
			<div className={'label-container'}>
				<FormLabel style={{ fontSize: 25}}>Medication History</FormLabel>
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
					</tr>
					<tr>
						<td>medC</td>
						<td>Blood Pressure</td>
						<td>50 mg</td>
						<td>1 time/day</td>
						<td>2023/05/15</td>
						<td>2023/05/30</td>
					</tr>
					</tbody>
				</Table>
			</div>
			
		</div>
	
	);
}
