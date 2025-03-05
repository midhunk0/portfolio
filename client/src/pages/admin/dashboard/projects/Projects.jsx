// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Projects.css";
import { useProjects } from "../../../../contexts/ProjectsContext";

export default function Projects(){
        
    const apiUrl=import.meta.env.MODE==="development"
        ? import.meta.env.VITE_APP_DEV_URL
        : import.meta.env.VITE_APP_PROD_URL;

    // const [projects, setProjects]=useState([]);
    const { projects, setProjects }=useProjects();
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        console.log(projects);
        if(projects.length!==0){
            setLoading(false);
        }
    }, []);
    
    // useEffect(()=>{
    //     async function fetchProjects(){
    //         try{
    //             const response=await fetch(`${apiUrl}/fetchProjects`, {
    //                 method: "GET",
    //                 credentials: "include",
    //             });
    //             const result=await response.json();
    //             if(response.ok){
    //                 setProjects(result);
    //             }
    //         }
    //         catch(error){
    //             console.log(error);
    //         }
    //         finally{
    //             setLoading(false);
    //         }
    //     };
    //     fetchProjects();
    // }, [apiUrl]);

    return(
        <div className="dashboard-projects">
            <h1>Projects.</h1>
            <div className="dashboard-projects-list">
                {loading ? 
                    [...Array(6)].map((_, index) => (
                        <div className="dashboard-skeleton" key={index}>
                            <div className="dashboard-project-image-skeleton"></div>
                            <div className="dashboard-project-details-skeleton">
                                <div className="dashboard-project-text-skeleton"></div>
                                <div className="dashboard-project-text-skeleton"></div>
                                <div className="dashboard-project-links-skeleton">
                                    <div className="dashboard-project-icon-skeleton"></div>
                                    <div className="dashboard-project-icon-skeleton"></div>
                                </div>
                            </div>
                        </div>
                    ))
                : projects.map((project, index) => (
                    <div className="dashboard-project" key={index}>
                        <div className="dashboard-project-image">
                            <img src={project.imageUrl} alt="proj"/>
                        </div>
                        <div className="dashboard-project-details">
                            <h3>{project.title}</h3>
                            <div className="dashboard-project-paragraph">
                                <p>{project.description}</p>
                            </div>
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
                ))}
            </div>
        </div>
    )
}