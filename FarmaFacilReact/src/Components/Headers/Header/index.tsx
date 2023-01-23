import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/auth";
import LogoFarmafacil from "../../../assets/img/logoFFW.jpg";
import { UserCircle } from "phosphor-react";
import { NavLink } from "react-router-dom";

import {
  ContainerHeader,
  ContainerLogo,
  ImageLogo,
  ButtonLogout,
  ContainerLogout,
  ContainerDescription,
} from "./styles";

export function Header() {
  const [state, setState] = useState(false);
  const { logout } = useContext(AuthContext);

  const deslogar = () => logout();

  const stateDesconect = () => {
    return setState(!state)
  };

  return (
    <ContainerHeader>
      <ContainerLogo>
        <NavLink to="/dashboard">
          <ImageLogo src={LogoFarmafacil} />
        </NavLink>
      </ContainerLogo>

      <ContainerLogout>
        <ContainerDescription>
          <h4 className="name_user_login">Prismafive</h4>
          <span className="acess_type_login">Admin</span>
        </ContainerDescription>

        <ButtonLogout onClick={stateDesconect}>
          <UserCircle size={50} />
          {state && (
            <div>
              <span onClick={deslogar}>Desconectar</span>
            </div>
          )}
        </ButtonLogout>
      </ContainerLogout>
    </ContainerHeader>
  );
}
