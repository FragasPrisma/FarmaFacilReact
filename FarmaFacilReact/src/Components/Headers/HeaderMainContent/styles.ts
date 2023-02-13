import styled from 'styled-components';
import Form from 'react-bootstrap/Form';


export const ContainerHeaderMain = styled.div`
display: flex;
justify-content: space-between;
padding: 1rem;
border-bottom: 1px solid rgba(91, 104, 115, 0.365);
`
export const TitleMainHeader = styled.h3`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 2rem;
    color: #CF0209;
    font-weight: 800;
`

export const SwitchCustom = styled(Form)`

    label{
        color: #5b6873;
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: .8rem;
    }
    .form-check-input{
        box-shadow: none;
        cursor:pointer;
    }
    input:checked{
        background-color: #CF0209;
        border-color: transparent;
        box-shadow: none;
    }

`
