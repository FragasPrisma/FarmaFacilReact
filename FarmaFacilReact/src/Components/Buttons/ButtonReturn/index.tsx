<<<<<<< Updated upstream
import { NavLink } from "react-router-dom";
=======
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
>>>>>>> Stashed changes
import { ButtonReturnMain } from "./styles";
import { useEffect } from "react";

interface Props {
    to?: string;
    text?: string;
}

export function ButtonReturn(props: Props) {
<<<<<<< Updated upstream
=======

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
>>>>>>> Stashed changes
    return (
        <NavLink className="text_link" to={`/${props.to}`}>
            <ButtonReturnMain>{props.text == null ? "Voltar" : props.text}</ButtonReturnMain>
        </NavLink>
    );
}