/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";

export default function Topbar(){
    const navigate=useNavigate();
    const [showMenu, setShowMenu]=useState(false);

    function scrollToTop(){
        navigate("/");
        window.history.pushState(null, "", "/");
        window.scrollTo({ top: 0, behavior: "smooth" });
        setShowMenu(false);
    };

    function scrollToSection(section){
        navigate(`/#${section}`);
        const element=document.getElementById(section);
        if(element){
            element.scrollIntoView({ behavior: "smooth" });
        }
        setShowMenu(false);
    }

    function renderLinks(){
        return(
            <>
                <a data-cursor="link" onClick={scrollToTop}><h3>Home</h3></a>
                <a data-cursor="link" onClick={()=>scrollToSection("about")}><h3>About</h3></a>
                <a data-cursor="link" onClick={()=>scrollToSection("projects")}><h3>Projects</h3></a>
                <a data-cursor="link" onClick={()=>scrollToSection("contacts")}><h3>Contacts</h3></a>
            </>
        )
    }

    return(
        <div className="topbar">
            <button data-cursor="icon" className="topbar-logo" onClick={scrollToTop}>
                <img src="/logo.png" alt="logo"/>
            </button>
            <div className="topbar-menu">
                <img data-cursor="icon" src={showMenu ? "/close.png" : "/menu.png"} alt="menu" onClick={()=>setShowMenu(prev=>!prev)}/>
                {showMenu && (
                    <div className="topbar-menu-links">
                        {renderLinks()}
                    </div>
                )}
            </div>
            <div className="topbar-links">
                {renderLinks()}
            </div>
        </div>
    )
};