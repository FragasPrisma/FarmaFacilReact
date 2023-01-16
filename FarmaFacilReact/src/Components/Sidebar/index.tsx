import { CaretDown, CaretUp, ListPlus, X } from "phosphor-react";
import { MenuSidebar } from "./styles";
import { useState } from "react";
import { OptionsMenu } from "../../Enum/OptionsMenu";

export function Sidebar() {
  const [stateArrow, setStateArrow] = useState(false);

  const openMenu = () => {
    setStateArrow(!stateArrow);
  };


  const ListMenu = (props: any) => {
    const sidebar = (
      <ul>
        {props.map((list:any) =>
          <li key={list.text}>
            {list.text}
          </li>
        )}
      </ul>
    );
    return (
      <div>
        {sidebar}
      </div>
    );
  }


  return (
    <MenuSidebar onClick={openMenu}>
      <h3 className="title_menu">Menu</h3>
      <div className="container_menu">
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

        {stateArrow
        ? ListMenu(OptionsMenu)
        : <></>
      }

        </div>
      </div>
    </MenuSidebar>
  );
}
