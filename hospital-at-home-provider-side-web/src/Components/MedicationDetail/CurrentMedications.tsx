import Table from 'react-bootstrap/Table'
import {FormLabel} from "react-bootstrap";

export default function CurrentMedications(): React.JSX.Element{
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
					<tr>
						<td>medA</td>
						<td>Heart</td>
						<td>30 mg</td>
						<td>3 times/day</td>
						<td>2024/03/19</td>
						<td>Take before meal</td>
					</tr>
					</tbody>
				</Table>
			</div>
			
		</div>
		
	);
}
