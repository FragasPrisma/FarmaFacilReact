import styled from "styled-components";

export const MenuSidebar = styled.aside`
  width: 17rem;
  height: calc(100vh - 5.68rem);
  background: #cf0209;
  display: flex;
  flex-direction: column;
  align-items: center;

  .container_menu {
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    width: 80%;
    height: 3rem;
    margin-top: 1.5rem;

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
    list-style: none;
  }

  .navLink {
    text-decoration: none;
    color: #fff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.3rem;
  }

  .container_items_menu {
    width: 80%;
    padding: 0.3rem 0.5rem;
  }

  .li_itens {
   // padding: 0.12rem 0rem;
  }
`;
