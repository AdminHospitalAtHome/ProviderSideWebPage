export interface MultipleVitalDataInterface {
	bloodOxygen: any[][] | null;
	heartRate: any[][] | null;
	bloodPressure: any[][] | null;
	weight: any[][] | null;
}

export interface VitalDataInterface {
	bloodOxygen: string | null;
	heartRate: string | null;
	bloodPressure: string | null;
	weight: string | null;
}


export interface BaselineVitalInterface {
	bloodOxygen: number | null,
	heartRate: number | null,
	systolicBloodPressure: number | null,
    diastolicBloodPressure: number | null,
	weight: number | null
}
