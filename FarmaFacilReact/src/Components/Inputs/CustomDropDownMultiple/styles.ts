import { Dropdown, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

export const CustomDropDownContainer = styled(Dropdown)`

    margin-top: 0.5rem;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 100% !important;

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
    .dropdown-menu{
        background-color: #ececec;
        border:1px solid;
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

    .dropdown-menu input{
        background-color: #ffffffba;
        border-radius: 0;
        border-bottom:1px solid;
        font-weight: 400;
        color: #272727;
        font-size: 0.8rem;
    }
    .dropdown-menu a{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 400;
        color: #272727;
        font-size: 0.8rem;
    }
    
`
export const CustomFormControlContainer = styled(FormControl)`
    background-color: transparent;
    width: 100% !important;
`

export const ContainerSuperiorDropDown = styled.div`

    .label_text{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 800;
        color: #272727;
        font-size: 0.6rem;
        margin-left: 0.5rem;
        margin-right: 5px;
    }

    width: 100%;
    height: 1rem;
    padding-top: 0.2rem;
    display: flex;
    background-color: #ECECEC;

`