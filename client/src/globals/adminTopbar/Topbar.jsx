/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Topbar.css";
import { useNavigate } from "react-router-dom";
import { TopbarComponent } from "../../components/topbar/TopbarComponent";

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
                <a data-cursor="link" onClick={()=>navigationLink("/dashboard/messages")}><h3>Messages</h3></a>
            </>
        )
    }

    return(
        <TopbarComponent logoFunction={()=>navigate("/dashboard/add")} renderLinks={renderLinks} showMenu={showMenu} setShowMenu={setShowMenu}/>
    )
}