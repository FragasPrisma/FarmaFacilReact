import { CaretDown, CaretUp, ListPlus, X } from "phosphor-react";
import { MenuSidebar } from "./styles";
import { useState } from "react";
import { OptionsMenu } from "../../Enum/OptionsMenu";
import { NavLink } from "react-router-dom";

export function Sidebar() {
  const [stateArrow, setStateArrow] = useState(false);

  const openMenu = () => {
    setStateArrow(!stateArrow);
  };

  return (
    <MenuSidebar>
      <h3 className="title_menu">Menu</h3>
      <div className="container_menu" onClick={openMenu}>
        <div className="cadastro_menu">
          <ListPlus size={20} color="#fff" />
          <h3 className="title_menu_options">Cadastros</h3>

          {stateArrow && (
            <div className="caret">
              <CaretUp size={20} color="#fff" />
            </div>
          )}
          {!stateArrow && (
            <div className="caret">
              <CaretDown size={20} color="#fff" />
            </div>
          )}
        </div>
      </div>

      {stateArrow && (
        <div className="container_items_menu">
          <ul className="ul_menu">
            {OptionsMenu[0].text.map((optionMenuItem: any) => (
              <li key={optionMenuItem} className="li_itens">
                <NavLink className="navLink" to={`/${optionMenuItem.toLowerCase()}`}>
                  {optionMenuItem}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </MenuSidebar>
  );
}
