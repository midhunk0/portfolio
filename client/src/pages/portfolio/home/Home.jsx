/* eslint-disable no-unused-vars */
import React from "react";
import "./Home.css";

export default function Home(){
    return(
        <section id="home" className="home">
            <h1 data-cursor="role" className="role">WEB <span>DEV</span>ELOPER</h1>
            <h2 data-cursor="name" className="name">MIDHUNRAJ</h2>
            <div className="techs">
                <p data-cursor="tech" className="tech css">CSS</p>
                <p data-cursor="tech" className="tech html">HTML</p>
                <p data-cursor="tech" className="tech js">JAVASCRIPT</p>
                <p data-cursor="tech" className="tech react">REACT</p>
                <p data-cursor="tech" className="tech angular">ANGULAR</p>
                <p data-cursor="tech" className="tech node">NODE.JS</p>
                <p data-cursor="tech" className="tech express">EXPRESS.JS</p>
                <p data-cursor="tech" className="tech ts">TYPESCRIPT</p>
            </div>
        </section>
    )
};