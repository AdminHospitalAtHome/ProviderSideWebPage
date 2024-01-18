import React, { useState } from 'react';
import './VitalCard.css'; // You should create a CSS file for this component

function VitalCard({ title, data}:{title:string, data:any}) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`vital-card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
            <div className="vital-card-front">
                <h3>{title}</h3>
            </div>
            <div className="vital-card-back">
            </div>
        </div>
    );
}

export default VitalCard;
