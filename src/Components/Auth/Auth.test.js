import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Auth from "./Auth";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <Auth />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
