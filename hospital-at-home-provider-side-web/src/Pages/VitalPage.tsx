import {useEffect, useState} from 'react';
import {getAllPatients} from '../BackendFunctionCall/getPatientList';
import {filterPatients} from '../BackendFunctionCall/filterPatients';
import AllPatientSideBar from '../Components/Vital/AllPatientSideBar';
import {
	getRecentBloodOxygen,
	getRecentHeartRate,
	getRecentBloodPressure,
	getRecentWeight
} from '../BackendFunctionCall/getVitalData';
import './VitalPage.css'; // Assuming you have a CSS file for styles
interface Patient {
	PatientID: number;
	FirstName: string;
	LastName: string;
	Gender: string;
	DateOfBirth: string;
}

interface VitalData {
	bloodOxygen: string | null;
	heartRate: string | null;
	bloodPressure: string | null;
	weight: string | null;
}


export default function VitalPage() {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [filterPanelVisible, setFilterPanelVisible] = useState(false);
	const [filters, setFilters] = useState({providerID: '', firstName: '', lastName: '', gender: ''});
	const [patientId, setExpandedId] = useState<number | null>(null);
	const [vitalData, setVitalData] = useState<VitalData>({
		bloodOxygen: null,
		heartRate: null,
		bloodPressure: null,
		weight: null
	});
	
	const toggleExpanded = (id: number) => {
		setExpandedId(prevExpandedId => (prevExpandedId === id ? null : id));
	};
	
	
	useEffect(() => {
		getAllPatients()
			.then(patientData => {
				setPatients(patientData);
			})
			.catch(error => {
				console.error('Error fetching patients:', error);
			});
	}, []);
	
	useEffect(() => {
		if (patientId !== null) {
			Promise.all([
					getRecentBloodOxygen(patientId),
					getRecentHeartRate(patientId),
					getRecentBloodPressure(patientId),
					getRecentWeight(patientId)
				])
				.then(([bloodOxygen, heartRate, bloodPressure, weight]) => {
					setVitalData({bloodOxygen, heartRate, bloodPressure, weight});
				})
				.catch(error => {
					console.error('Error fetching vital data:', error);
				});
		}
	}, [patientId]);
	
	const handleFilterChange = (name: string, value: string) => {
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
		<body style={{paddingTop: '60px'}}>
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
			
			<AllPatientSideBar patients={patients} toggleExpanded={toggleExpanded} vitalData={vitalData}/>
		</div>
		</body>
	
	);
}
