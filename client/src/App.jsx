/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/admin/auth/login/Login";
import Register from "./pages/admin/auth/register/Register";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Add from "./pages/admin/dashboard/add/Add";
import Projects from "./pages/admin/dashboard/projects/Projects";
import Messages from "./pages/admin/dashboard/messages/Messages";
import Topbar from "./globals/portfolioTopbar/Topbar";
import Home from "./pages/portfolio/home/Home";
import About from "./pages/portfolio/about/About";
import ProjectSection from "./pages/portfolio/projects/Projects";
import Contacts from "./pages/portfolio/contacts/Contacts";

function ScrollToSection(){
    const location=useLocation();

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
            <section id="home"><Home/></section>
            <section id="about"><About/></section>
            <section id="projects"><ProjectSection/></section>
            <section id="contacts"><Contacts/></section>
        </>
    )
}

export default function App(){
    return (
        <Router>
            <div className="background">
                {/* <video src="/video.mp4" autoPlay muted loop/> */}
            </div>
            <Routes>
                <Route path="/" element={<Portfolio/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/dashboard" element={<Dashboard/>}>
                    <Route path="" element={<Add/>}/>
                    <Route path="add" element={<Add/>}/>
                    <Route path="projects" element={<Projects/>}/>
                    <Route path="messages" element={<Messages/>}/>
                </Route>
            </Routes>
        </Router>
    )
};