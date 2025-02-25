/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./TopbarComponent.css";

export function TopbarComponent({ logoFunction, renderLinks, setShowMenu, showMenu }){

    return(
        <div className="topbar">
            <button className="logo" onClick={logoFunction}>
                <img src="/logo.png" alt="logo"/>
            </button>
            <div className="topbar-menu">
                <img src={showMenu ? "/close.png" : "/menu.png"} alt="menu" onClick={()=>setShowMenu(prev=>!prev)}/>
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
}