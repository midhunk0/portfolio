// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate=useNavigate();

    const apiUrl=import.meta.env.MODE==="development"
        ? import.meta.env.VITE_APP_DEV_URL
        : import.meta.env.VITE_APP_PROD_URL;

    const [loginData, setLoginData]=useState({
        credential: "",
        password: ""
    });
    const [visible, setVisible]=useState(false);

    async function login(e){
        e.preventDefault();
        try{
            const response=await fetch(`${apiUrl}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
                credentials: "include"
            });
            const result=await response.json();
            if(response.ok){
                navigate("/dashboard");
                console.log(result.message);
            }
            else{
                console.log("Error: ", result.message);
            }
        }
        catch(error){
            console.log("Error while login user: ", error.message);
        }
    };

    return(
        <div className="login">
            <h1>Welcome Back.</h1>
            <form onSubmit={login}>
                <input type="text" placeholder="Username or Email" value={loginData.credential} onChange={(e)=>setLoginData({...loginData, credential: e.target.value})}/>
                <div className="password">
                    <input type={visible ? "text" : "password"} placeholder="Password" value={loginData.password} onChange={(e)=>setLoginData({...loginData, password: e.target.value})}/>
                    <img src={visible ? "/visible.png" : "visible-off.png"} alt="visible" onClick={()=>setVisible(!visible)}/>
                </div>
                <button type="submit" onClick={login}>Login<img src="/white-arrow.png" alt="arrow"/></button>
            </form>
            <p>
                Don&apos;t have an account? <a href="/register">Register</a>
            </p>
        </div>
    )
}