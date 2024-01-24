export function getAlertLevel(vitalsData: any) {
    for (const vital in vitalsData) {
        if (vitalsData.hasOwnProperty(vital)) {
            const { baseLineVital, recentVitalData, range } = vitalsData[vital];
            let difference = Math.abs(baseLineVital - recentVitalData);
           
            if (difference > range) {
                return "red";
            }
        }
    }
    return "green";
}
