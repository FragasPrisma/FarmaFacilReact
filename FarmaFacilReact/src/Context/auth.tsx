import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession } from "../Services/Api";

export type AuthContextType = {
  authenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authentication, setAuthentication] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token != null || undefined) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

    const login = async (email: string, password: string) => {
        const response = await createSession(email, password);
        const token = response.data;

    localStorage.setItem("token", token);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    if (token) setAuthentication(true);

    navigate("/Dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: authentication, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
