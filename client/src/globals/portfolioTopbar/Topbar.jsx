/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopbarComponent } from "../../components/topbar/TopbarComponent";

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
                <a onClick={scrollToTop}><h3>Home</h3></a>
                <a onClick={()=>scrollToSection("about")}><h3>About</h3></a>
                <a onClick={()=>scrollToSection("projects")}><h3>Projects</h3></a>
                <a onClick={()=>scrollToSection("contacts")}><h3>Contacts</h3></a>
            </>
        )
    }

    return(
        <TopbarComponent logoFunction={scrollToTop} renderLinks={renderLinks} setShowMenu={setShowMenu} showMenu={showMenu}/>
    )
};