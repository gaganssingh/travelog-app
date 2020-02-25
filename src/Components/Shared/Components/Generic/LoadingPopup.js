import React from "react";

import "./LoadingPopup.css";

function LoadingPopup(props) {
    return (
        <div className={`${props.asOverlay && "loading-popup__overlay"}`}>
            <div className="loading-popup__spinner"></div>
        </div>
    );
}

export default LoadingPopup;
