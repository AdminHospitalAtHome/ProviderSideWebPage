import React, {useEffect, useState} from "react";
import Form from 'react-bootstrap/Form'
import SelectSearch from "react-select-search";
import 'react-select-search/style.css'
import {createNewThread, getPatients} from "../../BackendFunctionCall/Message";
import Button from "react-bootstrap/Button";


export default function ChatContactSearch(): React.JSX.Element {
  const [dropDownOptions, setDropDownOptions] = useState<{name: string, value: number}[]>([])
  const [selectedPateint, setSelectedPatient] = useState<number>(0);

  useEffect(() => {
    getPatients().then(setDropDownOptions)
  }, [])


  return (
    <div style={{display: 'flex',flexDirection:'row'}}>
      <SelectSearch options={dropDownOptions} search></SelectSearch>
      <Button onClick={() => {createNewThread}}>IMA BUTTON</Button>
    </div>
    );
}
