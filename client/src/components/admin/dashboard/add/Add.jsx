// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import "./Add.css";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useNavigate } from "react-router-dom";

export default function Add(){
    const navigate=useNavigate();
    
    const apiUrl=import.meta.env.MODE==="development"
        ? import.meta.env.VITE_APP_DEV_URL
        : import.meta.env.VITE_APP_PROD_URL;

    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        projectLink: "",
        githubLink: "",
    });
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const cropperRef = useRef(null);

    function handleDragOver(e) {
        e.preventDefault();
    }
    
    function handleDrop(e) {
        e.preventDefault();
        if (image) return; // Prevent multiple images
        const file = e.dataTransfer.files[0];
        handleFile(file);
    }
    
    function handleFileChange(e) {
        if (image) return; // Prevent multiple images
        const file = e.target.files[0];
        handleFile(file);
    }

    function handleFile(file) {
        if (file && file.type.startsWith("image/")) {
            setImage(URL.createObjectURL(file));
            setShowCropper(true);
        }
    }
    
    function handleCrop() {
        if (cropperRef.current) {
            const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
            setCroppedImage(croppedCanvas.toDataURL()); // Convert to base64
            setShowCropper(false); // Hide cropper
            setImage(null); // Remove original image
        }
    }
    
    function handleRemoveImage() {
        setImage(null);
        setCroppedImage(null);
        setShowCropper(false);
    }

    async function addProject(e){
        e.preventDefault();
    
        try{
            const formData=new FormData();
            for(const key in projectData){
                formData.append(key, projectData[key]);
            }

            if(croppedImage){
                const blob=await fetch(croppedImage).then(res=>res.blob());
                formData.append("image", blob, "project-image.png");
            }
            
            const response=await fetch(`${apiUrl}/addProject`, {
                method: "POST",
                body: formData,
                credentials: "include"
            });
            const result=await response.json();
            if(response.ok){
                setProjectData({
                    title: "",
                    description: "",
                    projectLink: "",
                    githubLink: ""
                })
                setImage(null);
                setCroppedImage(null)
                setShowCropper(false);
                navigate("/dashboard/projects")
            }
        }
        catch(error){
            console.log(error.message);
        }
    }
    return(
        <div className="dashboard-add">
            <h1>Add Project.</h1>
            <form onSubmit={addProject}>
                <div className="dashboard-add-image" onDrop={handleDrop} onDragOver={handleDragOver}>
                    {showCropper && image ? (
                        <div className="dashboard-add-image-preview">
                            <Cropper src={image} style={{ height: 200, width: "100%" }} initialAspectRatio={1} guides={false} ref={cropperRef}/>
                            <button type="button" onClick={handleCrop}>Crop</button>
                        </div>
                    ) : croppedImage ? (
                        <div className="dashboard-add-cropped-image-preview">
                            <img src={croppedImage} alt="Cropped" />
                            <button type="button" onClick={handleRemoveImage}>Remove</button>
                        </div>
                    ) : (
                        <div className="dashboard-add-image-upload">
                            <p>Drag and drop image here or select a file</p>
                            <input type="file" onChange={handleFileChange} id="fileInput"/>
                            <label htmlFor="fileInput">Choose Image</label>
                        </div>
                    )}
                </div>
                <div className="dashboard-add-form">
                    <input type="text" placeholder="Title" value={projectData.title} onChange={(e)=>setProjectData({ ...projectData, title: e.target.value })}/>
                    <input type="text" placeholder="Description" value={projectData.description} onChange={(e) => setProjectData({ ...projectData, description: e.target.value }) } />
                    <input type="text" placeholder="Project Link" value={projectData.projectLink} onChange={(e) => setProjectData({ ...projectData, projectLink: e.target.value }) } />
                    <input type="text" placeholder="Github Link" value={projectData.githubLink} onChange={(e) => setProjectData({ ...projectData, githubLink: e.target.value }) } />
                    <button type="submit" onClick={addProject}>
                        Submit <img src="/white-arrow.png" alt="arrow" />
                    </button>
                </div>
            </form>
        </div>
    )
}