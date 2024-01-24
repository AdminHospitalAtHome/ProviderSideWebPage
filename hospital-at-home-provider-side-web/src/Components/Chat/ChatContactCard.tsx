import {ChatThreadClient} from '@azure/communication-chat'
import Card from 'react-bootstrap/Card'
import {getParticipantInThread, getThreadLastMessage, parseDateTime} from "../../BackendFunctionCall/Message";
import React, {useEffect, useState} from "react";

export default function ChatContactCard({threadClient, providerCommunicationID, selected}: {
  threadClient: ChatThreadClient,
  providerCommunicationID: string,
  selected: boolean
}): React.JSX.Element {
  const [patientName, setPatientName] = useState<string | undefined>('')
  const [lastMessage, setLastMessage] = useState<any>(undefined)

  useEffect(() => {
      getParticipantInThread(threadClient, providerCommunicationID).then(setPatientName)
    }, [threadClient]
  )

  useEffect(() => {
      getThreadLastMessage(threadClient).then(setLastMessage)
  }, [threadClient])


  if (lastMessage) {
    return (<Card style={selected ? {margin: '5px', backgroundColor:'#c5d4fc'} : {margin:'5px'}}>
      <Card.Title>{patientName}</Card.Title>
      <Card.Text>{lastMessage.content.message}</Card.Text>
      <Card.Footer>{parseDateTime(String(lastMessage.createdOn))}</Card.Footer>
    </Card>)
  } else {
    return (<Card style={selected ? {margin: '5px', backgroundColor:'#c5d4fc'} : {margin:'5px'}}>
      <Card.Title>{patientName}</Card.Title>
      <Card.Text>Undefinded</Card.Text>
      <Card.Footer>Undefined</Card.Footer>
    </Card>)
  }

}
