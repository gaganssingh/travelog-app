import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import User from "../User";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <User />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
