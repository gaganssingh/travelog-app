import React from "react";
import "./UserImage.css";

function UserImage(props) {
    return (
        <div className={`user-image ${props.className}`} style={props.style}>
            <img
                src={props.image}
                alt={props.alt}
                style={{ width: props.width, height: props.width }}
            />
        </div>
    );
}

export default UserImage;
