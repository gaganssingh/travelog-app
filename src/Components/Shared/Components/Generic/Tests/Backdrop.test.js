jest.mock("react-dom");

import React from "react";
import { createPortal } from "react-dom";
import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";

class Backdrop extends React.Component {
    constructor(props) {
        super(props);
        this.BackdropContainer = document.createElement("div");
    }
    render() {
        return (
            <div>{createPortal(<div>hello</div>, this.BackdropContainer)}</div>
        );
    }
}

test("Backdrop renders", () => {
    const component = renderer.create(<Backdrop />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Check it returns a div", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Backdrop />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe("div");
    expect(result).toMatchSnapshot();
});
