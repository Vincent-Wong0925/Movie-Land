import React from "react";
import { Outlet } from "react-router";
import Navigation from "../navigation";
import Searchbar from "../searchbar";

const Root = () => {
    return(
        <div className="Root">
            <Navigation />
            <Searchbar />
            <Outlet />
        </div>
    )
}

export default Root;