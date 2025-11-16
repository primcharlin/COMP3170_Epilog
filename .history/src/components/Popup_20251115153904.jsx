import React from "react";
import "../popup.css";

const Popup = ({ message }) => {
    return (
        <div className="popup-container">
            <div className="popup-box">
                {message}
            </div>
        </div>
    );
};

export default Popup;
