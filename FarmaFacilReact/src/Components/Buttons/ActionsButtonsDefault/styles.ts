import styled from 'styled-components';

const Button = styled.button`
    background-color: transparent;
    border:none;
`;

export const Container = styled.div`
    gap:40px;
    display:flex; 
    align-items: center;
    justify-content: space-around;
`

export const DeleteButton = styled(Button)`
`;

export const EditButton = styled(Button)`
`;

export const DetailsButton = styled(Button)`
`;
export const ExtraButton = styled(Button)`
`;