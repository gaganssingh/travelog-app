import React, { useState, useContext } from "react";
import { AuthContext } from "../Shared/Context/AuthContext";
import { useHttpClient } from "../Shared/Hooks/RequestHook";
import Button from "../Shared/Components/Generic/Button";
import Card from "../Shared/Components/Generic/Card";
import ErrorPopup from "../Shared/Components/Generic/ErrorPopup";
import LoadingPopup from "../Shared/Components/Generic/LoadingPopup";
import Modal from "../Shared/Components/Generic/Modal";
import Map from "./Map";
import "./Place.css";

function Place(props) {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const showDeleteWarning = () => {
        setShowConfirmModal(true);
    };

    const cancelDeletion = () => {
        setShowConfirmModal(false);
    };

    const confirmDeletion = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/places/${props.id}`,
                "DELETE",
                null,
                {
                    Authorization: "Bearer " + auth.token
                }
            );
            props.onDelete(props.id);
        } catch (err) {}
    };

    return (
        <React.Fragment>
            <ErrorPopup error={error} onClear={clearError} />
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeletion}
                header="Are you sure?"
                footerClass="place__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeletion}>
                            CANCEL
                        </Button>
                        <Button danger onClick={confirmDeletion}>
                            DELETE
                        </Button>
                    </React.Fragment>
                }
            >
                <p>
                    Really delete this place? Your place will be lost forever.
                </p>
            </Modal>
            <li className="place">
                <Card className="place__content">
                    {isLoading && <LoadingPopup asOverlay />}
                    <div className="map-container">
                        <Map center={props.coordinates} zoom={16} />
                    </div>
                    {/* </div> */}
                    <div className="place__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place__actions">
                        <Button inverse>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${props.coordinates.lat},${props.coordinates.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                VIEW ON GOOGLE
                            </a>
                        </Button>
                        {auth.userId === props.creatorId && (
                            <Button to={`/places/${props.id}`}>EDIT</Button>
                        )}

                        {auth.userId === props.creatorId && (
                            <Button danger onClick={showDeleteWarning}>
                                DELETE
                            </Button>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
}

export default Place;
