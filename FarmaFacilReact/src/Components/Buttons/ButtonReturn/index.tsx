import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { ButtonReturnMain } from "./styles";

interface Props {
    to?: string;
    text?: string;
}

export function ButtonReturn(props: Props) {
    const { t } = useTranslation();
    return (
        <NavLink className="text_link" to={`/${props.to}`}>
            <ButtonReturnMain>{props.text == null ? t("btns.voltar") : props.text}</ButtonReturnMain>
        </NavLink>
    );
}