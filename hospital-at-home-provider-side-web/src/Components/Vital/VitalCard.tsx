import React, { useState } from 'react';
import './VitalCard.css';
import SingleLineChart from "../Chart/SingleLineChart"; // You should create a CSS file for this component

const labels1 = ["January", "February", "March", "April", "May", "June"];
const data1 = [0, 10, 5, 2, 20, 30, 45];

function VitalCard({title, data}:{title:string, data:any}) {
    const [isFlipped, setIsFlipped] = useState(false);
    console.log(data);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`vital-card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
            <div className="vital-card-front">
                <h3>{title}</h3>
            </div>
            <div className="vital-card-back">
                <h1>Chart</h1>
                <SingleLineChart labels={labels1} data={data1} label={"Vital Data"}/>
            </div>
        </div>
    );
}

export default VitalCard;
