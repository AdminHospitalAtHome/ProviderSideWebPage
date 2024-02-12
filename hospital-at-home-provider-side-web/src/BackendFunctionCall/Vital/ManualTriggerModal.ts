import React from "react";

function getManualTriggers(patientID: number) {
  return new Promise((resolve) => {
    fetch(`https://hosptial-at-home-js-api.azurewebsites.net/api/getManualAlertTriggers?patientID=${patientID}`)
      .then(res => res.json())
      .then(output => resolve(output))
      .catch(() => {
        resolve([{}])
      })
  })
}

export function getCurrentTriggers(patientID: number): Promise<CurrentAlertLevelData> {
  return new Promise((resolve) => {
    getManualTriggers(patientID).then(unparsedData => {
      resolve(loadingCurrentAlertLevelData);
    })
  })

}

// export function updateCurrentAlertLevelTriggers(path: string, value: number, setter: React.Dispatch<React.SetStateAction<CurrentAlertLevelData>>) {
//   setter(prevState => {
//     prevState[path][path] = value
//     return prevState
//
//   })
// }

export interface CurrentAlertLevelData {
  // [keys: string]: object,
  Custom_Weight_Alert: {
    [keys: string]: number,
    Red_Day_Frame: number,
    Red_Weight_Change: number,
    Yellow_Day_Frame: number,
    Yellow_Weight_Change: number,
  },
  Custom_Heart_Rate_Alert: {

      Red_Heart_Rate: number,
      Yellow_Heart_Rate: number,
  },
  Custom_Blood_Pressure_Alert: {
      RedSystolicBP: number,
      RedDiastolicBP: number,
      YellowSystolicBP: number,
      YellowDiastolicBP: number,
  },
  Custom_Blood_Oxygen_Alert: {
      RedBloodOxygenLevel: number,
      YellowBloodOxygenLevel: number,
  },
}

// Just to keep it from being undefined. Should never be seen
export const loadingCurrentAlertLevelData: CurrentAlertLevelData = {
  Custom_Weight_Alert: {
    Red_Day_Frame: -1,
      Red_Weight_Change: -1,
      Yellow_Day_Frame: -1,
      Yellow_Weight_Change: -1,
  },
  Custom_Heart_Rate_Alert: {
    Red_Heart_Rate: -1,
      Yellow_Heart_Rate: -1,
  },
  Custom_Blood_Pressure_Alert: {
    RedSystolicBP: -1,
      RedDiastolicBP: -1,
      YellowSystolicBP: -1,
      YellowDiastolicBP: -1,
  },
  Custom_Blood_Oxygen_Alert: {
    RedBloodOxygenLevel: -1,
      YellowBloodOxygenLevel: -1,
  },
}
