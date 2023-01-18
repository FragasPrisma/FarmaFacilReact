import styled from "styled-components";
import { Table } from "react-bootstrap";

export const TableCustom = styled(Table)`
  border-collapse: separate;
  border-spacing: 0 0.68rem;
`;

export const TrCustom = styled.tr`
  th {
    padding: 0;
    padding-left: 0.5rem;
    background-color: #fff;
    border: none;
    color: #5b6873;
    font-weight: 500;
  }

  background-color: rgba(91, 104, 115, 0.09411764705882353);
  padding-top: 1rem;

  tbody,
  tr,
  td {
    color: #cf0209;
  }
`;
