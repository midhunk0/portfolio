// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Messages.css";

export default function Messages(){
    const apiUrl=import.meta.env.MODE==="development"
        ? import.meta.env.VITE_APP_DEV_URL
        : import.meta.env.VITE_APP_PROD_URL;
    const [messages, setMessages]=useState([]);

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
            }
            catch(error){
                console.log(error);
            }
        }
        
        fetchMessages();
    }, [apiUrl]);

    return(
        <div className="dashboard-messages">
            <h1>Messages.</h1>
            <div className="dashboard-messages-list">
                {/* {messages.map((message, index) => (
                    <div className="dashboard-message" key={index}>
                        <div className="dashboard-message-user">
                            <img src="/user.png" alt="img"/>
                            <h3>{message.email}</h3>
                        </div>
                        <p>{message.message}</p>
                    </div>
                ))} */}
                {[...Array(10)].map((_, index)=>(
                    <div className="dashboard-message" key={index}>
                        <div className="dashboard-message-user">
                            <img src="/user.png" alt="img"/>
                            <h3>message.email</h3>
                        </div>
                        <p>message.message</p>
                    </div>
                ))}
            </div>
        </div>    
    )
}