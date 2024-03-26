import Card from 'react-bootstrap/Card'
import './PastAlertCard.css'
import {parseDateTime} from "../../BackendFunctionCall/Message";
import {useEffect, useState} from "react";
import {getAlertViews} from "../../BackendFunctionCall/socketAlerts/alertFunctions";
export default function PastAlertCard({ifRead, alertText,patientId,alertId,dateTime}: {
  ifRead: boolean,
  alertText: string,
  patientId: string,
  alertId:string,
  dateTime: string
}) {

  const [toggleViews,setToggleView] = useState(false);
  const [views, setViews] = useState<any[]>([]);

  useEffect(() => {
    if(toggleViews){
      getAlertViews(alertId).then(setViews);
    }
  },[toggleViews])
  return (
    <div>
    <Card className="AlertCard" onClick={() => {setToggleView(!toggleViews)}}>
      <Card.Title className="AlertCardTitle">Patient ID: {patientId}</Card.Title>
      <div className = "TextContainer">
        <Card.Text className= "AlertCardText">{ifRead ? '[Read]' : '[Unread]'}</Card.Text>
        <Card.Text className= "AlertCardText">{alertText}</Card.Text>
      </div>

      <Card.Footer>Time of Alert: {parseDateTime(dateTime)}</Card.Footer>
    </Card>

      {toggleViews && <div className="DropDownCard">

        {views.map((view)=>{
          return(
            <p key = {view.UniqueID} className = "AlertCardText">
              Viewed by {view.FirstName} {view.LastName} ({view.ProviderId}) on {parseDateTime(view.DateTimeViewed)}
            </p>
          )
        })}

      </div>}

    </div>
  )
}

