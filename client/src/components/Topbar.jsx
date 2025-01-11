/* eslint-disable no-unused-vars */
import React, { useState } from "react";

function Topbar(){
    const [showMenu, setShowMenu]=useState(false);

    function toggleMenu(){
        setShowMenu(!showMenu);
    }

    function renderLinks(){
        return(
            <>
                <a href="#home"><h3>Home</h3></a>
                <a href="#about"><h3>About</h3></a>
                <a href="#projects"><h3>Projects</h3></a>
                <a href="#contacts"><h3>Contacts</h3></a>
            </>
        )
    }

    return(
        <div className="topbar">
            <div className="logo">
                <a href="#home"><h1>M!D</h1></a>
            </div>
            <div className="menuButtons">
                <img 
                    src={showMenu ? "./close.png" : "./menu.png"} 
                    alt={showMenu ? "close" : "menu"} 
                    onClick={toggleMenu}
                />
                {
                    showMenu ? (
                        <div className="menuLinks">
                            {renderLinks()}
                        </div>                        
                    ) : (
                        <></>
                    )
                }
            </div>
            <div className="links">
                {renderLinks()}
            </div>
        </div>
    )
};

export default Topbar;