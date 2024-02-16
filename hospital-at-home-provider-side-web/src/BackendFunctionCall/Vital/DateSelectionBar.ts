import React from "react";

export function selectTimeRange(days: number,
                                setStartDateTime: React.Dispatch<React.SetStateAction<string>>,
                                setStopDateTime: React.Dispatch<React.SetStateAction<string>>) {

  const startDateTimeTemp = new Date();
  startDateTimeTemp.setHours(0, 0, 0, 0);
  startDateTimeTemp.setDate(startDateTimeTemp.getDate() - days);
  setStartDateTime(startDateTimeTemp.toISOString());
  setStopDateTime(new Date().toISOString());
}
