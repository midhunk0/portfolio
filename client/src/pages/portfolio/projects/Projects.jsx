// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Projects.css";
import { useRef } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

export default function Projects(){
    const apiUrl=import.meta.env.MODE==="development"
        ? import.meta.env.VITE_APP_DEV_URL
        : import.meta.env.VITE_APP_PROD_URL;

    const [projects, setProjects]=useState([]);
    const [loading, setLoading]=useState(true);

    const targetRef=useRef(null);
    const { scrollYProgress }=useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const x=useSpring(
        useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]),
        { stiffness: 100, damping: 30, mass: 0.5 }
    )
    
    useEffect(()=>{
        async function fetchProjects(){
            try{
                const response=await fetch(`${apiUrl}/fetchProjects`, {
                    method: "GET",
                    credentials: "include",
                });
                const result=await response.json();
                if(response.ok){
                    setProjects(result);
                }
            }
            catch(error){
                console.log(error);
            }
            finally{
                setLoading(false);
            }
        };
        fetchProjects();
    }, [apiUrl]);

    return(
        <section id="projects" ref={targetRef} className="scroll-container">
            <h1 data-cursor="heading" style={{color: "white"}}>Projects</h1>
        {/* <section className="scroll-container"> */}
            <div className="sticky-wrapper">
                {/* {!loading ? 
                    [...Array(6)].map((_, index) => (
                        <div className="projectsPage-skeleton" key={index}>
                            <div className="projectsPage-skeleton-image"></div>
                            <div className="projectsPage-project-details">
                                <div className="projectsPage-skeleton-text"></div>
                                <div className="projectsPage-skeleton-text"></div>
                                <div className="projectsPage-project-links">
                                    <div className="projectsPage-skeleton-icon"></div>
                                    <div className="projectsPage-skeleton-icon"></div>
                                </div>
                            </div>
                        </div>
                    ))
                :
                    projects.map((project, index) => (
                        <div className="projectsPage-project" key={index}>
                            <img src={project.imageUrl} alt="proj" className="projectsPage-project-image"/>
                            <div className="projectsPage-project-details">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="projectsPage-project-links">
                                    <a data-cursor="link" href={project.projectLink} target="_blank" rel="noopener noreferrer">
                                        <img src="/arrow.png" alt="img" className="projectsPage-icon"/>
                                    </a>
                                    <a data-cursor="link" href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                        <img src="/github.png" alt="img" className="projectsPage-icon"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                } */}

                {/* {[...Array(10)].map((_, index)=>(
                    <div className="projectsPage-project" key={index}>
                        <a href="https://weather-midhunk0.vercel.app"><img src="/proj1.png" alt="proj1" className="projectsPage-project-image"/></a>
                        <div className="projectsPage-project-details">
                            <h3>project.title</h3>
                            <p>project.description</p>
                            <div className="projectsPage-project-links">
                                <a href="project.projectLink" target="_blank" rel="noopener noreferrer">
                                    <img src="/arrow.png" alt="img" className="projectsPage-icon"/>
                                </a>
                                <a href="project.githubLink" target="_blank" rel="noopener noreferrer">
                                    <img src="/github.png" alt="img" className="projectsPage-icon"/>
                                </a>
                            </div>
                        </div>
                    </div>
                ))} */}
                <motion.div style={{x}} className="cards-container">
                    {[...Array(10)].map((_, index)=>{
                        return (
                            <div key={index} className="card">
                                <div style={{ backgroundImage: "/proj1.png" }} className="card-background"></div>
                            </div>
                        )
                    })}
                </motion.div>            
                </div>
            {/* </section> */}
        </section>
    )
};