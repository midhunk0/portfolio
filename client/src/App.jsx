/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar";
import Home from "./components/Home";
import ProjectSection from "./components/Projects";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Login from "./components/admin/auth/login/Login";
import Register from "./components/admin/auth/register/Register";
import Dashboard from "./components/admin/dashboard/Dashboard";
import Add from "./components/admin/dashboard/add/Add";
import Projects from "./components/admin/dashboard/projects/Projects";
import Messages from "./components/admin/dashboard/messages/Messages";

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
            <div className="background">
                <video src="/video.mp4" autoPlay muted loop/>
            </div>
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
                <video src="/video.mp4" autoPlay muted loop/>
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