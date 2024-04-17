import Table from 'react-bootstrap/Table'
import {FormLabel} from "react-bootstrap";

export default function CurrentMedications({currentMedication}:{currentMedication: any[]}): React.JSX.Element{
	return(
		<div>
			<div className={'label-container'}>
				<FormLabel style={{fontSize: 25}}>Current Medication Record</FormLabel>
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
						<th>Special Notes</th>
					</tr>
					</thead>
					<tbody>
					{
						currentMedication.map(med =>(
							<tr>
								<td>{med.medicationName}</td>
								<td>{med.type}</td>
								<td>{med.amount} {med.unit}</td>
								<td>{med.frequency} times/day</td>
								<td>{med.startDate}</td>
								<td>Take before meal</td>
							</tr>
						))
					}
					</tbody>
				</Table>
			</div>
			
		</div>
		
	);
}
