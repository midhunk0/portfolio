/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// @ts-nocheck
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute=({ children })=>{
    const location=useLocation();
    const apiUrl=import.meta.env.MODE==="development"
        ? import.meta.env.VITE_APP_DEV_URL
        : import.meta.env.VITE_APP_PROD_URL;
    const [isAuthenticated, setIsAuthenticated]=useState(null);

    useEffect(()=>{
        let isMounted=true;

        async function checkAuthCookie(){
            try{
                const response=await fetch(`${apiUrl}/fetchUser`, {
                    method: "GET",
                    credentials: "include"
                });

                if(isMounted){
                    setIsAuthenticated(response.ok);
                }
            }
            catch(error){
                if(isMounted){
                    setIsAuthenticated(false);
                }
            }
        }

        checkAuthCookie();

        return ()=>{
            isMounted=false;
        };
    }, [apiUrl]);

    if(isAuthenticated===null){
        return null;
    }

    if(!isAuthenticated){
        return <Navigate to="/" replace state={{ from: location }}/>;
    }

    return children;
}

export default ProtectedRoute;
