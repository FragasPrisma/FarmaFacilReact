import styled from "styled-components";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export const DivCustom = styled.div`
    
    .nav-item{
        background-color: #ECECEC;
        border-bottom: 0.1rem solid black ;
        /* margin-top: -0.7rem; */
    }

    .nav-item .active{
        background-color: #ECECEC;
        border: none;
        border-bottom: 0.2rem solid black ;
        color: rgba(207, 2, 9, 1);
    }

    .nav-link{
        border: none ;
        color: #272727;
        border-bottom: 0.2rem solid black ;
        height: 1.5rem;
    }

    button {
        display: flex;
        align-items: center;
    }

    .nav-link:hover {
        border: none ;
        border-bottom: 0.2rem solid black ;
    }

`

export const TabsCustom = styled(Tabs)`
    
    /* border-top: 1px solid rgba(91, 104, 115, 0.365) !important; */
    margin-top: .2rem;
    width: 100%;
    margin-right: 0!important;
    border: none ;
    border-top-left-radius: 0 ;
    border-top-right-radius: 0 ;
    font-weight: 700 ;
    font-size: .8rem ;

`
export const TabCustom = styled(Tab)`
    
`