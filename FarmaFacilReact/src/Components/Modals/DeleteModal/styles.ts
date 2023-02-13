
import styled from "styled-components";

export const CloseButton = styled.button`
  background-color: transparent;
  color: red;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  width: 4rem;
  height: 2.3rem;
  border: none;
  border-radius: 4px;
  margin-left: 1rem;
`;
export const MensageDefault = styled.h1`
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 12rem;
  justify-content: space-between;

  .div_btn {
    display: flex;
    justify-content: end;
    padding-bottom: 1rem;
  }

  .div_text {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .container_buttons{
    padding-left: 1.5rem;
    width: 100%;
  }
`;
