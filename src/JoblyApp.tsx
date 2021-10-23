import {BrowserRouter} from "react-router-dom";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import React from "react";

/** Compose the Jobly application. */

function JoblyApp() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes />
        </BrowserRouter>
    );
}

export default JoblyApp;