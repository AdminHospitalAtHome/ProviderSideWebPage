import { useEffect, useState } from 'react';
import { getAllPatients } from '../BackendFunctionCall/getPatientList';
import './AllPatientSideBar.css'; 

interface Patient {
  PatientID: number;
  FirstName: string;
  LastName: string;
  Gender: string;
  DateOfBirth: string;
}

export default function AllPatientSideBar({ patients }: { patients: Patient[] }) {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  
  const toggleExpanded = (id: number) => {
    setExpandedIds(prevExpandedIds =>
      prevExpandedIds.includes(id)
        ? prevExpandedIds.filter(eId => eId !== id)
        : [...prevExpandedIds, id]
    );
  };

  return (
    <div className="container">
      {patients.map((patient) => (
        <div key={patient.PatientID}>
          <button className="tile" onClick={() => toggleExpanded(patient.PatientID)}>
            <div className="avatar">{`${patient.FirstName[0]}${patient.LastName[0]}`}</div>
            <span className="name">{patient.FirstName} {patient.LastName}</span>
          </button>
          <div className={`details ${expandedIds.includes(patient.PatientID) ? 'expanded' : ''}`}>
            <p className="detailText">Gender: {patient.Gender}</p>
            <p className="detailText">Age: ...</p>
            <div className="separator" />
            <p className="detailText">Weight: ...</p>
            <p className="detailText">Heart Rate: ...</p>
            <p className="detailText">Blood Oxygen: ...</p>
            <p className="detailText">Blood Pressure: ...</p>
          </div>
        </div>
      ))}
    </div>
  );
}
