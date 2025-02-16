// @ts-nocheck
/* eslint-disable no-unused-vars */
import React from "react";
import "./Dashboard.css";
import { Outlet } from "react-router-dom";
import AdminTopbar from "../topbar/AdminTopbar";

export default function Dashboard() {

    return (
        <>
            <AdminTopbar/>
            <div className="dashboard">
                <Outlet/>
            </div>
        </>
    );
}
