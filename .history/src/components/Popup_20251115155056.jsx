import React from "react";
import "../App.css";

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
