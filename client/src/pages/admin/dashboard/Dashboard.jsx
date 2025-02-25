// @ts-nocheck
/* eslint-disable no-unused-vars */
import React from "react";
import "./Dashboard.css";
import { Outlet } from "react-router-dom";
import Topbar from "../../../globals/adminTopbar/Topbar";

export default function Dashboard() {

    return (
        <>
            <Topbar/>
            <div className="dashboard">
                <Outlet/>
            </div>
        </>
    );
}
