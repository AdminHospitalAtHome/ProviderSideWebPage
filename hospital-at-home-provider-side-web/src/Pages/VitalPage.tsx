import {useEffect, useState} from 'react';
import {getAllPatients} from '../BackendFunctionCall/getPatientList';
import {filterPatients} from '../BackendFunctionCall/filterPatients';

import {
	getHeartRate,
	getBloodPressure,
	getWeight,
	getBloodOxygen
} from '../BackendFunctionCall/getVitalData';
import './VitalPage.css'; // Assuming you have a CSS file for styles
import VitalCard from '../Components/Vital/VitalCard';
import AllPatientSideBar from '../Components/Vital/AllPatientSideBar';
import getDefaultStartTime from '../BackendFunctionCall/getDefaultStartTime';
import SingleLineChart from '../Components/Chart/SingleLineChart';
import DoubleLineChart from "../Components/Chart/DoubleLineChart";
import DataTable from "../Components/Table/DataTable";
import {exportToCsv} from "../BackendFunctionCall/exportToCSV";

interface Patient {
	PatientID: number;
	FirstName: string;
	LastName: string;
	Gender: string;
	DateOfBirth: string;
}

interface VitalData {
	bloodOxygen: any[][] | null;
	heartRate: any[][] | null;
	bloodPressure: any[][] | null;
	weight: any[][] | null;
}

interface RecentVitalData {
	recentBloodOxygen: string | null;
	recentHeartRate: string | null;
	recentBloodPressure: string | null;
	recentWeight: string | null;
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

	const [recentVitalData, setRecentVitalData] = useState<RecentVitalData>({
		recentBloodOxygen: null,
		recentHeartRate: null,
		recentBloodPressure: null,
		recentWeight: null
	});

	const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
	const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());

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
					getBloodOxygen(patientId, startDateTime, stopDateTime),
					getHeartRate(patientId,  startDateTime, stopDateTime),
					getBloodPressure(patientId, startDateTime, stopDateTime),
					getWeight(patientId, startDateTime, stopDateTime)
				])
				.then(([bloodOxygen, heartRate, bloodPressure, weight]) => {
					const recentBloodOxygen = bloodOxygen.length > 0 ? bloodOxygen[bloodOxygen.length - 1][1] : null;
					const recentHeartRate = heartRate.length > 0 ? heartRate[heartRate.length - 1][1] : null;
					const recentBloodPressure = bloodPressure.length > 0 ? `${bloodPressure[bloodPressure.length - 1][2]} - ${bloodPressure[bloodPressure.length - 1][1]}`  : null;
					const recentWeight = weight.length > 0 ? weight[weight.length - 1][1] : null;
					setVitalData({
						bloodOxygen: bloodOxygen,
						heartRate: heartRate,
						bloodPressure: bloodPressure,
						weight: weight
					});

					setRecentVitalData({
						recentBloodOxygen: recentBloodOxygen,
						recentHeartRate: recentHeartRate,
						recentBloodPressure: recentBloodPressure,
						recentWeight: recentWeight
					});
				})
				.catch(error => {
					console.error('Error fetching vital data:', error);
				});
		}
		console.log(vitalData)
		// console.log(recentVitalData);
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

	const heartRateChart = (
		<SingleLineChart
			data={vitalData.heartRate}
			label="Heart Rate in BPM"
		/>
	);

	const weightChart= (
		<SingleLineChart
			data={vitalData.weight}
			label="Weight in lbs"
		/>);

	const bloodOxygenChart= (
		<SingleLineChart
			data={vitalData.bloodOxygen}
			label="Blood Oxygen level in %"
		/>);

	const bloodPressureChart = (
		<DoubleLineChart
			data={vitalData.bloodPressure}
			label1="Systolic Blood Pressure in mmHg"
			label2="Diastolic Blood Pressure in mmHg"
	/>);

	const heartRateTable = (
		<DataTable
			columns={["Date Time", "Heart Rate in BPM"]}
			data={vitalData.heartRate} />
	);

	const weightTable = (
		<DataTable
			columns={["Date Time", "Weight in lbs"]}
			data={vitalData.weight} />
	);

	const bloodOxygenTable = (
		<DataTable
			columns={["Date Time", "Blood Oxygen level in %"]}
			data={vitalData.bloodOxygen} />
	);

	const bloodPressureTable = (
		<DataTable
			columns={["Date Time", "Systolic Blood Pressure in mmHg", "Diastolic Blood Pressure in mmHg"]}
			data={vitalData.bloodPressure} />
	);

	const patientData = patients.map(patient => [
		patient.PatientID,
		patient.FirstName,
		patient.LastName,
		patient.Gender,
		patient.DateOfBirth
	]);

	const patientHeaders = ['PatientID', 'FirstName', 'LastName', 'Gender', 'DateOfBirth'];


	const handleExportClick = () => {
		exportToCsv(patientData, patientHeaders, 'patient.csv');
		exportToCsv(vitalData.bloodOxygen, ["Date Time", "Blood Oxygen level in %"], 'bloodOxygen.csv');
		exportToCsv(vitalData.bloodPressure, ["Date Time", "Systolic Blood Pressure in mmHg", "Diastolic Blood Pressure in mmHg"], 'bloodPressure.csv');
		exportToCsv(vitalData.heartRate, ["Date Time", "Heart Rate in BPM"], 'heartRate.csv');
		exportToCsv(vitalData.weight, ["Date Time", "Weight in lbs"], 'weight.csv');
	};

	return (
		<body style={{paddingTop: '60px'}}>
		<div className="main-container">
			<div className="sidebar">
				<div className="exportDataButton">
					<button
						onClick={() => handleExportClick()}>
						Export Data
					</button>
				</div>
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
				<AllPatientSideBar patients={patients} toggleExpanded={toggleExpanded} vitalData={recentVitalData}/>
			</div>
			<div className="main-content">
				<VitalCard title="Blood Oxygen" data={vitalData.bloodOxygen} children={bloodOxygenChart}
						   children2={bloodOxygenTable}/>
				<VitalCard title="Heart Rate" data={vitalData.heartRate} children={heartRateChart} children2={heartRateTable}/>
				<VitalCard title="Blood Pressure" data={vitalData.bloodPressure} children={bloodPressureChart} children2={bloodPressureTable}/>
				<VitalCard title="Weight" data={vitalData.weight} children={weightChart} children2={weightTable}/>
			</div>
		</div>

		</body>

	);
}


