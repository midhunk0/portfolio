/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./TopbarComponent.css";

export function TopbarComponent({ logoFunction, renderLinks, setShowMenu, showMenu }){

    return(
        <div className="topbarComponent">
            <button data-cursor="topbar-image" className="topbarComponent-logo" onClick={logoFunction}>
                <img src="/logo.png" alt="logo"/>
            </button>
            <div className="topbarComponent-menu">
                <img src={showMenu ? "/close.png" : "/menu.png"} alt="menu" onClick={()=>setShowMenu(prev=>!prev)}/>
                {showMenu && (
                    <div className="topbarComponent-menu-links">
                        {renderLinks()}
                    </div>
                )}
            </div>
            <div className="topbarComponent-links">
                {renderLinks()}
            </div>
        </div>
    )
}