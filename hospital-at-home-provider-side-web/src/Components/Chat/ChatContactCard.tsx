import {ChatThreadClient} from '@azure/communication-chat'
import Card from 'react-bootstrap/Card'
import {getParticipantInThread, getThreadLastMessage} from "../../BackendFunctionCall/Message";
import React, {useEffect, useState} from "react";

export default function ChatContactCard({threadClient: chatThreadClient, providerCommunicationID}: {
  threadClient: ChatThreadClient,
  providerCommunicationID: string
}): React.JSX.Element {
  const [patientName, setPatientName] = useState<string | undefined>('')
  const [lastMessage, setLastMessage] = useState<any>(undefined)

  useEffect(() => {
      getParticipantInThread(chatThreadClient, providerCommunicationID).then(setPatientName)
    }, [chatThreadClient]
  )

  useEffect(() => {
    getThreadLastMessage(chatThreadClient).then(setLastMessage)
  }, [chatThreadClient])


  if (lastMessage) {
    return (<Card style={{margin: '5px'}}>
      <Card.Title>{patientName}</Card.Title>
      <Card.Text>{lastMessage.content.message}</Card.Text>
      <Card.Footer>{String(lastMessage.createdOn)}</Card.Footer>
    </Card>)
  } else {
    return <div></div>
  }

}
