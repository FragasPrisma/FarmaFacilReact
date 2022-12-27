import React, { useState, useContext} from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { Login } from "./Pages/Login/Login";
import { HomePage } from "./Pages/HomePage/HomePage";
import { AuthProvider, AuthContext } from "./Context/auth";

export function AppRoutes() {
    const Private = ({ children }: any) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading">Carregando...</div>
        }

        if (!authenticated) {
            return <Navigate to='/login' />
        }

        return children;
    } 

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/homepage" element={<Private><HomePage/></Private>} />
                    
                </Routes>
            </AuthProvider>
        </Router>
    )
}