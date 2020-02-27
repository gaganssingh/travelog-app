jest.mock("react-dom");

import React from "react";
import { createPortal } from "react-dom";
import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";

class Place extends React.Component {
    constructor(props) {
        super(props);
        this.PlaceContainer = document.createElement("div");
    }
    render() {
        return <div>{createPortal(<div>hello</div>, this.PlaceContainer)}</div>;
    }
}

it("Place renders", () => {
    const component = renderer.create(<Place />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it("Check it returns a div", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Place />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe("div");
    expect(result).toMatchSnapshot();
});
