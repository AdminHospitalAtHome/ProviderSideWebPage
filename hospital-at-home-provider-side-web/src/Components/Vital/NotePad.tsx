import './NotePad.css'
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
// @ts-ignore
import cancel from '../../icons/cancel.png';
// @ts-ignore
import save from '../../icons/save.png'

export default function Note({patientId}: { patientId: number }): React.JSX.Element {
	const [update, setUpDate] = useState<boolean>(false);
	const [subjectiveNotes, setSubjectiveNotes] = useState<any[]>([])
	const [objectiveNotes, setObjectiveNotes] = useState<any[]>([])
	const [assessmentNotes, setAssessmentNotes] = useState<any[]>([])
	const [planNotes, setPlanNotes] = useState<any[]>([])
	
	const [addingSubjectiveNote, setAddingSubjectiveNote] = useState<boolean>(false)
	const [addingObjectiveNote, setAddingObjectiveNote] = useState<boolean>(false)
	const [addingAssessmentNote, setAddingAssessmentNote] = useState<boolean>(false)
	const [addingPlanNote, setAddingPlanNote] = useState<boolean>(false)
	
	const [addingNote, setAddingNote] = useState<string>('');
	const [addInput, setAddInput] = useState<string>('');
	const [editInput, setEditInput] = useState<string>('');
	const [editingNote, setEditingNote] = useState<string>('');
	
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
		
	}, [update, patientId]);
	
	const addOnClick = (type: string) => {
		setAddInput('');
		if (type === 'Subjective') {
			setAddingSubjectiveNote(!addingSubjectiveNote);
		} else if (type === 'Objective') {
			setAddingObjectiveNote(!addingObjectiveNote);
		} else if (type === 'Assessment') {
			setAddingAssessmentNote(!addingAssessmentNote);
		} else if (type === 'Plan') {
			setAddingPlanNote(!addingPlanNote);
		}
	}
	
	const addOnConfirm = async (type: string) => {
		let res: any = await addPatientNote(type, addInput, patientId);
		
		if (type === 'Subjective') {
			res = [res, ...subjectiveNotes]
			setSubjectiveNotes(res);
			setAddingSubjectiveNote(false);
		} else if (type === 'Objective') {
			res = [res, ...objectiveNotes]
			setObjectiveNotes(res);
			setAddingObjectiveNote(false);
		} else if (type === 'Assessment') {
			res = [res, ...assessmentNotes]
			setAssessmentNotes(res);
			setAddingAssessmentNote(false);
		} else if (type === 'Plan') {
			res = [res, ...planNotes]
			setPlanNotes(res);
			setAddingPlanNote(false);
		}
	}
	
	const editOnClick = (uuid: string) => {
		setEditingNote(uuid);
	}
	
	const saveEditOnClick = (uuid: string, type: string) => {
		updatePatientNote(uuid, editInput).then(() => setEditingNote(''));
		if (type === 'Subjective') {
			subjectiveNotes.map(note => {
				if (note.uuid === uuid) {
					note.noteText = editInput
				}
			})
		} else if (type === 'Objective') {
			objectiveNotes.map(note => {
				if (note.uuid === uuid) {
					note.noteText = editInput
				}
			})
		} else if (type === 'Assessment') {
			assessmentNotes.map(note => {
				if (note.uuid === uuid) {
					note.noteText = editInput
				}
			})
		} else if (type === 'Plan') {
			planNotes.map(note => {
				if (note.uuid === uuid) {
					note.noteText = editInput
				}
			})
		}
	}
	
	
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
		<div className="note-label-container">
			<label>Subjective</label>
			<button className="icon-button" onClick={() => addOnClick('Subjective')}><img src={addIcon} alt={"Add"}
			                                                                              style={{
				                                                                              width: '20px',
				                                                                              height: '20px'
			                                                                              }}/>
			</button>
		</div>
		{addingSubjectiveNote && <div>
			<input className={'add-input'} onChange={(e) => {
				setAddInput(e.target.value)
			}}/>
			<button className={'add-confirm-button'} onClick={() => {
				addOnConfirm('Subjective');
			}}>Add
			</button>
		</div>}
		<ul>
			{subjectiveNotes.map((subjectiveNote) => (
				subjectiveNote.uuid === editingNote ?
					<li><textarea className='edit-input' defaultValue={subjectiveNote.noteText}
					              onChange={(e) => setEditInput(e.target.value)}/>
						<button className="icon-button" onClick={() => setEditingNote('')}><img src={cancel}
						                                                                        alt={"Cancel"}
						                                                                        style={{
							                                                                        width: '20px',
							                                                                        height: '20px'
						                                                                        }}/></button>
						<button className="icon-button"
						        onClick={() => saveEditOnClick(subjectiveNote.uuid, 'Subjective')}><img src={save}
						                                                                                alt={"Save"}
						                                                                                style={{
							                                                                                width: '20px',
							                                                                                height: '20px'
						                                                                                }}/></button>
					</li> :
					<li>{subjectiveNote.noteText}
						<button className="icon-button" onClick={() => editOnClick(subjectiveNote.uuid)}>
							<img
								src={editIcon}
								alt={"Edit"}
								style={{
									width: '20px',
									height: '20px'
								}}/></button>
						<button className="icon-button"
						        onClick={() => deleteOnClick(subjectiveNote.uuid, 'Subjective')}>
							<img
								src={deleteIcon} alt={"Delete"}
								style={{width: '20px', height: '20px'}}/></button>
					</li>
			))}
		</ul>
		
		<div className="note-label-container">
			<label>Objective</label>
			<button className="icon-button" onClick={() => addOnClick('Objective')}><img src={addIcon} alt={"Add"}
			                                                                             style={{
				                                                                             width: '20px',
				                                                                             height: '20px'
			                                                                             }}/>
			</button>
		</div>
		{addingObjectiveNote && <div><input className={'add-input'} onChange={(e) => {
			setAddInput(e.target.value)
		}}/>
			<button className='add-confirm-button' onClick={() => {
				addOnConfirm('Objective')
			}}>Add
			</button>
		</div>}
		<ul>
			{objectiveNotes.map((objectiveNote) => (objectiveNote.uuid === editingNote ?
				<li><textarea className='edit-input' defaultValue={objectiveNote.noteText}
				              onChange={(e) => setEditInput(e.target.value)}/>
					<button className="icon-button" onClick={() => setEditingNote('')}><img src={cancel}
					                                                                        alt={"Cancel"}
					                                                                        style={{
						                                                                        width: '20px',
						                                                                        height: '20px'
					                                                                        }}/></button>
					<button className="icon-button"
					        onClick={() => saveEditOnClick(objectiveNote.uuid, 'Objective')}><img src={save}
					                                                                              alt={"Save"}
					                                                                              style={{
						                                                                              width: '20px',
						                                                                              height: '20px'
					                                                                              }}/></button>
				</li> : <li>{objectiveNote.noteText}
					<button className="icon-button" onClick={() => editOnClick(objectiveNote.uuid)}><img src={editIcon}
					                                                                                     alt={"Edit"}
					                                                                                     style={{
						                                                                                     width: '20px',
						                                                                                     height: '20px'
					                                                                                     }}/></button>
					<button className="icon-button" onClick={() => deleteOnClick(objectiveNote.uuid, 'Objective')}><img
						src={deleteIcon} alt={"Delete"}
						style={{width: '20px', height: '20px'}}/></button>
				</li>))}
		</ul>
		
		<div className="note-label-container">
			<label>Assessment</label>
			<button className="icon-button" onClick={() => addOnClick('Assessment')}><img src={addIcon} alt={"Add"}
			                                                                              style={{
				                                                                              width: '20px',
				                                                                              height: '20px'
			                                                                              }}/>
			</button>
		</div>
		{addingAssessmentNote && <div><input className={'add-input'} onChange={(e) => {
			setAddInput(e.target.value)
		}}/>
			<button className={'add-confirm-button'} onClick={() => {
				addOnConfirm('Assessment')
			}}>Add
			</button>
		</div>}
		<ul>
			{assessmentNotes.map((assessmentNote) => (assessmentNote.uuid === editingNote ?
				<li><textarea className='edit-input' defaultValue={assessmentNote.noteText}
				              onChange={(e) => setEditInput(e.target.value)}/>
					<button className="icon-button" onClick={() => setEditingNote('')}><img src={cancel}
					                                                                        alt={"Cancel"}
					                                                                        style={{
						                                                                        width: '20px',
						                                                                        height: '20px'
					                                                                        }}/></button>
					<button className="icon-button"
					        onClick={() => saveEditOnClick(assessmentNote.uuid, 'Assessment')}><img src={save}
					                                                                                alt={"Save"}
					                                                                                style={{
						                                                                                width: '20px',
						                                                                                height: '20px'
					                                                                                }}/></button>
				</li> : <li>{assessmentNote.noteText}
					<button className="icon-button" onClick={() => editOnClick(assessmentNote.uuid)}><img src={editIcon}
					                                                                                      alt={"Edit"}
					                                                                                      style={{
						                                                                                      width: '20px',
						                                                                                      height: '20px'
					                                                                                      }}/></button>
					<button className="icon-button" onClick={() => deleteOnClick(assessmentNote.uuid, 'Assessment')}>
						<img
							src={deleteIcon} alt={"Delete"}
							style={{width: '20px', height: '20px'}}/></button>
				</li>))}
		</ul>
		
		<div className="note-label-container">
			<label>Plan</label>
			<button className="icon-button" onClick={() => addOnClick('Plan')}><img src={addIcon} alt={"Add"} style={{
				width: '20px',
				height: '20px'
			}}/>
			</button>
		</div>
		{addingPlanNote && <div><input className={'add-input'} onChange={(e) => {
			setAddInput(e.target.value)
		}}/>
			<button className={'add-confirm-button'} onClick={() => {
				addOnConfirm('Plan')
			}}>Add
			</button>
		</div>}
		<ul>
			{planNotes.map((planNote) => (planNote.uuid === editingNote ?
				<li><textarea className='edit-input' defaultValue={planNote.noteText}
				              onChange={(e) => setEditInput(e.target.value)}/>
					<button className="icon-button" onClick={() => setEditingNote('')}><img src={cancel}
					                                                                        alt={"Cancel"}
					                                                                        style={{
						                                                                        width: '20px',
						                                                                        height: '20px'
					                                                                        }}/></button>
					<button className="icon-button"
					        onClick={() => saveEditOnClick(planNote.uuid, 'Plan')}><img src={save}
					                                                                    alt={"Save"}
					                                                                    style={{
						                                                                    width: '20px',
						                                                                    height: '20px'
					                                                                    }}/></button>
				</li> : <li>{planNote.noteText}
					<button className="icon-button" onClick={() => editOnClick(planNote.uuid)}><img src={editIcon}
					                                                                                alt={"Edit"}
					                                                                                style={{
						                                                                                width: '20px',
						                                                                                height: '20px'
					                                                                                }}/></button>
					<button className="icon-button" onClick={() => deleteOnClick(planNote.uuid, 'Plan')}><img
						src={deleteIcon} alt={"Delete"}
						style={{width: '20px', height: '20px'}}/></button>
				</li>))}
		</ul>
	</div>
}
