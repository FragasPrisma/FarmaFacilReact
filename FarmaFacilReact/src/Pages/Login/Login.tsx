import "./Login.css";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/auth";
import logo from "../../assets/img/logoFFW.jpg";

export function Login() {
    const { authenticated, login }: any = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("submit", { email, password });
        login(email, password);
    };

    return (
        <div id="login">
            <div id="logo">
                <img src={logo}></img>
            </div>
            <h2>Realize seu Login</h2>
            <p>{String(authenticated)}</p>
            <form className="form" onSubmit={ handleSubmit }>
                <div className="field">
                    <label className="email">Email</label>
                    <input 
                        type="email"
                        name="email"
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label className="password">Senha</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="actions">
                    <button type="submit">Entrar</button>
                </div>
            </form>
        </div>
    );
}
