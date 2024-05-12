export interface Patient {
	PatientID: number
	FirstName: string
	LastName: string
	DateOfBirth: string
	IfAccessibilityMode: boolean
	CommunicationId: string
	Gender: "Male" | "Female"
	Age: number
}

export interface Weight {
	UniqueID: number,
	PatientID: number,
	DateTimeTaken: string,
	WeightInPounds: number,
	IfManualInput: boolean
}

export interface BloodPressure {
	UniqueID: number,
	PatientID: number,
	DateTimeTaken: string,
	SystolicBloodPressureInMmHg: number,
	DiastolicBloodPressureInMmHg: number
	IfManualInput: boolean
}

export interface HeartRate {
	UniqueID: number,
	PatientID: number,
	DateTimeTaken: string,
	HeartRateInBPM: number
	IfManualInput: boolean
}

export interface BloodOxygen {
	UniqueID: number,
	PatientID: number,
	DateTimeTaken: string,
	BloodOxygenLevelInPercentage: number,
	IfManualInput: boolean
}

export interface PatientMedication {
	id: number,
	medicationName: string,
	amount: number,
	unit: "pill" | "mg" | "ml",
	type: string,
	frequency: number,
	startDate: string,
	endDate: string | undefined
}
