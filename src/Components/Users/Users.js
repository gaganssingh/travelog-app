import React, { useEffect, useState } from "react";
import { useHttpClient } from "../Shared/Hooks/RequestHook";
import ErrorPopup from "../Shared/Components/Generic/ErrorPopup";
import LoadingPopup from "../Shared/Components/Generic/LoadingPopup";
import ListOfUsers from "./ListOfUsers";
import "./Users.css";

function Users() {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/users`
                );

                setLoadedUsers(responseData.users);
            } catch (err) {}
        };
        fetchUsers();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <h1 className="users-heading center">
                Explore places by other users
            </h1>
            <ErrorPopup error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingPopup />
                </div>
            )}
            {!isLoading && loadedUsers && <ListOfUsers items={loadedUsers} />}
        </React.Fragment>
    );
}

export default Users;
