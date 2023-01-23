import styled from "styled-components";

export const Container = styled.div`
  /* margin-top: 15rem; */
  border: 1px solid #f1f1f1;
  display: flex;
  align-items: center;

  margin: 8% auto;
  gap: 1rem;

  width: 50%;
  border-radius: 8px;
  padding: 5rem 5rem;
  box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;


  position: fixed;
  left: 50%;
  transform: translateX(-50%);


  background-image: url(/src/assets/img/bg-pills.0a473e12.png);
    background-size: cover;
    background-position-y: -17rem;
    background-position-x: -28rem;
    background-repeat: no-repeat;

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
    margin: 0.5rem;
  }

  .title_form {
    color: #e8020a;
    font-weight: 700;
    font-size: 2.5rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  .text_acess {
    color: #5b6873;
  }
  .url_esqueceu_senha {
    color: #e8020a;
  }
  .esqueceu {
    color: #5b6873;
  }
  .footer{
    margin: 0.5rem;
  }

`;
