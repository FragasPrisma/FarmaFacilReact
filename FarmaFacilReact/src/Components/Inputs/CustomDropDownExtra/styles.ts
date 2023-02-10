import { Dropdown } from "react-bootstrap";
import styled from "styled-components";

export const DropdownCustom = styled(Dropdown.Toggle)`

   height: 28px;
   width: 22px;
   padding: 0;
   :not(.btn-check) {
    border-color: transparent !important;
   }
   ::after{
      border: none;
   }
`