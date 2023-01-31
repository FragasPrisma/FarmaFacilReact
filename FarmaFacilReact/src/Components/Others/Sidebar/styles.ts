import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const MenuSidebar = styled.aside`
  width: 17rem;
  background: #cf0209;
  display: flex;
  flex-direction: column;
  align-items: center;

  height: calc(100vh - 5.68rem);
  max-height: 300rem;
  overflow-y: auto;
  //max-width: 18.1rem;

  ::-webkit-scrollbar {
    width: 0.2em;
    background-color: #cf0209;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ececec;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #cf0209;
  }

  .container_menu {
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    width: 80%;
    height: 3rem;
    margin-top: 1.5rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .title_menu {
    margin-top: 1.75rem;
    color: #fff;
    font-weight: 600;
    font-size: 1.25rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .cadastro_menu {
    margin-left: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title_menu_options {
    padding-left: 1.5rem;
    margin: 0;
    color: #fff;
    font-weight: 400;
    font-size: 1rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .caret {
    padding-left: 4rem;
  }
  
  .list_options {
    display: flex;
    flex-direction: column;
  }
  
  .ul_menu {
    //list-style-type: none;
    //padding-left: 3rem;
    text-decoration: none;
    line-height: 1.8rem;
    width: 95%;
    margin: 0;
    padding-left: 1rem;

  }

  
  .container_items_menu {
    width: 80%;
    padding: 0.3rem 0;
    cursor: pointer;
  }

  .img_options {
    width: 1.5rem;
    height: 1rem;
    padding-right: 0.3rem;
  }
  
  .li_itens{
    list-style-type: none;
    color: #fff;
  }
  ul{
    padding-left: 1rem;
  }

.container_itens_menu{
  display: flex;
  justify-content: space-between;
  //padding-left: 0.5rem;
  align-items: center;
}
  
  `;

  export const NavLinkCustom = styled(NavLink)`
  
    color: #fff;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.3rem;
  
    width: 100%;
    display: flex;
    align-items: center;

    list-style: none;
    text-decoration: none;

    line-height: 1.5rem;
    //padding-left: 3.2rem;
    display: flex;
    justify-content: flex-start;
  
  `

// .navLink {
// }