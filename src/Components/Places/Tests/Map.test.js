jest.mock("react-dom");

import React from "react";
import { createPortal } from "react-dom";
import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.MapContainer = document.createElement("div");
    }
    render() {
        return <div>{createPortal(<div>hello</div>, this.MapContainer)}</div>;
    }
}

it("Map renders", () => {
    const component = renderer.create(<Map />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it("Check it returns a div", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Map />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe("div");
    expect(result).toMatchSnapshot();
});
