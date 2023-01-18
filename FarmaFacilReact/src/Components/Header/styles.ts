import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const ContainerHeader = styled.header`
  height: 5.68rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(91, 104, 115, 0.365);
`;

export const ContainerLogo = styled.div`
  #botaoSair {
    float: right;
  }

`;

export const ImageLogo = styled.img`
  max-width: 12rem;
`;

export const ContainerSidebar = styled.div``;

export const ContainerInput = styled.div``;

export const Input = styled.input`
  background: #ececec;
`;

export const ButtonLogout = styled.button`
  display: flex;
  background: transparent;
  border: none;

div{
  width: 8rem;
    height: 1.6rem;
    background-color: #ECECEC;
    position: absolute;
    border-radius: 4px;
    top: 4.7rem;
    right: 1.3rem;
}
  span{
   /* position: absolute;
     top: 4.4rem;
    right: 1.2rem;*/
    font-size: 0.7rem; 
    color: #5b6873;
  }
`;

export const ContainerLogout = styled.div`
  display: flex;
  align-items: center;
  color: transparent;
`;

export const ContainerDescription = styled.div`
  display: table;

  .name_user_login {
    margin: 0;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    color: #5b6873;
    font-size: 1rem;
    font-weight: 600;
  }
  .acess_type_login {
    float: right;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    color: #5b6873;
    font-size: 0.687rem;
    font-weight: 500;
  }
`;
