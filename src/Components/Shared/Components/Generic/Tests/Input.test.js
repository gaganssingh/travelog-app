import React, { useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Auth from "../../../../Auth/Auth";
import Input from "../Input";

const onInput = jest.fn();
it("renders without crashing", () => {
    const props = {
        onInput: {
            id: "",
            value: "",
            isValid: true
        }
    };

    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <Input {...props} onInput={onInput} />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
