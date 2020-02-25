import React from "react";
import User from "./User";
import Card from "../Shared/Components/Generic/Card";
import "./ListOfUsers.css";

function ListOfUsers(props) {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No users found.</h2>
                </Card>
            </div>
        );
    }

    return (
        <ul className="users-list">
            {props.items.map((user) => (
                <User key={user.id} id={user.id} name={user.name} />
            ))}
        </ul>
    );
}

export default ListOfUsers;
