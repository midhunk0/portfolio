// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import "./Projects.css";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

const projects=[
    {
        title: "admin dashboard", 
        image: "/admin_dashboard.png", 
        description: "an admin dashboard using react",
        projectLink: "https://admin-dashboard-midhunk0s-projects.vercel.app",
        githubLink: "https://github.com/midhunk0/admin-dashboard"
    },
    {
        title: "admin dashboard with backend", 
        image: "/admin_dashboard_with_backend.png", 
        description: "an admin dashboard using react, and uses backend data",
        projectLink: "https://admin-dashboard-with-backend.vercel.app",
        githubLink: "https://github.com/midhunk0/admin-dashboard-with-backend"
    },
    {
        title: "todo app", 
        image: "/todo.png", 
        description: "a todo app, to add, complete, delete todos. also recover todos from trash if needed",
        projectLink: "https://todo-gamma-self.vercel.app/login",
        githubLink: "https://github.com/midhunk0/todo"
    },
    {
        title: "nasa apod", 
        image: "/nasa_apod.png", 
        description: "an react appilcation to view picture of the day from nasa and store favourite pictures",
        projectLink: "https://nasa-apod-ashen-three.vercel.app",
        githubLink: "https://github.com/midhunk0/nasa-apod"
    },
    {
        title: "weather", 
        image: "/weather.png", 
        description: "a weather app to get the details of weather at a place",
        projectLink: "https://weather-midhunk0.vercel.app",
        githubLink: "https://github.com/midhunk0/weather"
    },
    {
        title: "bornday", 
        image: "/bornday.png", 
        description: "an app to store birthdays of our friends and families and get notified a day before it",
        projectLink: "https://bornday.vercel.app",
        githubLink: "https://github.com/midhunk0/bornday"
    },
]

export default function Projects(){
    const targetRef=useRef(null);
    const { scrollYProgress }=useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const x=useSpring(
        useTransform(scrollYProgress, [0.1, 1], ["0%", "-90%"]), 
        { stiffness: 100, damping: 30, mass: 0.5 }
    ) 


    return(
        <section id="projects" ref={targetRef} className="projects">
            <h1 data-cursor="heading" style={{ color: "white" }}>Projects</h1>
            <div className="projects-wrapper">
                <motion.div style={{x}} className="projects-container">
                    {projects.map((project, index)=>(
                        <div className="project" key={index}>
                            <a href={project.projectLink}><img src={project.image} alt={project.title} className="project-image"/></a>
                            <div className="project-details">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-links">
                                    <a href={project.projectLink}>
                                        <img data-cursor="icon" src="/arrow.png" alt="img" className="project-icon"/>
                                    </a>
                                    <a href={project.githubLink}>
                                        <img data-cursor="icon" src="/github.png" alt="img" className="project-icon"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )};