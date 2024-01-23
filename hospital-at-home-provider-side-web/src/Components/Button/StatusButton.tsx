import React from 'react';

// Define the props for the Button component
interface ButtonProps {
    color: string;
}

// A functional component that renders a button with the specified color
const StatusButton: React.FC<ButtonProps> = ({ color}) => {
    const styles = {
        backgroundColor: color,
        borderRadius: '50%', // Makes the button round
        width: '15px', // Sets the width of the button
        height: '15px', // Sets the height of the button
        border: 'none', // No border
        display: 'inline-block', // Allows buttons to sit side-by-side
        margin: '2px', // Adds some space between buttons
    };

    return <button style={styles}></button>;
};
export default StatusButton;
