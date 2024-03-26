import React, {useEffect, useState} from "react";
// @ts-ignore
import addIcon from "../../icons/add.png";
// @ts-ignore
import cancel from "../../icons/cancel.png";
// @ts-ignore
import save from "../../icons/save.png";
// @ts-ignore
import editIcon from "../../icons/edit.png";
// @ts-ignore
import deleteIcon from "../../icons/delete.png";

import {
	addPatientNote,
	getPatientNotes,
	updatePatientNote,
	deletePatientNote
} from "../../BackendFunctionCall/NoteFunctions";
import {set} from "react-hook-form";

export default function Note({type, patientId}: { type: string, patientId: number }): React.JSX.Element {
	const [addingNewNote, setAddingNewNote] = useState<boolean>(false);
	const [editingExistingNoteId, setEditingExistingNoteId] = useState<string>('')
	const [newNodeInput, setNewNodeInput] = useState<string>('');
	const [editingNoteInput, setEditingNoteInput] = useState<string>('')
	const [notes, setNotes] = useState<any[]>([]);
	useEffect(() => {
		getPatientNotes(patientId).then(res => {
				let temp_note_list = []
				for (let note of res) {
					if (note.noteType === type) {
						temp_note_list.push(note)
					}
				}
				setNotes(temp_note_list);
			}
		)
	}, [patientId, type]);

	async function addOnClick() {
		{
			let res: any = await addPatientNote(type, newNodeInput, patientId);
			res = [res, ...notes]
			setNotes(res);
			setAddingNewNote(!addingNewNote);
		}
	}

	async function deleteOnClick(uuid: string) {
		deletePatientNote(uuid).then(() => {
			const remainingNotes = notes.filter(note => note.uuid !== uuid);
			setNotes(remainingNotes);
		})

	}

	function editOnClick(uuid: string) {
		updatePatientNote(uuid, editingNoteInput);
		notes.map(note => {
			if (note.uuid === uuid) {
				note.noteText = editingNoteInput;
			}
		})
		setEditingExistingNoteId('');

	}

	return (<div>
			<div className="note-label-container">
				<label style={{fontWeight:'bold'}}>{type}</label>
				<button className="icon-button" onClick={() => setAddingNewNote(!addingNewNote)}><img src={addIcon}
				                                                                                      alt={"Add"}
				                                                                                      style={{
					                                                                                      width: '20px',
					                                                                                      height: '20px'
				                                                                                      }}/>
				</button>
			</div>
			{addingNewNote && <div>
				<input className={'add-input'} onChange={(e) => {
					setNewNodeInput(e.target.value)
				}}/>
				<button className={'add-confirm-button'} onClick={() => addOnClick()}>Add
				</button>
			</div>}
			<ul>
				{notes.map((note) => (
					note.uuid === editingExistingNoteId ?
						<li key={note.uuid + "EDITING"}><textarea className='edit-input' defaultValue={note.noteText}
						              onChange={(e) => setEditingNoteInput(e.target.value)}/>
							<button className="icon-button"
							        onClick={() => setEditingExistingNoteId('')}><img src={cancel}
							                                                          alt={"Cancel"}
							                                                          style={{
								                                                          width: '20px',
								                                                          height: '20px'
							                                                          }}/></button>
							<button className="icon-button"
							        onClick={() => editOnClick(note.uuid)}><img src={save}
							                                                    alt={"Save"}
							                                                    style={{
								                                                    width: '20px',
								                                                    height: '20px'
							                                                    }}/>
							</button>
						</li> :
						<li key={note.uuid + "NOTEDITING"}>{note.noteText}
							<button className="icon-button" onClick={() => setEditingExistingNoteId(note.uuid)}>
								<img
									src={editIcon}
									alt={"Edit"}
									style={{
										width: '20px',
										height: '20px'
									}}/></button>
							<button className="icon-button"
							        onClick={() =>
								        deleteOnClick(note.uuid)
							        }>
								<img
									src={deleteIcon} alt={"Delete"}
									style={{width: '20px', height: '20px'}}/></button>
						</li>
				))}
			</ul>
		</div>

	);

}
