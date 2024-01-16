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