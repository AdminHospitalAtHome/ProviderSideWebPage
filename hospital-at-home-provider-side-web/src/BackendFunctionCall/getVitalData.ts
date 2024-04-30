import {BloodOxygen, BloodPressure, HeartRate, Weight} from "../data";

export function getRecentBloodOxygen(patientID: number): Promise<string> {
    return new Promise((resolve, reject) => {
        fetch(
            `https://hosptial-at-home-js-api.azurewebsites.net/api/getRecentBloodOxygen?patientID=${patientID}`,
        )
            .then(res => res.json())
            .then(output => {
                if (output.length === 1) {
                    resolve(`${output[0].BloodOxygenLevelInPercentage}%`);
                } else {
                    resolve('N/A');
                }
            });
    });
}

export function getRecentBloodPressure(patientID: number): Promise<string> {
    return new Promise((resolve, reject) => {
        fetch(
            `https://hosptial-at-home-js-api.azurewebsites.net/api/getRecentBloodPressure?patientID=${patientID}`,
        )
            .then(res => res.json())
            .then(output => {
                if (output.length === 1) {
                    resolve(`${output[0].DiastolicBloodPressureInMmHg} - ${output[0].SystolicBloodPressureInMmHg}`);
                } else {
                    resolve('N/A');
                }
            });
    });
}

export function getRecentHeartRate(patientID: number): Promise<string> {
    return new Promise((resolve, reject) => {
        fetch(
            `https://hosptial-at-home-js-api.azurewebsites.net/api/getRecentHeartRate?patientID=${patientID}`,
        )
            .then(res => res.json())
            .then(output => {
                if (output.length === 1) {
                    resolve(`${output[0].HeartRateInBPM} BPM`);
                } else {
                    resolve('N/A');
                }
            });
    });
}

export function getRecentWeight(patientID: number): Promise<string> {
    return new Promise((resolve, reject) => {
        fetch(
            `https://hosptial-at-home-js-api.azurewebsites.net/api/getRecentWeight?patientID=${patientID}`,
        )
            .then(res => res.json())
            .then(output => {
                if (output.length === 1) {
                    resolve(`${output[0].WeightInPounds} lbs`);
                } else {
                    resolve('N/A');
                }
            });
    });
}

export function getRecentSpirometry(patientID: number): Promise<string>{
    return new Promise((resolve, reject) => {
    fetch(
      `https://hosptial-at-home-js-api.azurewebsites.net/api/getRecentSpirometry?patientID=${patientID}`,
    )
      .then(res => res.json())
      .then(output => {
          if (output.length === 1) {
              resolve(`${output[0].FEV1InLiters} L`);
          } else {
              resolve('N/A');
          }
      });
});
}

export default function timeTableParser(dateTime: string): string {
    var tempDateObject: Date = new Date(dateTime);
    tempDateObject.setMinutes(
        tempDateObject.getMinutes() - tempDateObject.getTimezoneOffset(),
    );
    var tmpDate = tempDateObject.toISOString().split('T')[0].split('-');
    const tmpDateString = tmpDate[1] + '-' + tmpDate[2] + '-' + tmpDate[0];
    var tmpTime = tempDateObject.toISOString().split('T')[1].split(':');
    var tmpHour = parseInt(tmpTime[0]);
    var tmpTimeString = '';
    if (tmpHour > 12) {
        tmpTimeString = String(tmpHour - 12) + ':' + tmpTime[1] + ' PM';
    } else if (tmpHour === 0) {
        tmpTimeString = String(tmpHour + 12) + ':' + tmpTime[1] + 'AM';
    } else {
        tmpTimeString = String(tmpHour) + ':' + tmpTime[1] + ' AM';
    }
    return tmpDateString + '\n' + tmpTimeString;
}

export function getBloodOxygen(
    patientID: number,
    startDateTime: string,
    stopDateTime: string,
): Promise<BloodOxygen[][]> {
    return fetch(
        `https://hosptial-at-home-js-api.azurewebsites.net/api/getBloodOxygen?patientID=${patientID}&startDateTime=${startDateTime}&stopDateTime=${stopDateTime}`,
    )
        .then(response => response.json())
        .then(json => parseBloodOxygenData(json));
}

export function parseBloodOxygenData(bloodOxygenJson: BloodOxygen[]): any[][] {
    let bloodOxygenArr = [];
    for (var i = 0; i < bloodOxygenJson.length; i++) {
        bloodOxygenArr.push([
            timeTableParser(bloodOxygenJson[i].DateTimeTaken),
            bloodOxygenJson[i].BloodOxygenLevelInPercentage,
            bloodOxygenJson[i].IfManualInput
        ]);
    }
    return bloodOxygenArr;
}

