import { ButtonIncluirMain } from "./styles";
<<<<<<< Updated upstream
import { NavLink } from "react-router-dom";
=======
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
>>>>>>> Stashed changes

interface Props {
  text?: string;
}

export function ButtonIncluir(props: Props) {
<<<<<<< Updated upstream
=======

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

>>>>>>> Stashed changes
  return (
    <NavLink className="text_link" to="create">
      <ButtonIncluirMain>{props.text == null ? "Incluir" : props.text}</ButtonIncluirMain>
    </NavLink>
  );
}
