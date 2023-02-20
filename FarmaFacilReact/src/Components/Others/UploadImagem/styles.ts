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
.container-btn{
    background-color: #ececec;
    width: 24rem;
    border-radius: 6px;
    margin: 0px;
}
.span-banner{
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
.text-erro{
    color: rgb(207, 2, 9);
    font-size: 1rem;
    font-weight: 600;
}
.imgLabel {
    cursor: pointer;
}
.deleteButton{
    cursor: pointer;
    width: 2rem;
    border: none;
    background: none;
}
.div-span-banner{
    display: flex;
    align-items: center;
    gap: 1rem;
}
`