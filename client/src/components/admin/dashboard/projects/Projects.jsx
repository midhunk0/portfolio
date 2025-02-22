// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Projects.css";

export default function Projects(){
        
    const apiUrl=import.meta.env.MODE==="development"
        ? import.meta.env.VITE_APP_DEV_URL
        : import.meta.env.VITE_APP_PROD_URL;

    const [projects, setProjects]=useState([]);
    
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
        };
        fetchProjects();
    }, [apiUrl]);

    return(
        <div className="dashboard-projects">
            <h1>Projects.</h1>
            <div className="dashboard-projects-list">
                {/* {projects.map((project, index) => (
                    <div className="dashboard-project" key={index}>
                        <img src={project.imageUrl} alt="proj"/>
                        <div className="dashboard-project-details">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="dashboard-project-links">
                                <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                                    <img src="/arrow.png" alt="img"/>
                                </a>
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                    <img src="/github.png" alt="img"/>
                                </a>
                            </div>
                        </div>
                    </div>
                ))} */}
                {[...Array(10)].map((_, index)=>(
                    <div className="dashboard-project" key={index}>
                        <a href="https://weather-midhunk0.vercel.app"><img src="/proj1.png" alt="proj1"/></a>
                        <div className="dashboard-project-details">
                            <h3>project.title</h3>
                            <p>project.description</p>
                            <div className="dashboard-project-links">
                                <a href="project.projectLink" target="_blank" rel="noopener noreferrer">
                                    <img src="/arrow.png" alt="img"/>
                                </a>
                                <a href="project.githubLink" target="_blank" rel="noopener noreferrer">
                                    <img src="/github.png" alt="img"/>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}