import styled from 'styled-components';

export const ContainerInput = styled.div`

    .divError{
        background-color: transparent;
        height: 20px;
        width: 100%;
    }

    margin-top: 0.5rem;
    width: 100%;

    .containerAbc{
        border: none;
        border-bottom: 3px solid black;
        border-radius: 4px;
        height: 50px;
        background-color: #ECECEC;
    }

    .label_text{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 800;
        color: #272727;
        font-size: 0.6rem;
        margin-left: 0.5rem;
    }
    .container_sup{
        height: 1rem;
        padding-top: 0.2rem;
        display: flex;
        background-color: #ECECEC;
    }
`

export const LabelRequired = styled.label`
    color: red;
    margin-left: 0.5rem;
`;

export const CustomSelectContainer = styled.select`
    margin-top: 0.5rem;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 100% !important;
    background-color: #ECECEC;
    border: none;

    .error{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 400;
        color: red;
        font-size: 0.8rem;
        height: .2rem;
    }

    button{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 400;
        color: #272727;
        font-size: 0.8rem;
        width: 100% !important;
        display: flex;
        justify-content: space-between;
        height: 2.5rem;
        margin-top:-3px;
    }

    button:hover{
        background-color: #ececec;
        border-bottom: 3px solid black;
    }

    .show{
        border: none;
    }

    .show , button{
        background-color: #ececec;
        border-bottom: 3px solid black;
    }

    button:disabled{
        background-color: #a5a1a157;
        border-bottom: 3px solid black !important;
        border: none;
    }

`