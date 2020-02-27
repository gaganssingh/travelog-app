import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Modal from "../Modal";

it("renders without crashing", () => {
    const props = {};

    const ModalOverlay = (props) => {
        // Receive content to be displayed from the modal parent component
        // and display as required
        const content = (
            <div className={`modal ${props.className}`} style={props.style}>
                <header className={`modal__header ${props.headerClass}`}>
                    <h2>{props.header}</h2>
                </header>
                <form
                    onSubmit={
                        props.onSubmit
                            ? props.onSubmit
                            : (event) => event.preventDefault()
                    }
                >
                    <div className={`modal__content ${props.contentClass}`}>
                        {props.children}
                    </div>
                    <footer className={`modal__footer ${props.footerClass}`}>
                        {props.footer}
                    </footer>
                </form>
            </div>
        );
        return ReactDOM.createPortal(content, document.getElementById("modal"));
    };
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <Modal />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
