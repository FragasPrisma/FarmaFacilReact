import React, { useContext } from "react";
import { AuthContext } from "../../Context/auth";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./HomePage.css";
import logo from "../../assets/img/logoFFW.jpg";

export function HomePage() {
    const { logout } = useContext(AuthContext);

    const deslogar = () => {
        logout();
    }
    return (
        <>
            <div className="title">
                <img src={logo} className="logo"></img>
                <button onClick={deslogar} id="botaoSair">Sair</button>
            </div>
            <div className="NavBar">
                <Sidebar />
            </div>
        </>
    )
}