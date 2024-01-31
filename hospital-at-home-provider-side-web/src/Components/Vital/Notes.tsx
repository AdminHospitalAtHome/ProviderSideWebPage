import './Note.css'
import {useEffect, useState} from "react";
import {
	addPatientNote,
	deletePatientNote,
	getPatientNotes,
	updatePatientNote
} from '../../BackendFunctionCall/NoteFunctions'
// @ts-ignore
import addIcon from '../../icons/add.png';
// @ts-ignore
import editIcon from '../../icons/edit.png';
// @ts-ignore
import deleteIcon from '../../icons/delete.png';


export default function Note({patientId}: { patientId: number }): React.JSX.Element {
	const [subjectiveNotes, setSubjectiveNotes] = useState<any[]>([])
	const [objectiveNotes, setObjectiveNotes] = useState<any[]>([])
	const [assessmentNotes, setAssessmentNotes] = useState<any[]>([])
	const [planNotes, setPlanNotes] = useState<any[]>([])
	
	useEffect(() => {
		getPatientNotes(patientId)
			.then(notes => {
					const s = [];
					const o = [];
					const a = [];
					const p = [];
					
					for (let note of notes) {
						if (note.noteType === 'Subjective') {
							s.push(note)
						} else if (note.noteType === 'Objective') {
							o.push(note)
						} else if (note.noteType === 'Assessment') {
							a.push(note)
						} else if (note.noteType === 'Plan') {
							p.push(note)
						}
						
					}
					setSubjectiveNotes(s);
					setObjectiveNotes(o);
					setAssessmentNotes(a);
					setPlanNotes(p);
				}
			)
		
	}, [patientId]);
	
	const deleteOnClick = (uuid: string, type: string) => {
		deletePatientNote(uuid).then(() => {
			if (type === 'Subjective') {
				const updateNotes = subjectiveNotes.filter(note => note.uuid !== uuid);
				setSubjectiveNotes(updateNotes);
			} else if (type === 'Objective') {
				const updateNotes = objectiveNotes.filter(note => note.uuid !== uuid);
				setObjectiveNotes(updateNotes);
			} else if (type === 'Assessment') {
				const updateNotes = assessmentNotes.filter(note => note.uuid !== uuid);
				setAssessmentNotes(updateNotes);
			} else if (type === 'Plan') {
				const updateNotes = planNotes.filter(note => note.uuid !== uuid);
				setPlanNotes(updateNotes);
			}
		})
	}
	
	return <div className="note-container">
		<label>Provider Note</label>
		<div className="note-label-container">
			<label>Subjective</label>
			<button className="icon-button"><img src={addIcon} alt={"Add"} style={{width: '20px', height: '20px'}}/>
			</button>
		</div>
		<ul>
			{subjectiveNotes.map((subjectiveNote) => (<li>{subjectiveNote.noteText}
				<button className="icon-button"><img src={editIcon} alt={"Edit"}
				                                     style={{width: '20px', height: '20px'}}/></button>
				<button className="icon-button" onClick={() => deleteOnClick(subjectiveNote.uuid, 'Subjective')}><img
					src={deleteIcon} alt={"Delete"}
					style={{width: '20px', height: '20px'}}/></button>
			</li>))}
		</ul>
		
		<div className="note-label-container">
			<label>Objective</label>
			<button className="icon-button"><img src={addIcon} alt={"Add"} style={{width: '20px', height: '20px'}}/>
			</button>
		</div>
		<ul>
			{objectiveNotes.map((objectiveNote) => (<li>{objectiveNote.noteText}
				<button className="icon-button"><img src={editIcon} alt={"Edit"}
				                                     style={{width: '20px', height: '20px'}}/></button>
				<button className="icon-button" onClick={() => deleteOnClick(objectiveNote.uuid, 'Objective')}><img
					src={deleteIcon} alt={"Delete"}
					style={{width: '20px', height: '20px'}}/></button>
			</li>))}
		</ul>
		
		<div className="note-label-container">
			<label>Assessment</label>
			<button className="icon-button"><img src={addIcon} alt={"Add"} style={{width: '20px', height: '20px'}}/>
			</button>
		</div>
		<ul>
			{assessmentNotes.map((assessmentNote) => (<li>{assessmentNote.noteText}
				<button className="icon-button"><img src={editIcon} alt={"Edit"}
				                                     style={{width: '20px', height: '20px'}}/></button>
				<button className="icon-button" onClick={() => deleteOnClick(assessmentNote.uuid, 'Assessment')}><img
					src={deleteIcon} alt={"Delete"}
					style={{width: '20px', height: '20px'}}/></button>
			</li>))}
		</ul>
		
		<div className="note-label-container">
			<label>Plan</label>
			<button className="icon-button"><img src={addIcon} alt={"Add"} style={{width: '20px', height: '20px'}}/>
			</button>
		</div>
		<ul>
			{planNotes.map((planNote) => (<li>{planNote.noteText}
				<button className="icon-button"><img src={editIcon} alt={"Edit"}
				                                     style={{width: '20px', height: '20px'}}/></button>
				<button className="icon-button" onClick={() => deleteOnClick(planNote.uuid, 'Plan')}><img
					src={deleteIcon} alt={"Delete"}
					style={{width: '20px', height: '20px'}}/></button>
			</li>))}
		</ul>
	</div>
}
