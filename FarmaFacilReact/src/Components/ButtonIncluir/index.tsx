import { ButtonIncluirMain } from "./styles";
import { NavLink } from "react-router-dom";

export function ButtonIncluir() {
  return (
    <NavLink className="text_link" to="create">
      <ButtonIncluirMain>Incluir</ButtonIncluirMain>
    </NavLink>
  );
}
