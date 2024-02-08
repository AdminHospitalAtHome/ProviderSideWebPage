export default function getDefaultStartTime(): string {
    var startDateTimeTemp = new Date();
    startDateTimeTemp.setHours(0, 0, 0, 0);
    // startDateTimeTemp.setDate(startDateTimeTemp.getDate() - 7);
    startDateTimeTemp.setMonth(startDateTimeTemp.getMonth() - 1);
    return startDateTimeTemp.toISOString();
  }
  