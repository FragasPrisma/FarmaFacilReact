import styled from "styled-components";

export const ContainerPaginations = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 2rem;
    a{color: #cf0209};
    a:hover{color: #5b6873};
    span{
        background-color: #cf0209 !important;
        border: none;
    }

    .EllipsisBackGroud span{
        background: transparent !important;
    }
`;