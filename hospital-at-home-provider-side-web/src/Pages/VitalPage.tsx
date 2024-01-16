import { useEffect, useState } from 'react';
import { getAllPatients  } from '../BackendFunctionCall/getPatientList';
import { filterPatients } from '../BackendFunctionCall/filterPatients';
import AllPatientSideBar from '../Components/AllPatientSideBar';
import './VitalPage.css'; // Assuming you have a CSS file for styles
interface Patient {
	PatientID: number;
	FirstName: string;
	LastName: string;
	Gender: string;
	DateOfBirth: string;
  }
  
export default function VitalPage() {
	const [patients, setPatients] = useState<Patient[]>([]);
  const [filterPanelVisible, setFilterPanelVisible] = useState(false);
  const [filters, setFilters] = useState({ providerID: '', firstName: '', lastName: '', gender: '' });

  useEffect(() => {
    getAllPatients()
      .then(patientData => {
        setPatients(patientData);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  const handleFilterChange = (name: string, value:string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };


  const applyFilters = () => {
	// Convert the filters object into a query string, appending 'null' for null, undefined, or empty string values
	const filterParams = Object.entries(filters)
	  .map(([key, value]) => {
		if (value === null || value === undefined || value === '') {
		  return `${encodeURIComponent(key)}=null`;
		}
		return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
	  })
	  .join('&');
  
	console.log(filterParams);
  
	filterPatients(filterParams)
	  .then((patientData: any) => {
		const patients: Patient[] = patientData as Patient[];
		setPatients(patients);
		console.log(patients);
	  })
	  .catch(error => {
		console.error('Error fetching patients:', error);
	  });
  };
  

  return (
    <div className="sidebar">
      <div className="filterButton">
        <button onClick={() => setFilterPanelVisible(!filterPanelVisible)}>
          Filter
        </button>
      </div>

      {filterPanelVisible && (
        <div className="filterPanel">
          <input
            className="input"
            onChange={(e) => handleFilterChange('providerID', e.target.value)}
            value={filters.providerID}
            placeholder="Provider ID"
          />
          <input
            className="input"
            onChange={(e) => handleFilterChange('firstName', e.target.value)}
            value={filters.firstName}
            placeholder="First Name"
          />
          <input
            className="input"
            onChange={(e) => handleFilterChange('lastName', e.target.value)}
            value={filters.lastName}
            placeholder="Last Name"
          />
          <input
            className="input"
            onChange={(e) => handleFilterChange('gender', e.target.value)}
            value={filters.gender}
            placeholder="Gender"
          />
          <button onClick={applyFilters}>Apply Filters</button>
        </div>
      )}

      <AllPatientSideBar patients={patients} />
    </div>
  );
}
