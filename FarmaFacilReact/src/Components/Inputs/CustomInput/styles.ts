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
        height: 59px;
        background-color: #ECECEC;
    }

    .text-danger-erro{
        color: #cf0209;
        font-size: .9rem;
        font-weight: 600;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
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

export const InputCustomized = styled.input`
    ::placeholder{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 400;
        opacity: 0.7;
        color: #272727;
        font-size: 0.8rem;
        font-style: italic;
    }
    background-color: transparent;
    border: none;
    width: calc(100% - 0.8rem);
    height: calc(100% - 16px);
    margin-left: 0.5rem;
`