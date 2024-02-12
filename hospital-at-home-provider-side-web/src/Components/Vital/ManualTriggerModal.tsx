import Modal from "react-bootstrap/Modal";
import React, {useState} from "react";
import "./ManualTriggerModal.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import {
  CurrentAlertLevelData,
  getCurrentTriggers,
  loadingCurrentAlertLevelData
} from "../../BackendFunctionCall/Vital/ManualTriggerModal";

export default function ManualTriggerModal({
                                           }: {

}) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<CurrentAlertLevelData>(loadingCurrentAlertLevelData)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="patient-card-setManualTriggersButton-container">
        <button className="patient-card-setManualTriggersButton" onClick={() => {
          getCurrentTriggers(100000001).then((data) => {
            setData(data)
            handleShow()
          })
        }}>
          Set Manual Triggers
        </button>
      </div>

      <Modal
        show={show}
        backdrop="static"
      >
        <Modal.Header className="ManualTriggerModal-Header">
          <Modal.Title>Set Alert Triggers</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ManualTriggerModal-Body">
          <div className="ManualTriggerModal-VitalGroup">
            <h5>
              Weight
            </h5>
            <label className="ManualTriggerModal-Label">
              Red Weight Time Frame (Days):
              <input className="ManualTriggerModal-InputBox" type="number" value={data.Custom_Weight_Alert.Red_Day_Frame}/>
            </label>
            <label className="ManualTriggerModal-Label">
              Red Weight Change (Pounds):
              <input className="ManualTriggerModal-InputBox" type="number" value={data.Custom_Weight_Alert.Red_Weight_Change}/>
            </label>
            <label className="ManualTriggerModal-Label">
              Red Weight Time Frame (Days):
              <input className="ManualTriggerModal-InputBox" type="number" value={data.Custom_Weight_Alert.Yellow_Day_Frame}/>
            </label>
            <label className="ManualTriggerModal-Label">
              Red Weight Change (Pounds):
              <input className="ManualTriggerModal-InputBox" type="number" value={data.Custom_Weight_Alert.Yellow_Weight_Change}/>
            </label>
          </div>

          <div className="ManualTriggerModal-VitalGroup">
            <h5>
              Heart Rate
            </h5>
            <label className="ManualTriggerModal-Label">
              Red Heart Rate (Beats Per Second):
              <input className="ManualTriggerModal-InputBox" type="number" value={data.Custom_Heart_Rate_Alert.Red_Heart_Rate}/>
            </label>
            <label className="ManualTriggerModal-Label">
              Yellow Heart Rate (Beats Per Second):
              <input className="ManualTriggerModal-InputBox" type="number" value={data.Custom_Heart_Rate_Alert.Yellow_Heart_Rate}/>
            </label>
          </div>

          <div className="ManualTriggerModal-VitalGroup">
            <h5>
              Blood Pressure
            </h5>
            <label className="ManualTriggerModal-Label">
              Red Systolic Blood Pressure (mmHg):
              <input className="ManualTriggerModal-InputBox" type="number" value={data.Custom_Blood_Pressure_Alert.RedSystolicBP}/>
            </label>
            <label className="ManualTriggerModal-Label">
              Red Diastolic Blood Pressure (mmHg):
              <input className="ManualTriggerModal-InputBox" type="number" value={data.Custom_Blood_Pressure_Alert.RedDiastolicBP}/>
            </label>
            <label className="ManualTriggerModal-Label">
              Yellow Systolic Blood Pressure (mmHg):
              <input className="ManualTriggerModal-InputBox" type="number" value={data.Custom_Blood_Pressure_Alert.YellowSystolicBP}/>
            </label>
            <label className="ManualTriggerModal-Label">
              Yellow Diastolic Blood Pressure (mmHg):
              <input className="ManualTriggerModal-InputBox" type="number" value={data.Custom_Blood_Pressure_Alert.YellowDiastolicBP}/>
            </label>
          </div>

          <div className="ManualTriggerModal-VitalGroup">
            <h5>
              Blood Oxygen
            </h5>
            <label className="ManualTriggerModal-Label">
              Red Blood Oxygen Level (%):
              <input className="ManualTriggerModal-InputBox" type="number" value={data.Custom_Blood_Oxygen_Alert.RedBloodOxygenLevel}/>
            </label>
            <label className="ManualTriggerModal-Label">
              Yellow Blood Oxygen Level (%):
              <input className="ManualTriggerModal-InputBox" type="number" value={data.Custom_Blood_Oxygen_Alert.YellowBloodOxygenLevel}/>
            </label>
          </div>


        </Modal.Body>
        <Modal.Footer className="ManualTriggerModal-Footer">
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">
            Set
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}
