/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { useState } from "react";
import "./AdminTopbar.css";
import { useNavigate } from "react-router-dom";

export default function AdminTopbar(){
    const navigate=useNavigate();
    const [showMenu, setShowMenu]=useState(false);

    function navigationLink(dest){
        navigate(dest);
        setShowMenu(false);
    }

    function renderLinks(){
        return(
            <>
                <a onClick={()=>navigationLink("/dashboard/add")}><h3>Add</h3></a>
                <a onClick={()=>navigationLink("/dashboard/projects")}><h3>Projects</h3></a>
                <a onClick={()=>navigationLink("/dashboard/messages")}><h3>Messages</h3></a>
            </>
        )
    }

    return(
        <div className="admin-topbar">
            <button className="admin-logo" onClick={()=>navigate("/dashboard/add")}>
                <img src="/logo.png" alt="img"/>
            </button>
            <div className="admin-topbar-menu">
                <img src={showMenu ? "/close.png" : "/menu.png"} alt="menu" onClick={()=>setShowMenu(!showMenu)}/>
                {showMenu && (
                    <div className="admin-topbar-menu-links">
                        {renderLinks()}
                    </div>
                )}
            </div>
            <div className="admin-topbar-links">
                {renderLinks()}
            </div>
        </div>
    )
}