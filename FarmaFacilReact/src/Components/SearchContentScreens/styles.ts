import styled from "styled-components";

export const ContainerSearch = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;

  .title_search {
    color: #5b6873;
    margin-bottom: 0.5rem;
  }
  .container_search {
    display: flex;
    align-items: center;
    background-color: rgba(91, 104, 115, 0.09411764705882353);
    height: 2.5rem;

    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border-radius: 4px;

    img {
      width: 1rem;
      height: 1rem;
      margin-left: 0.5rem;
      cursor:pointer;
    }

    input {
      background-color: transparent;
      border: none;
      width: 100%;
      height: 100%;
      margin-left: 1.3rem;
      color: #5b6873;
    }
  }
`;
