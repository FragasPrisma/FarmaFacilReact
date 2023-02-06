import styled from "styled-components";

export const Container = styled.div`
    margin-right: 0!important;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    input[type="file"] {
    display: none;
}
span{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 800;
    color: #272727;
    font-size: 1rem;
    margin-left: 0.5rem;
}
.container-img{
    width: 290px;
    height: 290px;
}
.imgLabel {
    padding: 9px 4px;
    width: 130px;
    height:37px;
    background-color: #3d55b0;
    color: #FFF;
    text-align: center;
    cursor: pointer;
    border-radius:5px;
}
`