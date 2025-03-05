// @ts-nocheck
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/MessageContext";
import React from "react";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated === null) {
        return <p>Loading...</p>; // Wait until fetching is complete
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
