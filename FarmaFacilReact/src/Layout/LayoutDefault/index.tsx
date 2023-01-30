import { Outlet } from "react-router-dom";
import { Header } from "../../Components/Headers/Header";
import { Sidebar } from "../../Components/Others/Sidebar";
import { LayoutContainer } from "./styles";

export function DefaultLayout() {

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
