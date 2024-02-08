import React from 'react';
import './DateSelectionBar.css';

interface DateSelectionBarProps {
    setStartDateTime: React.Dispatch<React.SetStateAction<string>>;
    setStopDateTime: React.Dispatch<React.SetStateAction<string>>;
}

const DateSelectionBar: React.FC<DateSelectionBarProps> = ({
                                                               setStartDateTime,
                                                               setStopDateTime,
                                                           }) => {
    const selectTimeRange = (days: number) => {
        const startDateTimeTemp = new Date();
        startDateTimeTemp.setHours(0, 0, 0, 0);
        startDateTimeTemp.setDate(startDateTimeTemp.getDate() - days);
        setStartDateTime(startDateTimeTemp.toISOString());
        setStopDateTime(new Date().toISOString());
    };

    return (
        <div className="dateSelectionContainer">
            <button
                className="dateSelectionButton"
                onClick={() => selectTimeRange(1)}
            >
                Day
            </button>
            <button
                className="dateSelectionButton middleButton"
                onClick={() => selectTimeRange(7)}
            >
                Week
            </button>
            <button
                className="dateSelectionButton"
                onClick={() => selectTimeRange(30)}
            >
                Month
            </button>
        </div>
    );
};

export default DateSelectionBar;
