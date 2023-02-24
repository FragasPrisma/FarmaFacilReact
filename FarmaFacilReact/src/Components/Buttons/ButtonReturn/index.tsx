import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { ButtonReturnMain } from "./styles";
import { useEffect } from "react";

interface Props {
    to?: string;
    text?: string;
}

export function ButtonReturn(props: Props) {

    const navigate = useNavigate();

    function handleReturn(event: any) {
        if (event.key === 'Escape') {
            if (props.to) {
                navigate(`/${props.to}`)
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
        <NavLink className="text_link" to={`/${props.to}`}>
            <ButtonReturnMain>{props.text == null ? t("btns.voltar") : props.text}</ButtonReturnMain>
        </NavLink>
    );
}