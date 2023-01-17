import { NavLink } from "react-router-dom";
import { ButtonConfirmMain } from "./styles";

interface Props {
    to: string;
}

export function ButtonConfirm({to}: Props) {
    return (
        <NavLink className="text_link" to={`/${to}`}>
            <ButtonConfirmMain>Confirmar</ButtonConfirmMain>
        </NavLink>
    );
}