import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import LoadingPopup from "../LoadingPopup";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <LoadingPopup />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
