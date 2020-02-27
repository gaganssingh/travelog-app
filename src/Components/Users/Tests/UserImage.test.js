import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import UserImage from "../UserImage";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <UserImage />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
