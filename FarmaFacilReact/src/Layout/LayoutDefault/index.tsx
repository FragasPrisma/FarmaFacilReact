import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../store/Language";
import { Outlet } from "react-router-dom";
import { Header } from "../../Components/Headers/Header";
import { Sidebar } from "../../Components/Others/Sidebar";
import { LayoutContainer } from "./styles";
import { useEffect } from "react";
import i18n from "../../i18n";
import { RootState } from "../../store/IRootState";


export function DefaultLayout() {

  const idioma = useSelector((state: RootState) => state.Language.idioma);
  const dispatch = useDispatch();

  useEffect(() => {

    i18n.changeLanguage(idioma);
    
    if (idioma == "pt") {
      i18n.changeLanguage('pt');
      dispatch(changeLanguage({ name: "português", language: "pt" }))
    } else {
      if (idioma == "es") {
        i18n.changeLanguage('es');
        dispatch(changeLanguage({ name: "espanhol", language: "es" }))
      } else {
        i18n.changeLanguage('us');
        dispatch(changeLanguage({ name: "inglês", language: "us" }))
      }
    }
    
  }, [])

  return (
    <>
      <Header />
    <LayoutContainer>
      
       
        <div className="container_menu">
          <Sidebar />
        </div>

        <div className="container_outlet">
          <Outlet />
        </div>


    </LayoutContainer>
    </>
  );
}
