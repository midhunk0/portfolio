// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Messages.css";

export default function Messages(){
    const apiUrl=import.meta.env.MODE==="development"
        ? import.meta.env.VITE_APP_DEV_URL
        : import.meta.env.VITE_APP_PROD_URL;
    const [messages, setMessages]=useState([]);
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        async function fetchMessages(){
            try{
                const response=await fetch(`${apiUrl}/fetchMessages`, {
                    method: "GET",
                    credentials: "include"
                });
                const result=await response.json();
                if(response.ok){
                    setMessages(result.messages);
                }
                setLoading(false);
            }
            catch(error){
                console.log(error);
            }
        }
        
        fetchMessages();
    }, [apiUrl]);

    return(
        <div className="messages">
            <h1 data-cursor="heading">Messages.</h1>
            <div className="messages-list">
                {loading ? 
                    [...Array(8)].map((_, index)=>(
                        <div className="message-skeleton" key={index}>
                            <div className="message-user-skeleton">
                                <div className="message-user-image-skeleton"/>
                                <div className="message-user-name-skeleton"/>
                            </div>
                            <div className="message-user-message-skeleton"/>
                        </div>
                    ))
                :   
                    messages.length!==0 ? messages.map((message, index) => (
                        <div className="message" key={index}>
                            <div className="message-user">
                                <img src="/user.png" alt="img"/>
                                <h3>{message.email}</h3>
                            </div>
                            <p>{message.message}</p>
                        </div>
                    )) : <p>No messages</p>
                }
            </div>
        </div>    
    )
}