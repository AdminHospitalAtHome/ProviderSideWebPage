import React, { useState } from 'react';
import './PatientNotes.css';
import Draggable from 'react-draggable';
import Button from 'react-bootstrap/esm/Button';
import { PatientNote } from './PatientVitalInterface';
import { getPatientNotes, updatePatientNotes } from '../../BackendFunctionCall/getPatientNotes';

export default function PatientNotes({
  patientId,
  data,
  closeModal,
  onNotesUpdated
}: {
  patientId: number | null;
  data: PatientNote | null;
  closeModal: any;
  onNotesUpdated: any;
}) {


    const initialData = data || {
        Subjective: '',
        Objective: '',
        Assessment: '',
        Plan: ''
      };
     
      const [formData, setFormData] = useState<PatientNote>(initialData);
    
      const handleModalClose = async () => {
        const { Subjective, Objective, Assessment, Plan } = formData;
        try {
          await updatePatientNotes(Subjective, Objective, Assessment, Plan, patientId);
          onNotesUpdated();
        } catch (error) {
          console.error('Update error:', error);
        }
        closeModal();
      };
      

      const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: keyof PatientNote) => {
        setFormData({
          ...formData,
          [field]: e.target.value
        });
      };
    
    

  return (
    <Draggable>
      <div className="patient-notes">
        <div className="close-button" onClick={closeModal}>
          X
        </div>
        <div>
          <label>Subjective:</label>
          <textarea 
          defaultValue={data?.Subjective}
          value={formData.Subjective}
           onChange={(e) => handleInputChange(e, 'Subjective')}
          />
        </div>
        <div>
          <label>Objective:</label>
          <textarea defaultValue={data?.Objective} 
          value={formData.Objective}
          onChange={(e) => handleInputChange(e, 'Objective')}
          />

        </div>
        <div>
          <label>Assessment:</label>
          <textarea defaultValue={data?.Assessment} 
          value={formData.Assessment}
          onChange={(e) => handleInputChange(e, 'Assessment')}
          
          />
        </div>
        <div>
          <label>Plan:</label>
          <textarea defaultValue={data?.Plan}
          value={formData.Plan}
          onChange={(e) => handleInputChange(e, 'Plan')}
          />
        </div>
        <Button variant="light" className="done-button" onClick={handleModalClose}>
          Done
        </Button>
      </div>
    </Draggable>
  );
}
