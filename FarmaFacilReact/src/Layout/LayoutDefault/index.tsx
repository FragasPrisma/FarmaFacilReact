import { Outlet } from "react-router-dom";
import { Header } from "../../Components/Header";
import { Sidebar } from "../../Components/Sidebar";
import { LayoutContainer  } from "./styles";

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
