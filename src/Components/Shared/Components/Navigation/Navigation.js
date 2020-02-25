import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import NavigationLinks from "./NavigationLinks";
import Backdrop from "../Generic/Backdrop";
import Drawer from "./Drawer";
import "./Navigation.css";

function Navigation() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer = () => {
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <React.Fragment>
            {isDrawerOpen && <Backdrop onClick={closeDrawer} />}
            <Drawer show={isDrawerOpen} onClick={closeDrawer}>
                <nav className="navigation__drawer-nav">
                    <NavigationLinks />
                </nav>
            </Drawer>

            <Header>
                <button className="navigation__menu-btn" onClick={openDrawer}>
                    {/* span used to create the hamburger icon */}
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="navigation__title">
                    <Link to="/">travelog</Link>
                </h1>
                <nav className="navigation__header-nav">
                    <NavigationLinks />
                </nav>
            </Header>
        </React.Fragment>
    );
}

export default Navigation;
