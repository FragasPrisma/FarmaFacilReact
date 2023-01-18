import styled from "styled-components";
import { Outlet } from "react-router-dom";

export const LayoutContainer = styled.div`
  .container_main {
    display: flex;
  }
  .container_body_content {
    margin-top: 0.687rem;
    margin-left: 2.812rem;
    width: calc(100% - 330px);
  }
`;

export const ContainerMain = styled.div``;
