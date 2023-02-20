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
        height: 100%;
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
    .text-danger-erro{
        color: #cf0209;
        font-size: .9rem;
        font-weight: 600;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

`

export const LabelRequired = styled.label`
    color: red;
    margin-left: 0.5rem;
`;

export const InputCustomized = styled.textarea`
    ::placeholder{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 400;
        color: #272727;
        font-size: 0.8rem;
    }
    margin-top: .5rem;
    background-color: transparent;
    border: none;
    margin-left: .5rem;
    resize: none;
`