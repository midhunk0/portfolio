// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Projects.css";
import { useRef } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

export default function Projects(){
    const [projects, setProjects]=useState([]);
    const [loading, setLoading]=useState(true);

    const targetRef=useRef(null);
    const { scrollYProgress }=useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const x=useSpring(
        useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]),
        { stiffness: 100, damping: 30, mass: 0.5 }
    )

    const y = useTransform(scrollYProgress, [0.9, 1], ["1%", "-100%"]);
    
    return(
        <section id="projects" ref={targetRef} className="projects">
            <motion.div style={{y}} className="projects-header">
                <h1 data-cursor="heading" style={{ color: "white" }}>Projects</h1>
            </motion.div>
            <div className="projects-wrapper">
                <motion.div style={{x}} className="projects-container">
                    {[...Array(5)].map((_, index)=>(
                        <div className="project" key={index}>
                            <a href="https://weather-midhunk0.vercel.app"><img src="/proj1.png" alt="proj1" className="project-image"/></a>
                            <div className="project-details">
                                <h3>project.title</h3>
                                <p>project.description</p>
                                <div className="project-links">
                                    <a href="project.projectLink" target="_blank" rel="noopener noreferrer">
                                        <img src="/arrow.png" alt="img" className="project-icon"/>
                                    </a>
                                    <a href="project.githubLink" target="_blank" rel="noopener noreferrer">
                                        <img src="/github.png" alt="img" className="project-icon"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>            
            </div>
        </section>
    )
};
