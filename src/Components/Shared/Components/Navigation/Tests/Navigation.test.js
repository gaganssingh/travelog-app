import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Navigation from "../Navigation";
Enzyme.configure({ adapter: new Adapter() });

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
    });
});
