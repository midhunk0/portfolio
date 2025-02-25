/* eslint-disable no-unused-vars */
import React from "react";
import "./About.css";

function About(){
    return(
        <div className="about">
            <h1>About</h1>
            <div className="aboutContent">
                <h2>
                    hello, World! I&apos;m a FrontEnd web developer with 2+ years of experience, and my skill set encompasses a wide range of expertise:
                </h2>
                <div className="technologies">
                    <div className="frontend">
                        <h3>frontend:</h3>
                        <p>TypeScript, JavaScript, React, Angular, HTML, CSS</p>
                    </div>
                    <div className="backend">
                        <h3>backend:</h3>
                        <p>Node.js, Express.js, MongoDB, Psql</p>
                    </div>
                    <div className="other">
                        <h3>other:</h3>
                        <p>Git, GitHub, postman, RestAPI</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default About;