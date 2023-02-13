import styled from "styled-components";

export const CloseButton = styled.button`
    background-color: transparent;
    color: red;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width: 4rem;
    height: 2.3rem;
    border: none;
    border-radius: 4px;
    margin-left: 1rem;
`
export const MensageDefault = styled.h1`
    text-align: center;
    font-size: 2rem;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    .div_btn {
        display: flex;
        justify-content: end;
    }

    .div_text {
        display: flex;
        justify-content: center;
    }
`