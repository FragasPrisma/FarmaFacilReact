import styled from "styled-components";

export const Container = styled.div`
    margin-right: 0!important;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
export const ContainerPaginations = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 1rem;
    a{color: #cf0209};
    a:hover{color: #5b6873};
    span{
        background-color: #cf0209 !important;
        border: none;
    }
`;