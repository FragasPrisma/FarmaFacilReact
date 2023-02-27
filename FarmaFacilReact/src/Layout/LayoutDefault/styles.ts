import styled from "styled-components";

export const LayoutContainer = styled.div`

display: flex;

.container_outlet {
  height: calc(100vh - 5.68rem);
  max-height: 300rem;
  width: 110rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
}

.container_outlet::-webkit-scrollbar {
  width: 0.4em;
  background-color: #ECECEC;
}

.container_outlet::-webkit-scrollbar-thumb {
  background-color: #cf0209;
}

.container_outlet::-webkit-scrollbar-thumb:hover {
  background-color: #cf0209;
}


`;

export const ContainerMain = styled.div``;
