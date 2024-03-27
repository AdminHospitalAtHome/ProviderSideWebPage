import React, {useEffect, useState} from "react";
import './AlertsPage.css'
import PastAlertCard from "../Components/AlertsInformation/PastAlertCard";
import {getAlertViews, getHistoricalAlerts} from "../BackendFunctionCall/socketAlerts/alertFunctions";

export default function AlertsPage(): React.JSX.Element {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(()=>{
    getHistoricalAlerts().then(setAlerts)
  }, [])
  return(
    <div className="AlertsPageContainer">
      {alerts.map((alert) => {
        return (
          <div key={alert.GeneratedID}>
            <PastAlertCard ifRead={alert.HasBeenViewed} alertText={alert.AlertString} patientId={alert.PatientID} alertId={alert.GeneratedID} dateTime={alert.DateTimeTriggered}/>
          </div>

        )
      })}

    </div>

  );
}
