import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContactId } from "whatsapp-web.js";
import { api, createSession } from "../Services/Api";

export type AuthContextType = {
    authenticated: boolean,
    user: string | null,
    loading: boolean,
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem("User");
        //const token = localStorage.getItem("token");

        //if (recoveredUser && token) {
        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
            //api.defaults.headers.Authorization = `Bearer ${token}`;
        }

        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        //const response = await createSession(email, password);
        console.log("Login Auth", { email, password });
        //console.log("Login", response);

        const userLogged = {
            id: '123',
            email,
        }

        //const userLogged = response.data.user;
        //const token = response.data.token;

        localStorage.setItem("User", JSON.stringify(userLogged));
        //localStorage.setItem("token", token);

        //api.defaults.headers.Authorization = `Bearer ${token}`;
 
        setUser(userLogged);
        navigate("/homepage");
    };

    const logout = () => {
        console.log("logout");
        localStorage.removeItem("User");
        //localStorage.removeItem("token");
        //api.defaults.headers.Authorization = null;
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}