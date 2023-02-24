import { ButtonIncluirMain } from "./styles";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

interface Props {
  text?: string;
}

export function ButtonIncluir(props: Props) {

  const { t } = useTranslation();
  const navigate = useNavigate();

  function handleIncluir(event: any) {
    if (event.key === 'Insert') {
      navigate("create")
    }
  }


  useEffect(() => {
    document.addEventListener('keydown', handleIncluir);
    return () => {
      document.removeEventListener('keydown', handleIncluir);
    };
  }, []);

  return (
    <NavLink className="text_link" to="create">
      <ButtonIncluirMain>{props.text == null ? t("btns.incluir") : props.text}</ButtonIncluirMain>
    </NavLink>
  );
}
