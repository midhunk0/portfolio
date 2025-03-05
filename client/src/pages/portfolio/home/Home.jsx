/* eslint-disable no-unused-vars */
import React from "react";
import "./Home.css";

export default function Home(){
    return(
        <section id="home" className="home">
            <h1 data-cursor="role" className="role">WEB DEVELOPER</h1>
            <h2 data-cursor="name" className="name">MIDHUNRAJ</h2>
            <div className="techs">
                <p className="tech css">CSS</p>
                <p className="tech html">HTML</p>
                <p className="tech js">JAVASCRIPT</p>
                <p className="tech react">REACT</p>
                <p className="tech angular">ANGULAR</p>
                <p className="tech node">NODE.JS</p>
                <p className="tech express">EXPRESS.JS</p>
                <p className="tech ts">TYPESCRIPT</p>
            </div>
        </section>
    )
};