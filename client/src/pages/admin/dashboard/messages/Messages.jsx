// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Messages.css";
import { useMessages } from "../../../../contexts/MessageContext";

export default function Messages(){
    const apiUrl=import.meta.env.MODE==="development"
        ? import.meta.env.VITE_APP_DEV_URL
        : import.meta.env.VITE_APP_PROD_URL;
    // const [messages, setMessages]=useState([]);
    const [loading, setLoading]=useState(true);
    const { messages }=useMessages();

    useEffect(()=>{
        if(messages.length!==0){
            setLoading(false);
        }
    }, []);


    // useEffect(()=>{
    //     async function fetchMessages(){
    //         try{
    //             const response=await fetch(`${apiUrl}/fetchMessages`, {
    //                 method: "GET",
    //                 credentials: "include"
    //             });
    //             const result=await response.json();
    //             if(response.ok){
    //                 setMessages(result.messages);
    //                 setLoading(false);
    //             }
    //         }
    //         catch(error){
    //             console.log(error);
    //         }
    //     }
        
    //     fetchMessages();
    // }, [apiUrl]);

    return(
        <div className="dashboard-messages">
            <h1>Messages.</h1>
            <div className="dashboard-messages-list">
                {loading ? 
                    [...Array(8)].map((_, index)=>(
                        <div className="dashboard-message-skeleton" key={index}>
                            <div className="dashboard-message-user-skeleton">
                                <div className="dashboard-message-user-image-skeleton"/>
                                <div className="dashboard-message-user-name-skeleton"/>
                            </div>
                            <div className="dashboard-message-user-message-skeleton"/>
                        </div>
                    ))
                :   
                    messages.map((message, index) => (
                        <div className="dashboard-message" key={index}>
                            <div className="dashboard-message-user">
                                <img src="/user.png" alt="img"/>
                                <h3>{message.email}</h3>
                            </div>
                            <p>{message.message}</p>
                        </div>
                    ))
                }
            </div>
        </div>    
    )
}