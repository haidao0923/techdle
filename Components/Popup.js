import React from "react";
import "../CSS/Popup.css";

function Popup(props) {
  return (props.isActive) ? (
    <div className="popup">
      <div className="popup-inner">
        {props.children}
      </div>
    </div>
  ) : "";
}

export default Popup;