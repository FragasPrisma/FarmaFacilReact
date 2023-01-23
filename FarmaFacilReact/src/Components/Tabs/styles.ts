import styled from "styled-components";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export const DivCustom = styled.div`
    
    .nav-item{
        background-color: #ECECEC;
        border-bottom: 0.4rem solid ;
        margin: 0 !important;
    }

    .nav-item .active{
        background-color: #ECECEC;
        border-bottom: 0.2rem solid ;
        border: none;
        color: red;
    }

    .nav-link{
        border: none ;
        color: #272727;
    }

    .nav-link:hover {
        border: none ;
    }

`

export const TabsCustom = styled(Tabs)`
    margin-top: 1rem;
    width: 60%;
    margin-right: 0!important;
    border: none ;
    border-top-left-radius: 0 ;
    border-top-right-radius: 0 ;
    font-weight: 700 ;
    font-size: .8rem ;

`
export const TabCustom = styled(Tab)`
    
`