import { ButtonIncluirMain } from "./styles";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props{
  text?: string;
}

export function ButtonIncluir(props: Props) {
  const { t } = useTranslation();
  return (
    <NavLink className="text_link" to="create">
      <ButtonIncluirMain>{props.text == null ? t("btns.incluir") : props.text}</ButtonIncluirMain>
    </NavLink>
  );
}
