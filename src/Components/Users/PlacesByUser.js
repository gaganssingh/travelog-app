import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../Shared/Hooks/RequestHook";
import ErrorPopup from "../Shared/Components/Generic/ErrorPopup";
import LoadingPopup from "../Shared/Components/Generic/LoadingPopup";
import ListOfPlaces from "../Places/ListOfPlaces";

function PlacesByUser() {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const userId = useParams().userId;
    useEffect(() => {
        // Fetch request to the database for a list of
        // all places by the selected user
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/places/user/${userId}`
                );
                setLoadedPlaces(responseData.places);
            } catch (err) {}
        };
        fetchPlaces();
    }, [sendRequest, userId]);

    const deletePlaceHandler = (deletedPlaceId) => {
        setLoadedPlaces((prevPlaces) =>
            prevPlaces.filter((place) => place.id !== deletedPlaceId)
        );
    };

    return (
        <React.Fragment>
            <ErrorPopup error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingPopup />
                </div>
            )}
            {!isLoading && loadedPlaces && (
                <ListOfPlaces
                    items={loadedPlaces}
                    onDeletePlace={deletePlaceHandler}
                />
            )}
        </React.Fragment>
    );
}

export default PlacesByUser;
