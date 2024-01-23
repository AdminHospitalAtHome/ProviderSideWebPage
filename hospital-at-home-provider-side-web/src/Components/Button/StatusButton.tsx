import React from 'react';

interface ButtonProps {
    color: string;
}


const StatusButton: React.FC<ButtonProps> = ({ color}) => {
    const styles = {
        backgroundColor: color,
        borderRadius: '50%',
        width: '15px',
        height: '15px',
        border: 'none',
        display: 'inline-block',
        margin: '2px',
    };

    return <button style={styles}></button>;
};
export default StatusButton;
