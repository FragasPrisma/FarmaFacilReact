import { Outlet } from "react-router-dom";
import { Header } from "../../Components/Headers/Header";
import { Sidebar } from "../../Components/Others/Sidebar";
import { LayoutContainer } from "./styles";

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <div className="container_main">
        <Sidebar />
        <div className="container_body_content">
          <Outlet />
        </div>
      </div>
    </LayoutContainer>
  );
}
