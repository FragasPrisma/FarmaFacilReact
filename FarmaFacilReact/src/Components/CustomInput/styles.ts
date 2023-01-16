import styled from 'styled-components';

export const ContainerInput = styled.div`
    margin-top: 0.5rem;
    background-color: #ECECEC;
    width: 100%;

    .containerAbc{
        border: none;
        border-bottom: 3px solid black;
        border-radius: 3px;
        //display: flex;
        //flex-direction: column;
        height: 50px;
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
        color: #272727;
        font-size: 0.8rem;
    }
    background-color: transparent;
    border: none;
    width: calc(100% - 0.8rem);
    height: calc(100% - 16px);
    margin-left: 0.5rem;
`