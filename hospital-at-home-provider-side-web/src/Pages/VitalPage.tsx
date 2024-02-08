import {useEffect, useState} from 'react';
import {getAllPatients} from '../BackendFunctionCall/getPatientList';
import Button from 'react-bootstrap/Button';
import {getHeartRate, getWeight, getBloodOxygen, getBloodPressure} from '../BackendFunctionCall/getVitalData';
import './VitalPage.css';
import VitalCard from '../Components/Vital/VitalCard';
import AllPatientSideBar from '../Components/Vital/AllPatientSideBar';
import getDefaultStartTime from '../BackendFunctionCall/getDefaultStartTime';
import SingleLineChart from '../Components/Chart/SingleLineChart';
import DoubleLineChart from "../Components/Chart/DoubleLineChart";
import DataTable from "../Components/Table/DataTable";
import {exportToCsv} from "../BackendFunctionCall/exportToCSV";
import {MultipleVitalDataInterface, Patient, VitalDataInterface} from '../Components/Vital/PatientVitalInterface';
import FilterPanel from "../Components/Vital/FilterPanel";
import DateSelectionBar from "../Components/Vital/DateSelectionBar";


export default function VitalPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filterPanelVisible, setFilterPanelVisible] = useState(false);
  const [filters, setFilters] = useState({providerID: '', firstName: '', lastName: '', gender: ''});
  const [patientId, setExpandedId] = useState<number | null>(null);
  const [vitalData, setVitalData] = useState<MultipleVitalDataInterface>({
    bloodOxygen: null,
    heartRate: null,
    bloodPressure: null,
    weight: null
  });

  const [recentVitalData, setRecentVitalData] = useState<VitalDataInterface>({
    bloodOxygen: null,
    heartRate: null,
    bloodPressure: null,
    weight: null
  });

  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());

	const toggleExpanded = (id: number) => {
		setExpandedId(prevExpandedId => (prevExpandedId === id ? null : id));
	};

	const [isNoteModalOpen, setNoteModalOpen] = useState(false);

    const openModal = () => setNoteModalOpen(true);
    const closeModal = () => setNoteModalOpen(false);

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
        getHeartRate(patientId, startDateTime, stopDateTime),
        getBloodPressure(patientId, startDateTime, stopDateTime),
        getWeight(patientId, startDateTime, stopDateTime)
      ])
        .then(([bloodOxygen, heartRate, bloodPressure, weight]) => {
          const recentBloodOxygen = bloodOxygen.length > 0 ? `${bloodOxygen[bloodOxygen.length - 1][1]}%` : null;
          const recentHeartRate = heartRate.length > 0 ? `${heartRate[heartRate.length - 1][1]} BPM` : null;
          const recentBloodPressure = bloodPressure.length > 0 ? `${bloodPressure[bloodPressure.length - 1][1]}/${bloodPressure[bloodPressure.length - 1][2]} mmHg` : null;
          const recentWeight = weight.length > 0 ? `${weight[weight.length - 1][1]} lbs` : null;
          setVitalData({
            bloodOxygen: bloodOxygen,
            heartRate: heartRate,
            bloodPressure: bloodPressure,
            weight: weight
          });

          setRecentVitalData({
            bloodOxygen: recentBloodOxygen,
            heartRate: recentHeartRate,
            bloodPressure: recentBloodPressure,
            weight: recentWeight
          });
        })
        .catch(error => {
          console.error('Error fetching vital data:', error);
        });

    }
    

  }, [patientId]);

  const patientHeaders = ['PatientID', 'FirstName', 'LastName', 'Gender', 'DateOfBirth'];
  const bloodOxygenHeaders = ["Date Time", "Blood Oxygen level in %", "ifManualInput"];
  const bloodPressureHeaders = ["Date Time", "Systolic Blood Pressure in mmHg", "Diastolic Blood Pressure in mmHg", "ifManualInput"];
  const heartRateHeaders = ["Date Time", "Heart Rate in BPM", "ifManualInput"];
  const weightHeaders = ["Date Time", "Weight in lbs", "ifManualInput"];

  const heartRateChart = (
    <SingleLineChart
      data={vitalData.heartRate}
      label="Heart Rate in BPM"
    />
  );

  const weightChart = (
    <SingleLineChart
      data={vitalData.weight}
      label="Weight in lbs"
    />);

  const bloodOxygenChart = (
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
    <DataTable columns={heartRateHeaders}
               data={vitalData.heartRate}></DataTable>
  );

  const weightTable = (
    <DataTable
      columns={weightHeaders}
      data={vitalData.weight}/>
  );

  const bloodOxygenTable = (
    <DataTable
      columns={bloodOxygenHeaders}
      data={vitalData.bloodOxygen}/>
  );

  const bloodPressureTable = (
    <DataTable
      columns={bloodPressureHeaders}
      data={vitalData.bloodPressure}/>
  );

  const patientData = patients.map(patient => [
    patient.PatientID,
    patient.FirstName,
    patient.LastName,
    patient.Gender,
    patient.DateOfBirth
  ]);


  const handleExportClick = () => {
    exportToCsv(patientData, patientHeaders, 'patient.csv');
    exportToCsv(vitalData.bloodOxygen, bloodOxygenHeaders, 'bloodOxygen.csv');
    exportToCsv(vitalData.bloodPressure, bloodPressureHeaders, 'bloodPressure.csv');
    exportToCsv(vitalData.heartRate, heartRateHeaders, 'heartRate.csv');
    exportToCsv(vitalData.weight, weightHeaders, 'weight.csv');
  };

  return (
    <body style={{paddingTop: '56px', height:'100%'}}>
      <div className="main-container">
        <div className="sidebar">
          <div className="vitalsButtonList">
            <div className="">
              <Button variant="light"
                onClick={() => handleExportClick()}>
                Export Data
              </Button>
            </div>
            <div className="">
              <Button variant="light" onClick={() => setFilterPanelVisible(!filterPanelVisible)}>
                Filter
              </Button>
            </div>
          </div>
          {filterPanelVisible && (
                      <FilterPanel filters={filters} setFilters={setFilters} setPatients={setPatients}></FilterPanel>
          )}
          <AllPatientSideBar patients={patients} toggleExpanded={toggleExpanded} vitalData={recentVitalData}/>
        </div>
        <div className="main-content">
          <div className="date-selection-container">
            <DateSelectionBar setStartDateTime={setStartDateTime} setStopDateTime={setStopDateTime}/>
          </div>
          <div className="charts-container">
            <VitalCard title="Weight" data={vitalData.weight} children={weightChart} children2={weightTable}/>
            <VitalCard title="Heart Rate" data={vitalData.heartRate} children={heartRateChart} children2={heartRateTable}/>
            <VitalCard title="Blood Oxygen" data={vitalData.bloodOxygen} children={bloodOxygenChart}
                       children2={bloodOxygenTable}/>
            <VitalCard title="Blood Pressure" data={vitalData.bloodPressure} children={bloodPressureChart}
                       children2={bloodPressureTable}/>
          </div>
        </div>
      </div>
    </body>

  );
}


