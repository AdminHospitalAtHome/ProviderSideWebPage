import React, {useEffect, useState} from "react";
import Form from 'react-bootstrap/Form'
import SelectSearch from "react-select-search";
import 'react-select-search/style.css'
import {createNewThread, getPatients} from "../../BackendFunctionCall/Message";
import Button from "react-bootstrap/Button";
import {ChatClient, ChatThreadClient} from "@azure/communication-chat";


export default function ChatContactSearch({
                                            chatClient,
                                            providerCommunicationId,
                                            setThread,
                                            threadClients
                                          }: {
  chatClient: ChatClient,
  providerCommunicationId: string,
  setThread: React.Dispatch<React.SetStateAction<ChatThreadClient | undefined>>,
  threadClients: ChatThreadClient[]
}): React.JSX.Element {
  const [dropDownOptions, setDropDownOptions] = useState<{ name: string, value: number }[]>([])
  const [selectedPateint, setSelectedPatient] = useState<any>(null);

  useEffect(() => {
    getPatients().then(setDropDownOptions)
  }, [])


  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <SelectSearch onChange={setSelectedPatient} options={dropDownOptions} search></SelectSearch>
      <Button onClick={() => {
        createNewThread((selectedPateint as number), chatClient, providerCommunicationId, dropDownOptions, threadClients).then(setThread)
      }}>IMA BUTTON</Button>
    </div>
  );
}
