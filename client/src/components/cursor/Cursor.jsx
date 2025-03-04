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

    useEffect(()=>{
        const handleMouseEnter=(e)=>{
            const element=e.target;
            const hoverType=element.getAttribute("data-cursor");
            setHoverStyle(hoverType);
            switch(hoverType){
                case "topbar-item": case "topbar-image": setSize(36); break;
                case "role": setSize(200); break;
                case "name": setSize(150); break;
                default: setSize(10); break;
            }
        }

        const handleMouseLeave=()=>{
            setHoverStyle(null);
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
            // style={{
            //     left: `${x-size/2}px`,
            //     top: `${y-size/2}px`,
            // }}
            animate={{
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