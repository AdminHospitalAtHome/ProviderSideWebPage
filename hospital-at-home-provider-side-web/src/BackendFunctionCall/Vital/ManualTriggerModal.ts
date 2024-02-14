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

export function getCurrentTriggers(patientID: number): Promise<object> {
  return new Promise((resolve) => {
    getManualTriggers(patientID).then(unparsedData => {
      let parsedData: Record<string, string> = {}
      // @ts-ignore
      if (unparsedData.length === 1 && unparsedData[0].Custom_Alert_Levels) {
        // @ts-ignore
        let data = JSON.parse(unparsedData[0].Custom_Alert_Levels)
        for (let key in data) {
          for (let innerKey in data[key]) {
            parsedData[`${key}.${innerKey}`] = data[key][innerKey].toString()
          }
        }
      }
      resolve(parsedData);
    })
  })

}

export function updateCurrentAlertLevelTriggers(vitalType: string, vitalValue: string, value: string, setter: React.Dispatch<React.SetStateAction<CurrentAlertLevelData>>) {
  setter(prevState => {
    // prevState[vitalType][vitalValue] = value
    prevState.Custom_Weight_Alert.Red_Day_Frame = value
    console.log(prevState[vitalType][vitalValue])
    return prevState

  })
}

export function uploadNewTriggerLevels(data: object, patientID: number) {
  console.log(patientID)
  let subFields: Record<string, object> = {};
  for (const [i, value] of Object.entries(data)) {
    if (value === "") {
      continue;
    }
    let keys = i.split(".");
    if (!(keys[0] in subFields)) {
      console.log("Key[0] ! in", keys[0])
      Object.defineProperty(subFields, keys[0], {value: {}, enumerable: true})
    }
    Object.defineProperty(subFields[keys[0]], keys[1], {value: value, enumerable: true})
  }

  console.log("Custom_Blood_Oxygen_Alert: ", subFields["Custom_Blood_Oxygen_Alert"])
  console.log("Custom_Blood_Oxygen_Alert String: ", JSON.stringify(subFields))


  fetch(`https://hosptial-at-home-js-api.azurewebsites.net/api/setManualAlertTriggers?PatientID=${patientID}`, {
    method: 'POST',
    body: `{"JsonData": ${JSON.stringify(subFields)}}`
  }).then().catch()
}

export interface CurrentAlertLevelData {
  [keys: string]: Custom_Weight_Alert | Custom_Heart_Rate_Alert | Custom_Blood_Pressure_Alert | Custom_Blood_Oxygen_Alert,
  Custom_Weight_Alert: Custom_Weight_Alert,
  Custom_Heart_Rate_Alert: Custom_Heart_Rate_Alert,
  Custom_Blood_Pressure_Alert: Custom_Blood_Pressure_Alert,
  Custom_Blood_Oxygen_Alert: Custom_Blood_Oxygen_Alert,
}

export interface Custom_Weight_Alert {
  [keys: string]: string,
  Red_Day_Frame: string,
  Red_Weight_Change: string,
  Yellow_Day_Frame: string,
  Yellow_Weight_Change: string,
}

export interface Custom_Heart_Rate_Alert {
  [keys: string]: string,
  Red_Heart_Rate: string,
  Yellow_Heart_Rate: string,
}

export interface Custom_Blood_Pressure_Alert {
  [keys: string]: string,
  RedSystolicBP: string,
  RedDiastolicBP: string,
  YellowSystolicBP: string,
  YellowDiastolicBP: string,
}

export interface Custom_Blood_Oxygen_Alert {
  [keys: string]: string,
  RedBloodOxygenLevel: string,
  YellowBloodOxygenLevel: string,
}

// Just to keep it from being undefined. Should never be seen
export let loadingCurrentAlertLevelData: CurrentAlertLevelData = {
  Custom_Weight_Alert: {
    Red_Day_Frame: '',
    Red_Weight_Change: '',
    Yellow_Day_Frame: '',
    Yellow_Weight_Change: '',
  },
  Custom_Heart_Rate_Alert: {
    Red_Heart_Rate: '',
    Yellow_Heart_Rate: '',
  },
  Custom_Blood_Pressure_Alert: {
    RedSystolicBP: '',
    RedDiastolicBP: '',
    YellowSystolicBP: '',
    YellowDiastolicBP: '',
  },
  Custom_Blood_Oxygen_Alert: {
    RedBloodOxygenLevel: '',
    YellowBloodOxygenLevel: '',
  },
}
