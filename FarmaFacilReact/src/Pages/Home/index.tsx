import React, { useContext } from "react";
import { AuthContext } from "../../Context/auth";
import {Sidebar} from "../../Components/Others/Sidebar";
import logo from "../../assets/img/logoFFW.jpg";
import {UserCircle} from  'phosphor-react'
import { ContainerHeader, ContainerLogo, ContainerSidebar, ContainerInput, Input } from "./styles";

export function Home() {
  const { logout } = useContext(AuthContext);

  const deslogar = () =>  logout()

  return (
    <ContainerHeader>
      <ContainerLogo>
        <img src={logo} className="logo" />
      </ContainerLogo>
      <UserCircle size={42} color="#CF0209" />
    </ContainerHeader>
  );
}
