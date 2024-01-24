import React, { useState } from 'react';
import './VitalCard.css'; 

function VitalCard({ title, data, children, children2}:{title:string, data:any, children: any, children2: any}) {
    const [isFlipped, setIsFlipped] = useState(false);

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
                {children2}
            </div>
        </div>
    );
}

export default VitalCard;
