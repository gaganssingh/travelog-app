import React from "react";
import { Link } from "react-router-dom";
import Card from "../Shared/Components/Generic/Card";
import UserImage from "./UserImage";
import "./User.css";

function User(props) {
    return (
        <li className="user">
            <Card className="user__content">
                <Link to={`/${props.id}/places`}>
                    <div className="user-item__image">
                        <UserImage
                            image={`https://avatars.dicebear.com/v2/human/${props.name}.svg?options[mood][]=happy`}
                            alt={props.name}
                        />
                    </div>
                    <div className="user__info">
                        <h2>{props.name}</h2>
                        <h4>See all places by {props.name}</h4>
                    </div>
                </Link>
            </Card>
        </li>
    );
}

export default User;
