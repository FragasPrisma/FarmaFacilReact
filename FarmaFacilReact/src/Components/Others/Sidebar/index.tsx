import { CaretDown, CaretRight, CaretUp, ListPlus, X } from "phosphor-react";
import { MenuSidebar, NavLinkCustom } from "./styles";
import { SetStateAction, useState } from "react";
import { namesItemsMenu } from "../../../Enum/namesItemsMenu";

// export function Sidebar() {
//   const [stateArrow, setStateArrow] = useState(false);

//   const openMenu = () => {
//     setStateArrow(!stateArrow);
//   };

//   const [activeSubMenu, setActiveSubMenu] = useState("");

//   const handleSubMenuClick = (subMenu: SetStateAction<string>) => {
//     if (activeSubMenu === subMenu) {
//       setActiveSubMenu("");
//     } else {
//       setActiveSubMenu(subMenu);
//     }
//   };

//   return (
//     <MenuSidebar>
//       <h3 className="title_menu">Menu</h3>
//       <div className="container_menu" onClick={openMenu}>
//         <div className="cadastro_menu">
//           <ListPlus size={20} color="#fff" />
//           <h3 className="title_menu_options">Arquivo</h3>

//           {stateArrow ? (
//             <div className="caret">
//               <CaretDown size={20} color="#fff" />
//             </div>
//           ) : (
//             <div className="caret">
//               <CaretUp size={20} color="#fff" />
//             </div>
//           )}
//         </div>
//       </div>

//       {stateArrow && (
//         <div className="container_items_menu">
//           <ul className="ul_menu">
//             {namesItemsMenu.map((item) => (
//               <li key={item.titulo} className="li_itens">
//                 {item.hasSubMenu && (
//                   <div
//                     className="container_itens_menu"
//                     onClick={() => handleSubMenuClick(item.titulo)}
//                   >
//                     {/* <img className="img_options" src={item.img}  /> */}
//                     {item.titulo}
//                     {activeSubMenu === item.titulo ? (
//                       <CaretUp />
//                     ) : (
//                       <CaretDown />
//                     )}
//                   </div>
//                 )}

//                 {item.hasSubMenu && activeSubMenu === item.titulo && (
//                   <ul>
//                     {item.subMenu.map((subMenu) => (
//                       <li key={subMenu.titulo} className="li_itens">
//                         <NavLinkCustom to={subMenu.link}>
//                           {subMenu.titulo}
//                         </NavLinkCustom>
                        
//                       </li>
//                     ))}
//                   </ul>
//                 )}  
//               </li>
//               ))} 
//           </ul>
//         </div>
//       )}
//     </MenuSidebar>
//   );
// }







export function Sidebar() {
  const [stateArrow, setStateArrow] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const [activeSubSubMenu, setActiveSubSubMenu] = useState("");

  const openMenu = () => {
    setStateArrow(!stateArrow);
  };

  const handleSubMenuClick = (subMenu: SetStateAction<string>) => {
    if (activeSubMenu === subMenu) {
      setActiveSubMenu("");
    } else {
      setActiveSubMenu(subMenu);
      setActiveSubSubMenu("");
    }
  };

  const handleSubSubMenuClick = (subSubMenu: SetStateAction<string>) => {
    if (activeSubSubMenu === subSubMenu) {
      setActiveSubSubMenu("");
    } else {
      setActiveSubSubMenu(subSubMenu);
    }
  };

  return (
    <MenuSidebar>
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
                  <div
                    className="container_itens_menu"
                    onClick={() => handleSubMenuClick(item.titulo)}
                  >
                    {/* <img className="img_options" src ={item.img} /> */}
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
                    {subMenu.hasSubSubMenu && (
                      <div
                        className="container_itens_menu"
                        onClick={() =>
                          handleSubSubMenuClick(subMenu.titulo)
                        }
                      >
                        {subMenu.titulo}
                        {activeSubSubMenu === subMenu.titulo ? (
                          <CaretUp />
                        ) : (
                          <CaretDown />
                        )}
                      </div>
                    )}

                    {subMenu.hasSubSubMenu &&
                      activeSubSubMenu === subMenu.titulo && (
                        <ul>
                          {subMenu.subSubMenu.map((subSubMenu) => (
                            <li key={subSubMenu.titulo} className="li_itens">
                              <NavLinkCustom to={subSubMenu.link}>
                                {subSubMenu.titulo}
                              </NavLinkCustom>
                            </li>
                          ))}
                        </ul>
                      )}

                    {!subMenu.subSubMenu && (
                      <NavLinkCustom to={subMenu.link}>
                        {subMenu.titulo}
                      </NavLinkCustom>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {!item.hasSubMenu && (
              <NavLinkCustom to={item.link}>{item.titulo}</NavLinkCustom>
            )}
          </li>
        ))}
      </ul>
    </div>
  )}
</MenuSidebar>
);
}