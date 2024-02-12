import React from 'react';
import './DateSelectionBar.css';
import {selectTimeRange} from "../../BackendFunctionCall/Vital/DateSelectionBar";



export default function DateSelectionBar({setStartDateTime, setStopDateTime}: {
  setStartDateTime: React.Dispatch<React.SetStateAction<string>>,
  setStopDateTime: React.Dispatch<React.SetStateAction<string>>
}) {

    return (
        <div className="dateSelectionContainer">
            <button
                className="dateSelectionButton"
                onClick={() => selectTimeRange(1, setStartDateTime, setStopDateTime)}
            >
                Day
            </button>
            <button
                className="dateSelectionButton middleButton"
                onClick={() => selectTimeRange(7, setStartDateTime, setStopDateTime)}
            >
                Week
            </button>
            <button
                className="dateSelectionButton"
                onClick={() => selectTimeRange(30, setStartDateTime, setStopDateTime)}
            >
                Month
            </button>
        </div>
    );
};
