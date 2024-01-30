export function getAlertLevel(patientID: number): Promise<number[]> {
    // Returns array of alert levels in the following order:
    /*
        0. Weight
        1. Heart Rate
        2. Blood Oxygen
        3. Blood Pressure
     */
    return new Promise((resolve) => {
        fetch(
          `https://hosptial-at-home-js-api.azurewebsites.net/api/getAlertLevel?patientID=${patientID}`,
        )
          .then(res => res.json())
          .then(output => {
              if (output.length === 1) {
                  resolve([output[0].Weight_Level, output[0].Heart_Rate_Level, output[0].Blood_Oxygen_Level, output[0].Blood_Pressure_Level])
              } else {
                  resolve([-1, -1, -1, -1]); // -1 means no data
              }
          });
    });
}
