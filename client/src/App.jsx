// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Login from "./pages/admin/auth/login/Login";
import Register from "./pages/admin/auth/register/Register";
import Messages from "./pages/admin/messages/Messages";
import Topbar from "./globals/topbar/Topbar";
import Home from "./pages/portfolio/home/Home";
import About from "./pages/portfolio/about/About";
import ProjectSection from "./pages/portfolio/projects/Projects";
import Contacts from "./pages/portfolio/contacts/Contacts";
import useMousePosition from "./globals/useMousePosition";
import Cursor from "./components/cursor/Cursor";

function ScrollToSection(){
    const location=useLocation();
    useMousePosition();

    useEffect(()=>{
        if(location.hash){
            const sectionId=location.hash.replace("#", "");
            const element=document.getElementById(sectionId);
            if(element){
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return null;
}

function Portfolio(){
    return(
        <>
            <ScrollToSection/>
            <Topbar/>
            <Home/>
            <About/>
            <ProjectSection/>
            <Contacts/>
        </>
    )
}

export default function App(){
    return (
        <Router>
            <Cursor/>
            <div className="background">
                <video src="/video.mp4" autoPlay muted loop/>
            </div>
            <Routes>
                <Route path="/" element={<Portfolio/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/messages" element={<Messages/>}/>
            </Routes>
        </Router>
    )
};