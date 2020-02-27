jest.mock("react-dom");
import React from "react";
import { createPortal } from "react-dom";
import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import ReactDOM from "react-dom";

class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this.DrawerContainer = document.createElement("div");
    }
    render() {
        return (
            <div>{createPortal(<div>hello</div>, this.DrawerContainer)}</div>
        );
    }
}

test("Drawer renders", () => {
    const component = renderer.create(<Drawer />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Check it returns a div", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Drawer />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe("div");
    expect(result).toMatchSnapshot();
});
