import { CaretDown, CaretRight, CaretUp, ListPlus, X } from "phosphor-react";
import { MenuSidebar, NavLinkCustom } from "./styles";
import { SetStateAction, useState } from "react";
import { namesItemsMenu, namesItemsMenu01 } from "../../../Enum/namesItemsMenu";

export function Sidebar() {
  const [stateArrow, setStateArrow] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const [stateArrowPagar, setStateArrowPagar] = useState(false);
  const [activeSubMenuPagar, setActiveSubMenuPagar] = useState("");

  const openMenuPagar = () => {
    setStateArrowPagar(!stateArrowPagar);
    setStateArrow(false);
  };


  const openMenu = () => {
    setStateArrow(!stateArrow);
    setStateArrowPagar(false);
  };



  const handleSubMenuClick = (subMenu: SetStateAction<string>) => {
    if (activeSubMenu === subMenu) {
      setActiveSubMenu("");
    } else {
      setActiveSubMenu(subMenu);
    }
  };



  const handleSubMenuClickPagar = (subMenuPagar: SetStateAction<string>) => {
    if (activeSubMenuPagar === subMenuPagar) {
      setActiveSubMenuPagar("");
    } else {
      setActiveSubMenuPagar(subMenuPagar);
    }
  };

  return (
    <>
    <MenuSidebar>
 {/* Arquivo */}
      <h3 className="title_menu">Menu</h3>
      <div className="container_menu" onClick={openMenu}>
        <div className="cadastro_menu">
          <ListPlus size={20} color="#fff" />
          <h3 className="title_menu_options">Arquivo</h3>

          {stateArrow ? (
            <div className="caret">
              <CaretDown size={20} color="#fff" />
            </div>
          ) : (
            <div className="caret">
              <CaretUp size={20} color="#fff" />
            </div>
          )}
        </div>
      </div>

      {stateArrow && (
        <div className="container_items_menu">
          <ul className="ul_menu">
            {namesItemsMenu.map((item) => (
              <li key={item.titulo} className="li_itens">
                {item.hasSubMenu && (
                  <div className="container_itens_menu" onClick={() => handleSubMenuClick(item.titulo)}>
                    {/* <img className="img_options" src={item.img}  /> */}
                    {item.titulo}
                    {activeSubMenu === item.titulo ? (
                      <CaretUp />
                      ) : (
                        <CaretDown />
                        )}
                  </div>
                )}
                {item.hasSubMenu && activeSubMenu === item.titulo && (
                  <ul>
                    {item.subMenu.map((subMenu) => (
                      <li key={subMenu.titulo} className="li_itens">
                        <NavLinkCustom to={subMenu.link}>
                          {subMenu.titulo}
                        </NavLinkCustom>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        
      )}




 {/* A pagar */}
      <div className="container_menu_a_pagar" onClick={openMenuPagar}>
        <div className="cadastro_menu">
          <ListPlus size={20} color="#fff" />
          <h3 className="title_menu_options">A Pagar</h3>

          {stateArrowPagar ? (
            <div className="caret">
              <CaretDown size={20} color="#fff" />
            </div>
          ) : (
            <div className="caret">
              <CaretUp size={20} color="#fff" />
            </div>
          )}
        </div>
      </div>

      {stateArrowPagar && (
        <div className="container_items_menu">
          <ul className="ul_menu">
            {namesItemsMenu01.map((item) => (
              <li key={item.titulo} className="li_itens">
                {item.hasSubMenu && (
                  <div className="container_itens_menu" onClick={() => handleSubMenuClickPagar(item.titulo)}>
                    {/* <img className="img_options" src={item.img}  /> */}
                    {item.titulo}
                    {activeSubMenuPagar === item.titulo ? (
                      <CaretUp />
                      ) : (
                        <CaretDown />
                        )}
                  </div>
                )}
                {item.hasSubMenu && activeSubMenuPagar === item.titulo && (
                  <ul>
                    {item.subMenu.map((subMenuPagar) => (
                      <li key={subMenuPagar.titulo} className="li_itens">
                        <NavLinkCustom to={subMenuPagar.link}>
                          {subMenuPagar.titulo}
                        </NavLinkCustom>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}




    </MenuSidebar>

      </>

  );
}
