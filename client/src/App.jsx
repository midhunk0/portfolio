/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import Topbar from "./components/Topbar";
import Home from "./components/Home";
import Projects from "./components/Projects";
import About from "./components/About";
import Contacts from "./components/Contacts";

function App() {

    return (
        <div>
            <div className="background">
                <video src="./video.mp4" autoPlay muted loop/>
            </div>
            <Topbar/>
            <section id="home">
                <Home/>
            </section>
            <section id="about">
                <About/>
            </section>
            <section id="projects">
                <Projects/>
            </section>
            <section id="contacts">
                <Contacts/>
            </section>
        </div>
    )
}

export default App;
