import Modal from "react-bootstrap/Modal";
import React, {useState} from "react";
import "./ManualTriggerModal.css";
import Button from "react-bootstrap/Button";

import {
  getCurrentTriggers,
  uploadNewTriggerLevels
} from "../../BackendFunctionCall/Vital/ManualTriggerModal";


export default function ManualTriggerModal({patientID}: {patientID: number}) {
  // Heavily Pulled From The Following:
  // https://stackoverflow.com/questions/43067719/how-to-allow-only-numbers-in-textbox-in-reactjs
  // https://medium.com/@amitsharma_24072/handling-multiple-inputs-in-reactjs-best-practices-for-react-js-input-forms-9b973f4beb7e

  const [show, setShow] = useState(false);
  // We tried to use an interface to handle definition for us, but React forms are buggy and didnt like that...
  // These values have the defaults so if it does not exist, it is override.
  const presetData = {
    "Custom_Weight_Alert.Red_Day_Frame": "3",
    "Custom_Weight_Alert.Red_Weight_Change": "3",
    "Custom_Weight_Alert.Yellow_Day_Frame": "5",
    "Custom_Weight_Alert.Yellow_Weight_Change": "3",

    "Custom_Heart_Rate_Alert.Red_Heart_Rate": "120",
    "Custom_Heart_Rate_Alert.Yellow_Heart_Rate": "100",

    "Custom_Blood_Pressure_Alert.RedSystolicBP": "180",
    "Custom_Blood_Pressure_Alert.RedDiastolicBP": "100",
    "Custom_Blood_Pressure_Alert.YellowSystolicBP": "150",
    "Custom_Blood_Pressure_Alert.YellowDiastolicBP": "90",

    "Custom_Blood_Oxygen_Alert.RedBloodOxygenLevel": "85",
    "Custom_Blood_Oxygen_Alert.YellowBloodOxygenLevel": "88",
  }
  const [data, setData] = useState(presetData)

  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)){
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="patient-card-setManualTriggersButton-container">
        <button className="patient-card-setManualTriggersButton" onClick={() => {
          getCurrentTriggers(patientID).then((tmp) => {
            setData(prevState => {
              let newObject = {...presetData, ...tmp}
              return newObject;
            })

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
              <input className="ManualTriggerModal-InputBox"
                     value={data["Custom_Weight_Alert.Red_Day_Frame"]}
                     name="Custom_Weight_Alert.Red_Day_Frame"
                     onChange={handleInputChange}
                     placeholder={'0'}

              />
            </label>
            <label className="ManualTriggerModal-Label">
              Red Weight Change (Pounds):
              <input className="ManualTriggerModal-InputBox"
                     value={data["Custom_Weight_Alert.Red_Weight_Change"]}
                     name="Custom_Weight_Alert.Red_Weight_Change"
                     onChange={handleInputChange}
                     placeholder={'0'}

              />
            </label>
            <label className="ManualTriggerModal-Label">
              Red Weight Time Frame (Days):
              <input className="ManualTriggerModal-InputBox"
                     value={data["Custom_Weight_Alert.Yellow_Day_Frame"]}
                     name="Custom_Weight_Alert.Yellow_Day_Frame"
                     onChange={handleInputChange}
                     placeholder={'0'}

              />
            </label>
            <label className="ManualTriggerModal-Label">
              Red Weight Change (Pounds):
              <input className="ManualTriggerModal-InputBox"
                     value={data["Custom_Weight_Alert.Yellow_Weight_Change"]}
                     name="Custom_Weight_Alert.Yellow_Weight_Change"
                     onChange={handleInputChange}
                     placeholder={'0'}

              />
            </label>
          </div>

          <div className="ManualTriggerModal-VitalGroup">
            <h5>
              Heart Rate
            </h5>
            <label className="ManualTriggerModal-Label">
              Red Heart Rate (Beats Per Second):
              <input className="ManualTriggerModal-InputBox"
                     value={data["Custom_Heart_Rate_Alert.Red_Heart_Rate"]}
                     name="Custom_Heart_Rate_Alert.Red_Heart_Rate"
                     onChange={handleInputChange}
                     placeholder={'0'}

              />
            </label>
            <label className="ManualTriggerModal-Label">
              Yellow Heart Rate (Beats Per Second):
              <input className="ManualTriggerModal-InputBox"
                     value={data["Custom_Heart_Rate_Alert.Yellow_Heart_Rate"]}
                     name="Custom_Heart_Rate_Alert.Yellow_Heart_Rate"
                     onChange={handleInputChange}
                     placeholder={'0'}

              />
            </label>
          </div>

          <div className="ManualTriggerModal-VitalGroup">
            <h5>
              Blood Pressure
            </h5>
            <label className="ManualTriggerModal-Label">
              Red Systolic Blood Pressure (mmHg):
              <input className="ManualTriggerModal-InputBox"
                     value={data["Custom_Blood_Pressure_Alert.RedSystolicBP"]}
                     name="Custom_Blood_Pressure_Alert.RedSystolicBP"
                     onChange={handleInputChange}
                     placeholder={'0'}

              />
            </label>
            <label className="ManualTriggerModal-Label">
              Red Diastolic Blood Pressure (mmHg):
              <input className="ManualTriggerModal-InputBox"
                     value={data["Custom_Blood_Pressure_Alert.RedDiastolicBP"]}
                     name="Custom_Blood_Pressure_Alert.RedDiastolicBP"
                     onChange={handleInputChange}
                     placeholder={'0'}

              />
            </label>
            <label className="ManualTriggerModal-Label">
              Yellow Systolic Blood Pressure (mmHg):
              <input className="ManualTriggerModal-InputBox"
                     value={data["Custom_Blood_Pressure_Alert.YellowSystolicBP"]}
                     name="Custom_Blood_Pressure_Alert.YellowSystolicBP"
                     onChange={handleInputChange}
                     placeholder={'0'}

              />
            </label>
            <label className="ManualTriggerModal-Label">
              Yellow Diastolic Blood Pressure (mmHg):
              <input className="ManualTriggerModal-InputBox"
                     value={data["Custom_Blood_Pressure_Alert.YellowDiastolicBP"]}
                     name="Custom_Blood_Pressure_Alert.YellowDiastolicBP"
                     onChange={handleInputChange}
                     placeholder={'0'}

              />
            </label>
          </div>

          <div className="ManualTriggerModal-VitalGroup">
            <h5>
              Blood Oxygen
            </h5>
            <label className="ManualTriggerModal-Label">
              Red Blood Oxygen Level (%):
              <input className="ManualTriggerModal-InputBox"
                     value={data["Custom_Blood_Oxygen_Alert.RedBloodOxygenLevel"]}
                     name="Custom_Blood_Oxygen_Alert.RedBloodOxygenLevel"
                     onChange={handleInputChange}
                     placeholder={'0'}

              />
            </label>
            <label className="ManualTriggerModal-Label">
              Yellow Blood Oxygen Level (%):
              <input className="ManualTriggerModal-InputBox"
                     value={data["Custom_Blood_Oxygen_Alert.YellowBloodOxygenLevel"]}
                     name="Custom_Blood_Oxygen_Alert.YellowBloodOxygenLevel"
                     onChange={handleInputChange}
                     placeholder={'0'}

              />
            </label>
          </div>


        </Modal.Body>
        <Modal.Footer className="ManualTriggerModal-Footer">
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            uploadNewTriggerLevels(data, patientID)
            handleClose()
          }}>
            Set
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}
