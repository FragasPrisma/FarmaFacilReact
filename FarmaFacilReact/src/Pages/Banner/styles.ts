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
.span-container{
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

.text-danger-erro{
    color: #cf0209;
    font-size: .9rem;
    font-weight: 600;
    margin-top: 0.5rem;
}

`