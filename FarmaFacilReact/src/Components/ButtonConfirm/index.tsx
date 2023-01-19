import { NavLink } from "react-router-dom";
import { ButtonConfirmMain } from "./styles";

interface Props {
    to: string;
    onCLick?: () => void
}

export function ButtonConfirm({to, onCLick}: Props) {
    return (
        <NavLink className="text_link" to={`/${to}`}>
            <ButtonConfirmMain onClick={onCLick}>Confirmar</ButtonConfirmMain>
        </NavLink>
    );
}