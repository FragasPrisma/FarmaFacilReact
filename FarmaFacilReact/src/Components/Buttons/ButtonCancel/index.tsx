import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { ButtonCancelMain } from "./styles";

interface IProps {
  to?: string;
  text?: string;
  onClickCancel?: () => void;
}

export function ButtonCancel({ to, text, onClickCancel }: IProps) {
  const { t } = useTranslation();
  return (
    <>
      {to  ? (
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