export function getBloodPressure(
    patientID: number,
    startDateTime: string,
    stopDateTime: string,
): Promise<any[][]> {
    return fetch(
        `https://hosptial-at-home-js-api.azurewebsites.net/api/getBloodPressure?patientID=${patientID}&startDateTime=${startDateTime}&stopDateTime=${stopDateTime}`,
    )
        .then(response => response.json())
        .then(json => parseBloodPressureData(json));
}

export function parseBloodPressureData(bloodPressureJSON: BloodPressure[]): any[][] {
    let bloodPressureArr = [];
    for (let i = 0; i < bloodPressureJSON.length; i++) {
        bloodPressureArr.push([
            timeTableParser(bloodPressureJSON[i].DateTimeTaken),
            bloodPressureJSON[i].SystolicBloodPressureInMmHg,
            bloodPressureJSON[i].DiastolicBloodPressureInMmHg,
            bloodPressureJSON[i].IfManualInput
        ]);
    }
    return bloodPressureArr;
}

export function getHeartRate(
    patientID: number,
    startDateTime: string,
    stopDateTime: string,
): Promise<HeartRate[][]> {
    return fetch(
        `https://hosptial-at-home-js-api.azurewebsites.net/api/getHeartRate?patientID=${patientID}&startDateTime=${startDateTime}&stopDateTime=${stopDateTime}`,
    )
        .then(response => response.json())
        .then(json => parseHeartRateData(json));
}

export function parseHeartRateData(heartRateJson: HeartRate[]): any[][] {
    let heartRateArr = [];
    for (let i = 0; i < heartRateJson.length; i++) {
        heartRateArr.push([
            timeTableParser(heartRateJson[i].DateTimeTaken),
            heartRateJson[i].HeartRateInBPM,
            heartRateJson[i].IfManualInput
        ]);
    }
    return heartRateArr;
}

export function getWeight(
    patientID: number,
    startDateTime: string,
    stopDateTime: string,
): Promise<Weight[][]> {
    return fetch(
        `https://hosptial-at-home-js-api.azurewebsites.net/api/getWeight?patientID=${patientID}&startDateTime=${startDateTime}&stopDateTime=${stopDateTime}`,
    )
        .then(response => response.json())
        .then(json => parseWeightData(json));
}

export function parseWeightData(weightJson: Weight[]): any[][] {
    let weightArr = [];
    for (let i = 0; i < weightJson.length; i++) {
        weightArr.push([
            timeTableParser(weightJson[i].DateTimeTaken),
            weightJson[i].WeightInPounds,
            weightJson[i].IfManualInput
        ]);
    }
    return weightArr;
}

export function getSpirometry(
  patientID: number,
  startDateTime: string,
  stopDateTime: string,
): Promise<any[][]> {
    return fetch(
      `https://hosptial-at-home-js-api.azurewebsites.net/api/getSpirometry?patientID=${patientID}&startDateTime=${startDateTime}&stopDateTime=${stopDateTime}`,
    )
      .then(response => response.json())
      .then(json => parseSpirometryData(json));
}

export function parseSpirometryData(spirometryJson: any): any[][] {
    let spirometryArr = [];
    for (let i = 0; i < spirometryJson.length; i++) {
        spirometryArr.push([
            timeTableParser(spirometryJson[i].DateTimeTaken),
            spirometryJson[i].FEV1InLiters,
            spirometryJson[i].FEV1_FVCInPercentage,
            spirometryJson[i].IfManualInput,
        ]);
    }
    return spirometryArr;
}

export function parseSpirometryForFEV1Chart(spirometryArr: any[][] | null): any[][] | null {
    let newSpirometryArr = [];
    if (spirometryArr) {
        for (let i = 0; i < spirometryArr.length; i++) {
            newSpirometryArr.push([spirometryArr[i][0], spirometryArr[i][1], spirometryArr[i][3]]);
        }
        return newSpirometryArr;
    } else {
        return null;
    }

}

export function parseSpirometryForFEV1_FVCChart(spirometryArr: any[][] | null): any[][] | null {
    let newSpirometryArr = [];
    if (spirometryArr) {
        for (let i = 0; i < spirometryArr.length; i++) {
            newSpirometryArr.push([spirometryArr[i][0], spirometryArr[i][2], spirometryArr[i][3]]);
        }
        return newSpirometryArr;
    } else {
        return null;
    }
}
