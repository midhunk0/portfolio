/* eslint-disable react/prop-types */
// @ts-nocheck
import "./Projects.css";
import { useEffect, useState } from "react";
import UploadProject from "./upload/UploadProject";

const Projects=({ projectSection, setProjectSection })=>{
    const [view, setView]=useState("list");
    const [projects, setProjects]=useState([]);
    const [draggedId, setDraggedId]=useState(null);
    const [dragOverId, setDragOverId]=useState(null);

    const apiUrl=import.meta.env.MODE === "development" ? import.meta.env.VITE_APP_DEV_URL : import.meta.env.VITE_APP_PROD_URL;

    useEffect(()=>{
        const fetchProjects=async()=>{
            try{
                const response=await fetch(`${apiUrl}/fetchProjects`, {
                    method: "GET",
                    credentials: "include",
                });

                const result=await response.json();

                if(response.ok){
                    setProjects(result.projects);
                }
            } 
            catch(error){
                console.log(error.message);
            }
        };

        fetchProjects();
    }, [apiUrl]);

    const handleDragStart=(e, projectId)=>{
        setDraggedId(projectId);
        setDragOverId(projectId);
        e.dataTransfer.effectAllowed="move";
        e.dataTransfer.setData("text/plain", projectId);
    }

    const clearDragState=()=>{
        setDraggedId(null);
        setDragOverId(null);
    }

    const saveProjectOrder=async(updatedProjects)=>{
        try{
            const response=await fetch(`${apiUrl}/reorderProjects`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    projects: updatedProjects.map(
                        (project, index) => ({
                            id: project._id,
                            order: index,
                        })
                    ),
                }),
            });

            if(!response.ok){
                throw new Error("Failed to save project order");
            }
        } 
        catch (error){
            console.log(error.message);
        }
    };

    const reorderProjects=async(draggedProjectId, targetProjectId)=>{
        const currentProjects=[...projects];

        const oldIndex=currentProjects.findIndex((project)=>project._id===draggedProjectId);
        const newIndex=currentProjects.findIndex((project)=>project._id===targetProjectId);

        if(oldIndex===-1 || newIndex===-1 || oldIndex===newIndex){
            return;
        }

        const updatedProjects=[...currentProjects];

        const [draggedProject]=updatedProjects.splice(oldIndex, 1);

        updatedProjects.splice(newIndex, 0, draggedProject);

        // Update UI immediately
        setProjects(updatedProjects);

        // Save new order in backend
        await saveProjectOrder(updatedProjects);
    };

    const renderListView=()=>{
        return(
            <div className="projects-list">
                {projects.map((project)=>(
                    <div
                        className={`list-project ${draggedId === project._id ? "dragging" : ""} ${dragOverId === project._id ? "drag-over" : ""}`}
                        key={project._id}
                        draggable
                        onDragStart={(e)=>handleDragStart(e, project._id)}
                        onDragOver={(e)=>{
                            e.preventDefault();
                            e.dataTransfer.dropEffect="move";

                            if(dragOverId!==project._id){
                                setDragOverId(project._id);
                            }
                        }}
                        onDrop={(e)=>{
                            e.preventDefault();

                            if(draggedId && draggedId!==project._id){
                                reorderProjects(
                                    draggedId,
                                    project._id
                                );
                            }

                            clearDragState();
                        }}
                        onDragEnd={clearDragState}
                    >
                        <div className="list-project-div">
                            <a
                                href={project.projectLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="list-project-image"
                                />
                            </a>
                            <p>{project.title}</p>
                        </div>
                        <div className="list-project-div">
                            <a
                                href={project.projectLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                <img
                                    data-cursor="icon"
                                    src="/arrow.png"
                                    alt="Project"
                                    className="project-icon"
                                    />
                            </a>
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                <img
                                    data-cursor="icon"
                                    src="/github.png"
                                    alt="GitHub"
                                    className="project-icon"
                                    />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const renderGridView=()=>{
        return(
            <div className="projects-grid">
                {projects.map((project)=>(
                    // <div className="grid-project" key={project._id}>
                    <div
                        className={`grid-project ${
                            draggedId === project._id ? "dragging" : ""
                        } ${
                            dragOverId === project._id ? "drag-over" : ""
                        }`}
                        key={project._id}
                        draggable
                        onDragStart={(e) =>
                            handleDragStart(e, project._id)
                        }
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = "move";

                            if (dragOverId !== project._id) {
                                setDragOverId(project._id);
                            }
                        }}
                        onDrop={(e) => {
                            e.preventDefault();

                            if (draggedId && draggedId !== project._id) {
                                reorderProjects(
                                    draggedId,
                                    project._id
                                );
                            }

                            clearDragState();
                        }}
                        onDragEnd={clearDragState}
                    >
                        <a
                            href={project.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="grid-project-image"
                            />
                        </a>
                        <div className="grid-project-div">
                            <p>{project.title}</p>
                            <div className="grid-project-links">
                                <a
                                    href={project.projectLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                    <img
                                        data-cursor="icon"
                                        src="/arrow.png"
                                        alt="Project"
                                        className="project-icon"
                                        />
                                </a>
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                    <img
                                        data-cursor="icon"
                                        src="/github.png"
                                        alt="GitHub"
                                        className="project-icon"
                                        />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return(
        <div className="admin-projects">
            {projectSection==="upload" ? (
                <UploadProject/>
            ) : (
                <div>
                    <h1 data-cursor="heading">Projects</h1>
                    <div className="admin-projects-options">
                        {view==="list" ? 
                            <a data-cursor="link" className="topbar-logo" onClick={()=>setView("grid")}><img src="/grid.png" alt="grid"/></a>
                        :                     
                            <a data-cursor="link" className="topbar-logo" onClick={()=>setView("list")}><img src="/list.png" alt="list"/></a>
                        }
                        <a data-cursor="link" className="topbar-logo" onClick={()=>setProjectSection("upload")}><img src="/add.png" alt="add"/></a>
                    </div>
                    {view==="list" ? renderListView() : renderGridView()}
                </div>
            )}
        </div>
    )
}

export default Projects;
