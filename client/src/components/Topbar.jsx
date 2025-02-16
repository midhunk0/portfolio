/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Topbar(){
    const navigate=useNavigate();
    const [showMenu, setShowMenu]=useState(false);

    function scrollToTop(){
        navigate("/");
        window.history.pushState(null, "", "/");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    function scrollToSection(section){
        navigate(`/#${section}`);
        setTimeout(()=>{
            const element=document.getElementById(section);
            if(element){
                element.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
        setShowMenu(false);
    }

    function renderLinks(){
        return(
            <>
                <a onClick={scrollToTop}><h3>Home</h3></a>
                <a onClick={()=>scrollToSection("about")}><h3>About</h3></a>
                <a onClick={()=>scrollToSection("projects")}><h3>Projects</h3></a>
                <a onClick={()=>scrollToSection("contacts")}><h3>Contacts</h3></a>
            </>
        )
    }

    return(
        <div className="topbar">
            <button onClick={scrollToTop} className="logo">
                <img src="/logo.png" alt="img"/>
            </button>
            <div className="menuButtons">
                <img 
                    src={showMenu ? "./close.png" : "./menu.png"} 
                    alt={showMenu ? "close" : "menu"} 
                    onClick={()=>setShowMenu(!showMenu)}
                />
                {showMenu && (
                    <div className="menuLinks">
                        {renderLinks()}
                    </div>                        
                )}
            </div>
            <div className="links">
                {renderLinks()}
            </div>
        </div>
    )
};