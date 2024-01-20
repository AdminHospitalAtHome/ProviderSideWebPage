import React, { useState } from 'react';
import './VitalCard.css'; // You should create a CSS file for this component
import SingleLineChart from '../Chart/SingleLineChart';

function VitalCard({ title, data, children}:{title:string, data:any, children: any}) {
    const [isFlipped, setIsFlipped] = useState(false);
    console.log(data);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`vital-card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
            <div className="vital-card-front">
                <h3>{title}</h3>
                {children}
            </div>
            <div className="vital-card-back">
                <h1>Chart</h1>
            </div>
        </div>
    );
}

export default VitalCard;
