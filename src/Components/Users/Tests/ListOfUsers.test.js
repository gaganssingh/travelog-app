import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ListOfUsers from "../ListOfUsers";

it("renders without crashing", () => {
    const props = {
        items: [
            {
                id: 1,
                name: "test",
                email: "test@test.com",
                pass:
                    "$2a$12$5lZIXjUpKOe04nWlp7/0POl0Be2AGMhAnk9/oBXf7kdz57T8BgQrO"
            },
            {
                id: 2,
                name: "test2",
                email: "test2@test.com",
                pass:
                    "$2a$12$C/Ftm/O3HQ.cQjrerANQAu06GvCdksfuxG5QoninrIktokcFZPVS."
            }
        ]
    };

    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <ListOfUsers {...props} />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
