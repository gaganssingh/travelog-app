import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import UpdatePlace from "../UpdatePlace";

it("renders without crashing", () => {
    const originalError = console.error;
    console.error = jest.fn();
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <UpdatePlace />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
