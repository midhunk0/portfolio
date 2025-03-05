/* eslint-disable react-refresh/only-export-components */
// @ts-nocheck
/* eslint-disable react/prop-types */
// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const apiUrl = import.meta.env.MODE === "development"
        ? import.meta.env.VITE_APP_DEV_URL
        : import.meta.env.VITE_APP_PROD_URL;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${apiUrl}/fetchProjects`, {
                    method: "GET",
                    credentials: "include"
                });

                const result = await response.json();
                setProjects(result.Projects);
                console.log(result);
            } catch (error) {
                console.error("Error fetching Projects:", error);
            }
        };

        fetchProjects();
    }, [apiUrl]);

    return (
        <ProjectContext.Provider value={{ projects, setProjects }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjects = () => useContext(ProjectContext);
