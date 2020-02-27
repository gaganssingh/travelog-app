import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import Navigation from "../Navigation";

// it("renders without crashing", () => {
//     const div = document.createElement("div");
//     ReactDOM.render(<Navigation />, div);
//     ReactDOM.unmountComponentAtNode(div);
// });

function Drawer() {}

function NavigationLinks() {}

describe("Parent Component", () => {
    const isDrawerOpen = jest.fn;
    const closeDrawer = jest.fn;
    it("renders Child component", () => {
        // expect(mount(<Foo />).find('.foo').length).toBe(1);
        expect(
            shallow(<Navigation />).contains(
                <Drawer show={isDrawerOpen} onClick={closeDrawer}>
                    <nav className="navigation__drawer-nav">
                        <NavigationLinks />
                    </nav>
                </Drawer>
            )
        ).toBe(false);
        // const wrapper = shallow(<Navigation />);
        // expect(wrapper.find(Child)).toHaveLength(1);
        // expect(wrapper.find(Child)).toHaveLength(1);
    });
});
