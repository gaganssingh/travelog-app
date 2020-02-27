import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import NavigationLinks from "../NavigationLinks";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <NavigationLinks />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
