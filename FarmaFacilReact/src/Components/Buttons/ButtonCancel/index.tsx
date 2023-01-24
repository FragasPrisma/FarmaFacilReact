import { NavLink } from "react-router-dom";
import { ButtonCancelMain } from "./styles";

interface IProps {
  to?: string;
  text?: string;
  onClickCancel?: () => void;
}

export function ButtonCancel({ to, text, onClickCancel }: IProps) {
  return (
    <>
      {to  ? (
        <NavLink className="text_link" to={`/${to}`}>
          <ButtonCancelMain>
            {text == null ? "Cancelar" : text}
          </ButtonCancelMain>
        </NavLink>
      ) : (
        <ButtonCancelMain onClick={onClickCancel}>
            {text == null ? "Cancelar" : text}
          </ButtonCancelMain>
      )}
    </>
  );
}
