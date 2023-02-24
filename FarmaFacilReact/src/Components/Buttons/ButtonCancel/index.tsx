import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { ButtonCancelMain } from "./styles";
import { useEffect } from "react";
interface IProps {
  to?: string;
  text?: string;
  onClickCancel?: () => void;
}

export function ButtonCancel({ to, text, onClickCancel }: IProps) {

  const navigate = useNavigate()

  function handleReturn(event: any) {
    if (event.key === 'Escape') {
      if (to) {
        navigate(`/${to}`)
      }
    }
  }


  useEffect(() => {
    document.addEventListener('keydown', handleReturn);
    return () => {
      document.removeEventListener('keydown', handleReturn);
    };
  }, []);

  const { t } = useTranslation();

  return (
    <>
      {to ? (
        <NavLink className="text_link" to={`/${to}`}>
          <ButtonCancelMain>
            {text == null ? t("btns.cancelar") : text}
          </ButtonCancelMain>
        </NavLink>
      ) : (
        <ButtonCancelMain onClick={onClickCancel}>
          {text == null ? t("btns.cancelar") : text}
        </ButtonCancelMain>
      )}
    </>
  );
}
