import React from 'react';
import './PatientNotes.css';
import Draggable from 'react-draggable';

export default function PatientNotes({ closeModal }:{closeModal:any}) {
    return (
        <Draggable>
            <div className="patient-notes">
                <div className="close-button" onClick={closeModal}>
                    X
                </div>
                <div>
                    <label>Subjective:</label>
                    <textarea />
                </div>
                <div>
                    <label>Objective:</label>
                    <textarea />
                </div>
                <div>
                    <label>Assessment:</label>
                    <textarea />
                </div>
                <div>
                    <label>Plan:</label>
                    <textarea />
                </div>
            </div>
        </Draggable>
    );
}
