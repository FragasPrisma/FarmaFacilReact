import { ButtonIncluirMain } from "./styles";
import { NavLink } from "react-router-dom";

interface Props{
  text?: string;
}

export function ButtonIncluir(props: Props) {
  return (
    <NavLink className="text_link" to="create">
      <ButtonIncluirMain>{props.text == null ? "Incluir" : props.text}</ButtonIncluirMain>
    </NavLink>
  );
}
