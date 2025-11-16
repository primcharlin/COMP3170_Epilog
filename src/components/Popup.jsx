import React, { useEffect } from "react";

const Popup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="popup-container">
      <div className="popup-box">{message}</div>
    </div>
  );
};

export default Popup;
