// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Dashboard.css";
import Messages from "../messages/Messages";
import Projects from "../projects/Projects";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [selectedTab, setSelectedTab]=useState("projects");
    const [projectSection, setProjectSection]=useState("main");
    const navigate=useNavigate();

    const handleLogoClick=()=>{
        if(selectedTab==="projects" && projectSection!=="main"){
            setProjectSection("main");
            return;
        }
        if(selectedTab!=="projects"){
            setSelectedTab("projects");
            setProjectSection("main");
        }
    }

    return (
        <div className="dashboard">
            <div className="topbar">
                <button data-cursor="icon" className="topbar-logo" onClick={handleLogoClick}>
                    <img src="/logo.png" alt="logo"/>
                </button>
                <div className="topbar-menu-links">
                    <a data-cursor="link" onClick={()=>{setSelectedTab("projects"); setProjectSection("main")}}><h3>Projects</h3></a>
                    <a data-cursor="link" onClick={()=>setSelectedTab("messages")}><h3>Messages</h3></a>
                </div>
            </div>
            {selectedTab==="projects" ? <Projects projectSection={projectSection} setProjectSection={setProjectSection}/> : <Messages/>}
        </div>
    );
}