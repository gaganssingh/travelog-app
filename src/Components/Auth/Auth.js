import React, { useState, useContext } from "react";
import { AuthContext } from "../Shared/Context/AuthContext";
import { useForm } from "../Shared/Hooks/FormsHook";
import { useHttpClient } from "../Shared/Hooks/RequestHook";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from "../Shared/Validation/Validation";
import Button from "../Shared/Components/Generic/Button";
import Input from "../Shared/Components/Generic/Input";
import Card from "../Shared/Components/Generic/Card";
import ErrorPopup from "../Shared/Components/Generic/ErrorPopup";
import LoadingPopup from "../Shared/Components/Generic/LoadingPopup";
import "./Auth.css";

function Auth() {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: "",
                isValid: false
            },
            password: {
                value: "",
                isValid: false
            }
        },
        false
    );

    const handleButtonSwitch = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: "",
                        isValid: false
                    }
                },
                false
            );
        }
        setIsLoginMode((prevMode) => !prevMode);
    };

    const authSubmitHandler = async (event) => {
        event.preventDefault();
        if (isLoginMode) {
            try {
                // LOGIN existing users
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
                    "POST",
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        "Content-Type": "application/json"
                    }
                );
                auth.login(responseData.userId, responseData.token);
            } catch (err) {}
        } else {
            try {
                // SIGNUP new users
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`,
                    "POST",
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        "Content-Type": "application/json"
                    }
                );
                auth.login(responseData.userId, responseData.token);
            } catch (err) {}
        }
    };

    return (
        <React.Fragment>
            <ErrorPopup error={error} onClear={clearError} />
            <Card className="authentication">
                {isLoading && <LoadingPopup asOverlay />}
                <h2>Login Required</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && (
                        <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Your Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a name."
                            onInput={inputHandler}
                        />
                    )}
                    <Input
                        element="input"
                        id="email"
                        type="email"
                        label="E-Mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address."
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="password"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="Please enter a valid password, at least 6 characters."
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        {isLoginMode ? "LOGIN" : "SIGNUP"}
                    </Button>
                </form>
                <Button inverse onClick={handleButtonSwitch}>
                    SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
                </Button>
                <div className="authentication-demo">
                    <h4>Looking for DEMO credentials?</h4>
                    <p>
                        E-mail: <span>test@test.com</span>
                    </p>
                    <p>
                        password: <span>demopassword</span>
                    </p>
                </div>
            </Card>
        </React.Fragment>
    );
}

export default Auth;
