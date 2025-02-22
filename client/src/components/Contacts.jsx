// @ts-nocheck
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";

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
            if(response.ok){
                console.log(result.message);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <div className="contacts">
            <h1>Contacts</h1>
            <div className="contactContents">
                <img className="svg" src="./round.svg"/>
                <div className="contactsDetails">
                    <div className="contact top">
                        <div className="contactDetails">
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=midhunrajk009@gmail.com">
                                <img src="./mail.png" alt="mail"/>
                            </a>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=midhunrajk009@gmail.com">
                                <h3>email</h3>
                            </a>
                        </div>
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=midhunrajk009@gmail.com">
                            <img src="./arrow.png" alt="arrow"/>
                        </a>
                    </div>
                    <div className="contact middle">
                        <div className="contactDetails">
                            <a href="https://www.linkedin.com/in/midhunraj-k/">
                                <img src="./linkedin.png" alt="mail"/>
                            </a>
                            <a href="https://www.linkedin.com/in/midhunraj-k/">
                                <h3>linkedin</h3>
                            </a>
                        </div>
                        <a href="https://www.linkedin.com/in/midhunraj-k/">
                            <img src="./arrow.png" alt="arrow"/>
                        </a>
                    </div>
                    <div className="contact bottom">
                        <div className="contactDetails">
                            <a href="https://github.com/midhunk0">
                                <img src="./github.png" alt="mail"/>
                            </a>
                            <a href="https://github.com/midhunk0">
                                <h3>github</h3>
                            </a>
                        </div>
                        <a href="https://github.com/midhunk0">
                            <img src="./arrow.png" alt="arrow"/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="message">
                <div className="text">
                    <h2>Ready to bring your project to life? Let&apos;s talk!</h2>
                </div>
                <form className="form" onSubmit={sendMessage}>
                    <input type="text" placeholder="Name" value={messageDetails.name} onChange={(e)=>setMessageDetails({...messageDetails, name: e.target.value})}/>
                    <input type="email" placeholder="Email" value={messageDetails.email} onChange={(e)=>setMessageDetails({...messageDetails, email: e.target.value})}/>
                    <textarea placeholder="Text" value={messageDetails.message} onChange={(e)=>setMessageDetails({...messageDetails, message: e.target.value})}/>
                    <button type="submit" onClick={sendMessage}>send<img src="./white-arrow.png" alt="arrow"/></button>
                </form>
            </div>
        </div>
    )
};

export default Contacts;