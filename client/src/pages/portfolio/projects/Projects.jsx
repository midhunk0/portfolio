// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import "./Projects.css";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

const projects=[
    {
        title: "bornday", 
        image: "/bornday.png", 
        description: "An app to store birthdays of our friends and families and get notified a day before it",
        projectLink: "https://bornday.vercel.app",
        githubLink: "https://github.com/midhunk0/bornday"
    },
    {
        title: "atomictable", 
        image: "/atomictable.png", 
        description: "A periodic table app to explore element details and visualize data with charts.",
        projectLink: "https://atomictable.vercel.app",
        githubLink: "https://github.com/midhunk0/periodic-table"
    },
    {
        title: "IPL", 
        image: "/ipl.png", 
        description: "An app to view the point tables, match details, and season stats for the Indian Premier League",
        projectLink: "https://indianpremierleague.vercel.app",
        githubLink: "https://github.com/midhunk0/ipl"
    },    
    {
        title: "nasa apod", 
        image: "/nasa_apod.png", 
        description: "An react appilcation to view picture of the day from nasa and store favourite pictures",
        projectLink: "https://picofthedaybynasa.vercel.app",
        githubLink: "https://github.com/midhunk0/nasa-apod"
    },
    {
        title: "todo app", 
        image: "/todo.png", 
        description: "A todo app, to add, complete, delete todos. also recover todos from trash if needed",
        projectLink: "https://t0du.vercel.app",
        githubLink: "https://github.com/midhunk0/todo"
    },
    {
        title: "finansier", 
        image: "/finansier.png", 
        description: "An admin dashboard in React that displays data from a backend API.",
        projectLink: "https://finansier.vercel.app",
        githubLink: "https://github.com/midhunk0/finansier"
    },
    {
        title: "vether", 
        image: "/vether.png", 
        description: "A weather app to get the details of weather at a place",
        projectLink: "https://vether.vercel.app",
        githubLink: "https://github.com/midhunk0/weather"
    },
    {
        title: "adminis", 
        image: "/admin_dashboard.png", 
        description: "An admin dashboard using react",
        projectLink: "https://adminis-dasboard.vercel.app",
        githubLink: "https://github.com/midhunk0/admin-dashboard"
    },
    {
        title: "spotify clone", 
        image: "/spotyf.png", 
        description: "A clone of the Spotify web app built using React",
        projectLink: "https://spotyf.vercel.app",
        githubLink: "https://github.com/midhunk0/spotify_clone"
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