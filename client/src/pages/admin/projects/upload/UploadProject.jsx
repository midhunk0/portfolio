// @ts-nocheck
import { useRef, useState } from "react";
import "./UploadProject.css";

export default function UploadProject() {
    const [project, setProject] = useState({
        title: "",
        description: "",
        githubLink: "",
        projectLink: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview]=useState("");
    const fileInputRef=useRef(null);

    const handleImage = (file) => {
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Only images are allowed.");
            return;
        }

        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleDrop = (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];

        if (file) {
            handleImage(file);
        }
    };

    const handleDragOver=(e)=>{
        e.preventDefault();
    }

    const handlePaste = (e) => {
        for (const item of e.clipboardData.items) {
            if (item.type.startsWith("image/")) {
                handleImage(item.getAsFile());
                break;
            }
        }
    };

    const removeImage = (e) => {
        e?.stopPropagation();

        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setImage(null);
        setPreview("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const apiUrl =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_APP_DEV_URL
            : import.meta.env.VITE_APP_PROD_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", project.title);
        formData.append("description", project.description);
        formData.append("githubLink", project.githubLink);
        formData.append("projectLink", project.projectLink);

        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await fetch(`${apiUrl}/addProject`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                console.log(result.message);

                setProject({
                    title: "",
                    description: "",
                    githubLink: "",
                    projectLink: "",
                });

                removeImage()
            } else {
                console.log(result.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="upload-projects">
            <h1 data-cursor="heading">Add Projects</h1>
            <form onSubmit={handleSubmit} className="upload-project-form">
                <input
                    data-cursor="line" 
                    type="text"
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) =>
                        setProject({
                            ...project,
                            title: e.target.value,
                        })
                    }
                />
                <textarea
                    data-cursor="line" 
                    placeholder="Project Description"
                    value={project.description}
                    onChange={(e) =>
                        setProject({
                            ...project,
                            description: e.target.value,
                        })
                    }
                />

                <div
                    className="image-input"
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onPaste={handlePaste}
                    tabIndex={0}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleImage(e.target.files?.[0])}
                    />

                    {!preview ? (
                        <>
                            <div className="image-placeholder">
                                <h4>Project Image</h4>
                                <p>
                                    Click, drag & drop or paste an image
                                </p>
                            </div>
                        </>
                    ) : (
                        <div
                            className="image-preview"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={preview} alt="Preview" />
                            <button
                                type="button"
                                className="remove-image"
                                onClick={removeImage}
                                data-cursor="button"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>

                <input
                    data-cursor="line" 
                    type="url"
                    placeholder="GitHub Link"
                    value={project.githubLink}
                    onChange={(e) =>
                        setProject({
                            ...project,
                            githubLink: e.target.value,
                        })
                    }
                />

                <input
                    data-cursor="line" 
                    type="url"
                    placeholder="Project Link"
                    value={project.projectLink}
                    onChange={(e) =>
                        setProject({
                            ...project,
                            projectLink: e.target.value,
                        })
                    }
                />

                <button data-cursor="button" type="submit">Add Project</button>
            </form>
        </div>
    );
}
