import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Components/Shared/Context/AuthContext";
import { useAuth } from "./Components/Shared/Hooks/AuthHook";
import Users from "./Components/Users/Users";
import PlacesByUser from "./Components/Users/PlacesByUser";
import AddPlace from "./Components/Places/AddPlace";
import UpdatePlace from "./Components/Places/UpdatePlace";
import Auth from "./Components/Auth/Auth";
import Navigation from "./Components/Shared/Components/Navigation/Navigation";
import "./App.css";

function App() {
    const { token, login, logout, userId } = useAuth();

    // Configure Routes based on whether
    // the user is logged in or not
    let routes;
    // Loggedin users
    if (token) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Users />
                </Route>
                <Route path="/:userId/places" exact>
                    <PlacesByUser />
                </Route>
                <Route path="/places/new" exact>
                    <AddPlace />
                </Route>
                <Route path="/places/:placeId">
                    <UpdatePlace />
                </Route>
                <Redirect to="/" />
            </Switch>
        );
    } else {
        // Users NOT logged in
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Users />
                </Route>
                <Route path="/:userId/places" exact>
                    <PlacesByUser />
                </Route>
                <Route path="/auth">
                    <Auth />
                </Route>
                <Redirect to="/auth" />
            </Switch>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                login: login,
                logout: logout
            }}
        >
            <Navigation />
            {/* Display pages based on whether the user is logged in or not */}
            <main>{routes}</main>
        </AuthContext.Provider>
    );
}

export default App;
