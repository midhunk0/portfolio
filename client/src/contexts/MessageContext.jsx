/* eslint-disable react-refresh/only-export-components */
// @ts-nocheck
/* eslint-disable react/prop-types */
// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

const MessageContext = createContext(null);

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const apiUrl = import.meta.env.MODE === "development"
        ? import.meta.env.VITE_APP_DEV_URL
        : import.meta.env.VITE_APP_PROD_URL;

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`${apiUrl}/fetchMessages`, {
                    method: "GET",
                    credentials: "include"
                });

                const result = await response.json();
                setMessages(result.messages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [apiUrl]);

    return (
        <MessageContext.Provider value={{ messages }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessages = () => useContext(MessageContext);
