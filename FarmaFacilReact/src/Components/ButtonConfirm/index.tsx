import { NavLink } from "react-router-dom";
import { ButtonConfirmMain } from "./styles";

interface Props {
    onCLick?: () => void
}

export function ButtonConfirm({onCLick}: Props) {
    return (
        <ButtonConfirmMain onClick={onCLick}>Confirmar</ButtonConfirmMain>
    );
}