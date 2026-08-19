// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import "./Projects.css";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

export default function Projects() {
    const targetRef = useRef(null);
    const [projects, setProjects] = useState([]);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const x = useSpring(
        useTransform(scrollYProgress, [0.1, 1], ["0%", "-90%"]),
        {
            stiffness: 100,
            damping: 30,
            mass: 0.5,
        }
    );

    const apiUrl =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_APP_DEV_URL
            : import.meta.env.VITE_APP_PROD_URL;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${apiUrl}/fetchProjects`, {
                    method: "GET",
                    credentials: "include",
                });

                const result = await response.json();

                if (response.ok) {
                    setProjects(result.projects);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchProjects();
    }, [apiUrl]);

    return (
        <section id="projects" ref={targetRef} className="projects">
            <div className="projects-wrapper">
                <h1 data-cursor="heading" style={{ color: "white" }}>Projects</h1>

                <motion.div style={{ x }} className="projects-container">
                    {projects.map((project) => (
                        <div className="project" key={project._id}>
                            <a
                                href={project.projectLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="project-image"
                                />
                            </a>

                            <div className="project-details">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>

                                <div className="project-links">
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
                </motion.div>
            </div>
        </section>
    );
}
