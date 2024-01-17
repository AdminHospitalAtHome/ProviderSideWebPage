import { useEffect, useState } from 'react';
import { getAllPatients } from '../../BackendFunctionCall/getPatientList';
import './AllPatientSideBar.css';

interface Patient {
  PatientID: number;
  FirstName: string;
  LastName: string;
  Gender: string;
  DateOfBirth: string;
}

export default function AllPatientSideBar({ patients,toggleExpanded, vitalData}: { patients: Patient[], toggleExpanded: any, vitalData:any}) {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggle = (id: number)=>{
    toggleExpanded(id);
    setExpandedId(prevExpandedId => (prevExpandedId === id ? null : id));
  }
//   const toggleExpanded = (id: number) => {
//     setExpandedIds(prevExpandedIds =>
//       prevExpandedIds.includes(id)
//         ? prevExpandedIds.filter(eId => eId !== id)
//         : [...prevExpandedIds, id]
//     );
//   };

function calculateAge(birthdateStr:string) {
    const birthdate = new Date(birthdateStr);
    const today = new Date();
  
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();
  
    // Check if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
  
    return age;
  }
  return (
    <div className="container">
      {patients.map((patient) => (
        <div key={patient.PatientID}>
          <button className="tile" onClick={() => toggle(patient.PatientID)}>
            <div className="avatar">{`${patient.FirstName[0]}${patient.LastName[0]}`}</div>
            <span className="name">{patient.FirstName} {patient.LastName}</span>
          </button>
          <div className={`details ${expandedId === patient.PatientID ? 'expanded' : ''}`}>
            <p className="detailText">Gender: {patient.Gender}</p>
            <p className="detailText">Age: {calculateAge(patient.DateOfBirth)}</p>
            <div className="separator" />
            <p className="detailText">Weight: {vitalData.weight}</p>
            <p className="detailText">Heart Rate: {vitalData.heartRate}</p>
            <p className="detailText">Blood Oxygen: {vitalData.bloodOxygen}</p>
            <p className="detailText">Blood Pressure: {vitalData.bloodPressure}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
