// @ts-nocheck
/* eslint-disable no-unused-vars */
import React from "react";
import "./Contacts.css";
import { useState } from "react";

const contacts=[
    {
        name: "github",
        link: "https://github.com/midhunk0",
        img: "/github.png"
    },
    {
        name: "linkedin",
        link: "https://www.linkedin.com/in/midhunraj-k",
        img: "/linkedin.png"
    },
    {
        name: "instagram",
        link: "https://www.instagram.com/_midhun0_",
        img: "/instagram.png"
    }
]

function Contacts(){
    const [messageDetails, setMessageDetails]=useState({
        name: "",
        email: "",
        message: ""
    });
    
    const apiUrl=import.meta.env.MODE==="development"
        ? import.meta.env.VITE_APP_DEV_URL
        : import.meta.env.VITE_APP_PROD_URL;

    const sendMessage=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch(`${apiUrl}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(messageDetails),
                credentials: "include"
            });
            const result=await response.json();
            console.log(result);
            if(response.ok){
                setMessageDetails({
                    name: "",
                    email: "",
                    message: ""
                });
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <section id="contacts" className="contacts">
            <h1 data-cursor="heading">Contacts</h1>
            <div className="contactContents">
                <img className="svg" src="./round.svg"/>
                <div className="contactsDetails">
                    {contacts.map((contact, index)=>(
                        <div className={`contact ${index===1 ? "middle" : ""}`}key={index}>
                            <a data-cursor="link" href={contact.link}>
                                <img src={contact.img} alt={contact.name}/>
                                <h3>{contact.name}</h3>
                            </a>
                            <a data-cursor="link" href={contact.link}>
                                <img src="./arrow.png" alt="arrow"/>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <div className="contactMessage">
                <div className="text">
                    <h2>Ready to bring your project to life? Let&apos;s talk!</h2>
                </div>
                <form className="form" onSubmit={sendMessage}>
                    <input data-cursor="line" type="text" placeholder="Name" value={messageDetails.name} onChange={(e)=>setMessageDetails({...messageDetails, name: e.target.value})}/>
                    <input data-cursor="line" type="email" placeholder="Email" value={messageDetails.email} onChange={(e)=>setMessageDetails({...messageDetails, email: e.target.value})}/>
                    <textarea data-cursor="line" placeholder="Text" value={messageDetails.message} onChange={(e)=>setMessageDetails({...messageDetails, message: e.target.value})}/>
                    <button data-cursor="button" type="button" onClick={sendMessage}>send<img src="./white-arrow.png" alt="arrow"/></button>
                </form>
            </div>
        </section>
    )
};

export default Contacts;