import { useContext, useState } from "react";
import { AuthContext } from "../../Context/auth";
import LogoFarmafacil from "../../assets/img/logoFFW.jpg";
import { UserCircle } from "phosphor-react";
import { NavLink } from 'react-router-dom';

import {
  ContainerHeader,
  ContainerLogo,
  ImageLogo,
  ButtonLogout,
  ContainerLogout,
  ContainerDescription,
} from "./styles";

export function Header() {
  const { logout } = useContext(AuthContext);

  const deslogar = () => logout();

  return (
    <ContainerHeader>
      <ContainerLogo>
        
        <NavLink to="/Dashboard">
        <ImageLogo src={LogoFarmafacil} />
        </NavLink>

      </ContainerLogo>

      <ContainerLogout to="/login">
        <ContainerDescription>
          <h4 className="name_user_login">Prismafive</h4>
          <span className="acess_type_login">Admin</span>
        </ContainerDescription>

        <ButtonLogout>
          <UserCircle size={50} />
        </ButtonLogout>
      </ContainerLogout>
    </ContainerHeader>
  );
}
