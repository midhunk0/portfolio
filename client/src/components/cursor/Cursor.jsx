// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import useMousePosition from "../../globals/useMousePosition";
import "./Cursor.css";
import { motion } from "framer-motion";

const Cursor=()=>{
    const { x, y }=useMousePosition();
    const [hoverStyle, setHoverStyle]=useState(null);
    const [size, setSize]=useState(10);
    const [maskImage, setMaskImage]=useState("mask.svg");

    useEffect(()=>{
        const handleMouseEnter=(e)=>{
            const element=e.target;
            const hoverType=element.getAttribute("data-cursor");
            setHoverStyle(hoverType);
            switch(hoverType){
                case "link": case "icon": setSize(36); break;
                case "role": setSize(230); break;
                case "name": setSize(180); break;
                case "button": setSize(50); break;
                case "heading": setSize(150); break;
                case "line": setSize(50); break;
                case "tech": setSize(35); break;
                default: setSize(10); break;
            }
            setMaskImage(hoverType==="line" ? "line.svg" : "mask.svg");
        }

        const handleMouseLeave=()=>{
            setHoverStyle(null);
            setMaskImage("mask.svg");
            setSize(10);
        }
        
        const hoverElements=document.querySelectorAll("[data-cursor]");
        hoverElements.forEach((el)=>{
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);            
        })

        return()=>{
            hoverElements.forEach((el)=>{
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);            
            })
        }
    })


    return(
        <motion.div
            className={`mask ${hoverStyle ? `cursor-${hoverStyle}` : ""}`}
            animate={{
                WebkitMaskImage: `url(/${maskImage})`,
                WebkitMaskPosition: `${x-size/2}px ${y-size/2}px`,
                WebkitMaskSize: `${size}px`,
            }}
            transition={{
                type: "tween",
                ease: "backOut",
                duration: 0.5
            }}
        />
    )
}

export default Cursor;