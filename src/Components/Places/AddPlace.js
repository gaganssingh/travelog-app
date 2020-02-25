import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Shared/Context/AuthContext";
import { useForm } from "../Shared/Hooks/FormsHook";
import { useHttpClient } from "../Shared/Hooks/RequestHook";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from "../Shared/Validation/Validation";
import Button from "../Shared/Components/Generic/Button";
import Input from "../Shared/Components/Generic/Input";
import ErrorPopup from "../Shared/Components/Generic/ErrorPopup";
import LoadingPopup from "../Shared/Components/Generic/LoadingPopup";
import "./GeneralPlaceStyles.css";

function AddPlace() {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false
            },
            description: {
                value: "",
                isValid: false
            },
            address: {
                value: "",
                isValid: false
            }
        },
        false
    );

    const history = useHistory();

    const placeSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/places`,
                "POST",
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    address: formState.inputs.address.value,
                    userId: auth.userId
                }),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token
                }
            );
            history.push(`/${auth.userId}/places`);
        } catch (err) {}
    };

    return (
        <React.Fragment>
            <ErrorPopup error={error} onClear={clearError} />
            <form className="place-form" onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingPopup asOverlay />}
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (at least 5 characters)."
                    onInput={inputHandler}
                />
                <Input
                    id="address"
                    element="input"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid address."
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    ADD PLACE
                </Button>
            </form>
        </React.Fragment>
    );
}

export default AddPlace;
