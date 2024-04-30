import {useEffect, useState} from 'react';
import {getAllPatients} from '../BackendFunctionCall/getPatientList';
import Button from 'react-bootstrap/Button';
import timeTableParser, {
  getHeartRate,
  getWeight,
  getBloodOxygen,
  getBloodPressure,
  getSpirometry, parseSpirometryForFEV1Chart, parseSpirometryForFEV1_FVCChart
} from '../BackendFunctionCall/getVitalData';
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
import useWebSocket from 'react-use-websocket';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getWebSocketAddressURL} from "../BackendFunctionCall/socketAlerts/getWebSocketAddressURL";
import {viewedAlerts} from "../BackendFunctionCall/socketAlerts/alertFunctions";


export default function VitalPage() {
  const providerId = 100001;
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filterPanelVisible, setFilterPanelVisible] = useState(false);
  const [filters, setFilters] = useState({providerID: '', firstName: '', lastName: '', gender: ''});
  const [patientId, setExpandedId] = useState<number | null>(null);
  const [vitalData, setVitalData] = useState<MultipleVitalDataInterface>({
    bloodOxygen: null,
    heartRate: null,
    bloodPressure: null,
    weight: null,
    spirometry: null,
  });

  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());

	const toggleExpanded = (id: number) => {
		setExpandedId(prevExpandedId => (prevExpandedId === id ? null : id));
	};

	const [isNoteModalOpen, setNoteModalOpen] = useState(false);

    const openModal = () => setNoteModalOpen(true);
    const closeModal = () => setNoteModalOpen(false);

  // Coppied then modified from Documentation
  // We are allowed to either pass in string (URL) or function that returns string or promise that resolve to a string
  const {} = useWebSocket(getWebSocketAddressURL, {
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
    onMessage: (messageEvent) => {
      let messageJSON = JSON.parse(messageEvent.data);
      // Settings for toast in App.tsx
      toast.error(messageJSON.AlertString, {
        toastId: messageJSON.id,
        onClose: () => {
          viewedAlerts(messageJSON.id, providerId)
        }
      });
    }

  });

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
        getWeight(patientId, startDateTime, stopDateTime),
        getSpirometry(patientId, startDateTime, stopDateTime),
      ])
        .then(([bloodOxygen, heartRate, bloodPressure, weight, spirometry]) => {
          setVitalData({
            bloodOxygen: bloodOxygen,
            heartRate: heartRate,
            bloodPressure: bloodPressure,
            weight: weight,
            spirometry: spirometry
          });

        })
        .catch(error => {
          console.error('Error fetching vital data:', error);
        });
    }

  }, [patientId, startDateTime, stopDateTime]);

  const patientHeaders = ['PatientID', 'FirstName', 'LastName', 'Gender', 'DateOfBirth'];
  const bloodOxygenHeaders = ["Date Time", "Blood Oxygen level in %", "If Manual Input"];
  const bloodPressureHeaders = ["Date Time", "Systolic Blood Pressure in mmHg", "Diastolic Blood Pressure in mmHg", "If Manual Input"];
  const heartRateHeaders = ["Date Time", "Heart Rate in BPM", "If Manual Input"];
  const weightHeaders = ["Date Time", "Weight in lbs", "If Manual Input"];
  const spirometryHeaders = ["Date Time", "FEV1 in Liters", "FEV1/FVC in %", "If Manual Input"];

  const heartRateChart = (
    <SingleLineChart
      data={vitalData.heartRate}
      label="Heart Rate In BPM"
    />
  );

  const weightChart = (
    <SingleLineChart
      data={vitalData.weight}
      label="Weight In lbs"
    />);

  const bloodOxygenChart = (
    <SingleLineChart
      data={vitalData.bloodOxygen}
      label="Blood Oxygen level In %"
    />);

  const bloodPressureChart = (
    <DoubleLineChart
      data={vitalData.bloodPressure}
      label1="Systolic Blood Pressure In mmHg"
      label2="Diastolic Blood Pressure In mmHg"
    />);

  const spirometryFEV1Chart = (
    <SingleLineChart
      data={parseSpirometryForFEV1Chart(vitalData.spirometry)}
      label="FEV1 In L"
    />
  )

  const spirometryFEV1_FVCChart = (
    <SingleLineChart
      data={parseSpirometryForFEV1_FVCChart(vitalData.spirometry)}
      label="FEV1/FVC In %"
    />
  )

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

  // The two tables will be the same with the charts being specific
  const spirometryTable = (
    <DataTable
      columns={spirometryHeaders}
      data={vitalData.spirometry}/>
  )

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

  console.log("Vital Data (Weight): ", vitalData.weight);
  console.log("Vital Data (Spirometry): ", vitalData.spirometry);
  console.log("Vital Data Parsed (Spirometry): ", parseSpirometryForFEV1_FVCChart(vitalData.spirometry))
  return (
    <div style={{paddingTop: '56px', height:'100%'}}>
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
          <AllPatientSideBar patients={patients} toggleExpanded={toggleExpanded}/>
        </div>
        <div className="main-content">
          <div className="date-selection-container">
            <DateSelectionBar setStartDateTime={setStartDateTime} setStopDateTime={setStopDateTime}/>
          </div>
          <div className="charts-container">
            <div className="vital-card-container">
              <VitalCard title="Weight" children={weightChart} children2={weightTable}/>
            </div>

            <div className="vital-card-container">
              <VitalCard title="Heart Rate" children={heartRateChart} children2={heartRateTable}/>
            </div>

            <div className="vital-card-container">
              <VitalCard title="Blood Oxygen" children={bloodOxygenChart} children2={bloodOxygenTable}/>
            </div>

            <div className="vital-card-container">
              <VitalCard title="Blood Pressure" children={bloodPressureChart} children2={bloodPressureTable}/>
            </div>

            <div className="vital-card-container">
              <VitalCard title="Spirometry (FEV1)" children={spirometryFEV1Chart} children2={spirometryTable}/>
            </div>

            <div className="vital-card-container">
              <VitalCard title="Spirometry (FEV1/FVC)" children={spirometryFEV1_FVCChart} children2={spirometryTable}/>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}


