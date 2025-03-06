// @ts-nocheck
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute=({ children })=>{
    const [isAuthenticated, setIsAuthenticated]=useState(false);

    const environment=import.meta.env.MODE;
    const apiUrl=environment==="development"
        ? import.meta.env.VITE_APP_DEV_URL
        : import.meta.env.VITE_APP_PROD_URL

    const location=useLocation();

    useEffect(()=>{
        const verifyUser=async()=>{
            try{
                const response=await fetch(`${apiUrl}/fetchUser`, {
                    method: "GET",
                    credentials: "include"
                });
                setIsAuthenticated(response.ok);
            } 
            catch(error){
                setIsAuthenticated(false);
                console.log("Error while veriying user: ", error);
            }
        };

        verifyUser();
    }, [location.pathname, apiUrl]);

    return isAuthenticated ? children : <Navigate to="/login"/>;
};
