import './NotePad.css'
import Note from "./Note";

export default function NotePad({patientId}: { patientId: number }): React.JSX.Element {
	return <div className="note-container">
		<Note type={"Subjective"} patientId={patientId}></Note>
		<Note type={"Objective"} patientId={patientId}></Note>
		<Note type={"Assessment"} patientId={patientId}></Note>
		<Note type={"Plan"} patientId={patientId}></Note>
	</div>
}
