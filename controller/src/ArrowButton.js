// ArrowButton.js
import React from "react";
import {
    PiArrowSquareDownFill,
    PiArrowSquareDownLeftFill,
    PiArrowSquareDownRightFill,
    PiArrowSquareUpFill,
    PiArrowSquareUpLeftFill,
    PiArrowSquareUpRightFill,
} from "react-icons/pi";
import { FaCircleStop } from "react-icons/fa6";

function ArrowButton({ direction, message, address }) {
    // frontend.js
    const handleClick = () => {
        fetch("http://" + address + ":3030/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Message sent successfully:", data);
            })
            .catch((error) => {
                console.error(
                    "There was a problem sending the message:",
                    error
                );
            });
    };

    const iconStyle = {
        width: "80%", // Adjust the icon size to fill most of the button
        height: "80%", // Adjust the icon size to fill most of the button
    };
    // Map direction to corresponding icon component
    const iconMap = {
        "left-forward": <PiArrowSquareUpLeftFill style={iconStyle} />,
        forward: <PiArrowSquareUpFill style={iconStyle} />,
        "right-forward": <PiArrowSquareUpRightFill style={iconStyle} />,
        "left-backward": <PiArrowSquareDownLeftFill style={iconStyle} />,
        backward: <PiArrowSquareDownFill style={iconStyle} />,
        "right-backward": <PiArrowSquareDownRightFill style={iconStyle} />,
        stop: <FaCircleStop style={iconStyle} />,
    };
    // Define styles for the button and icon
    const buttonStyle = {
        width: "100px", // Adjust the width as needed
        height: "100px", // Adjust the height as needed
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0", // Background color of the button
        border: "none",
        borderRadius: "8px", // Add rounded corners for a nicer look
    };

    return (
        <button
            className={`arrow-button ${direction}`}
            style={buttonStyle}
            onClick={handleClick}
        >
            {iconMap[direction]}
        </button>
    );
}

export default ArrowButton;
