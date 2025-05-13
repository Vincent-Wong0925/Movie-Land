import React from "react";
import { Outlet } from "react-router";

const Root = () => {
    return(
        <div className="Root">
            <Outlet />
        </div>
    )
}

export default Root;