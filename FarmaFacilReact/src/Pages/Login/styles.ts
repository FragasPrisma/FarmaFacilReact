import { Dropdown } from "react-bootstrap";
import styled from "styled-components";

export const DropdownCustom = styled(Dropdown.Toggle)`

  :hover{
    border: 1px solid rgb(232, 2, 10);
    color: rgb(91, 104, 115);
  }

  .text-image{
    margin-right: .5rem;
    font-size: 12px;
    font-weight: 600;
    color: rgb(91, 104, 115);
  }
    
  height: 28px;
  width: 22px;
  padding: 0;
  cursor: pointer;
  width: 10rem;
  height: 2.5rem;
  border: 1px solid rgb(232, 2, 10);
  border-radius: 20px;
  padding: 0.5rem;
  color: rgb(91, 104, 115);
  font-weight: 500;
  font-size: 15px;

  img{
    margin-right: .5rem;
    width: 18px;
    height: 14px;
  }
`

export const Container = styled.div`

  .images{
    width: 18px;
    height: 14px;
  }
  .text-option{
    font-size: 12px;
    font-weight: 600;
    color: rgb(91, 104, 115);
    margin-left: 0.5rem;
  }
  
  border: 1px solid #f1f1f1;
  display: flex;
  align-items: center;

  margin: 8% auto;
  gap: 1rem;

  height: calc(80% - 80px);
  width: calc(80% - 200px);
  border-radius: 8px;
  padding: 5rem 5rem;
  box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;


  position: fixed;
  left: 50%;
  transform: translateX(-50%);


  background-image: url(/src/assets/img/bg-pills.0a473e12.png);
    background-size: cover;
    background-position-y: -25rem;
    background-position-x: -35rem;
    background-repeat: no-repeat;

    @media screen and (max-width: 1500px){
      background-position-y: -15rem;
      background-position-x: -25rem;
      .container_lenguage{
        width: 100% !important;
      }
    }

    .text-erro{
      color: rgb(207, 2, 9);
      font-size: 0.9rem;
      font-weight: 600;
      width: 80%;
      height: 1rem;
      padding-left: 1rem;
    }

  .container_logo {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container_form {
    width: 100%;
    border-left: 1px solid #e8020a;
    padding: 1.5rem;
  }

  .imagem_login {
    width: 60%;
  }

  .form {
    width: 100%;
    max-width: 480px;
    padding: 0.5rem;
  }

  .button_submit {
    border: none;
    background: #e8020a;
    width: 9rem;
    height: 2rem;
    border-radius: 4px;
    color: #fff;
    font-weight: 600;
    font-size: 0.9rem;
  }
  .inputs {
    border: none;
    box-shadow: 6px 6px 8px rgb(99 99 99 / 35%);
    height: 3rem;
    border-radius: 4px;
    width: 100%;
    max-width: 25rem;
    margin: 0.7rem;
    padding-left: 1rem;
  }

  .title_form {
    color: #e8020a;
    font-weight: 700;
    font-size: 2.5rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  .text_acess {
    color: #5b6873;
    padding-top: 1rem;
  }
  .url_esqueceu_senha {
    color: #e8020a;
    cursor:pointer;
    font-weight: 600;
  }
  .esqueceu {
    color: #5b6873;
    padding-top: 1rem;
  }
  .footer{
    margin: 1rem;
  }

  .container_lenguage{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    align-items: center;
  }

  .select-lenguage{
    cursor: pointer;
    width: 10rem;
    height: 2.5rem;
    border: 1px solid rgb(232, 2, 10);
    border-radius: 20px;
    padding: 0.5rem;
    color: rgb(91, 104, 115);
    font-weight: 500;
    font-size: 15px;
  }
`;