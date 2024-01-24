import {ChatThreadClient} from '@azure/communication-chat'
import Card from 'react-bootstrap/Card'
import {getParticipantInThread, getThreadLastMessage} from "../../BackendFunctionCall/Message";
import React, {useEffect, useState} from "react";

export default function ChatContactCard({threadClient, providerCommunicationID, selected}: {
  threadClient: ChatThreadClient,
  providerCommunicationID: string,
  selected: boolean
}): React.JSX.Element {
  const [patientName, setPatientName] = useState<string | undefined>('')
  const [lastMessage, setLastMessage] = useState<any>(undefined)

  useEffect(() => {
    try {
      getParticipantInThread(threadClient, providerCommunicationID).then(setPatientName)
    } catch (error){
      console.log(error)
    }

    }, [threadClient]
  )

  useEffect(() => {
    try{
      getThreadLastMessage(threadClient).then(setLastMessage)
    } catch {
      console.log("AHG")
    }

  }, [threadClient])


  console.log(lastMessage)

  if (lastMessage) {
    return (<Card style={selected ? {margin: '5px', backgroundColor:'#c5d4fc'} : {margin:'5px'}}>
      <Card.Title>{patientName}</Card.Title>
      <Card.Text>{lastMessage.content.message}</Card.Text>
      <Card.Footer>{String(lastMessage.createdOn)}</Card.Footer>
    </Card>)
  } else {
    return <div></div>
  }

}
