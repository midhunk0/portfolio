// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const navigate=useNavigate();

    const apiUrl=import.meta.env.MODE==="development"
        ? import.meta.env.VITE_APP_DEV_URL
        : import.meta.env.VITE_APP_PROD_URL;

    const [registerData, setRegisterData]=useState({
        username: "",
        email: "",
        password: ""
    });
    const [visible, setVisible]=useState(false);

    async function register(e){
        e.preventDefault();
        try{
            const response=await fetch(`${apiUrl}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerData),
                credentials: "include"
            });
            const result=await response.json();
            if(response.ok){
                navigate("/messages");
                console.log(result.message);
            }
            else{
                console.log("Error: ", result.message);
            }
        }
        catch(error){
            console.log("Error while registering user: ", error.message);
        }
    };

    return(
        <div className="register">
            <h1 data-cursor="heading">Create User</h1>
            <form onSubmit={register}>
                <input data-cursor="line" type="text" placeholder="Username" value={registerData.username} onChange={(e)=>setRegisterData({...registerData, username: e.target.value})}/>
                <input data-cursor="line" type="email" placeholder="Email" value={registerData.email} onChange={(e)=>setRegisterData({...registerData, email: e.target.value})}/>
                <div className="password">
                    <input data-cursor="line" type={visible ? "text" : "password"} placeholder="Password" value={registerData.password} onChange={(e)=>setRegisterData({...registerData, password: e.target.value})}/>
                    <img data-cursor="icon" src={visible ? "/visible.png" : "visible-off.png"} alt="visible" onClick={()=>setVisible(!visible)}/>
                </div>
                <button data-cursor="button" type="button" onClick={register}>Register<img src="/white-arrow.png" alt="arrow"/></button>
            </form>
            <p>
                Already have an account? <a data-cursor="link" href="/login">Login</a>
            </p>
        </div>
    )
};