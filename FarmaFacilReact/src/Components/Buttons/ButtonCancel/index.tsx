import { NavLink } from "react-router-dom";
import { ButtonCancelMain } from "./styles";

interface Props {
    to: string;
    text?: string;
}

export function ButtonCancel(props: Props) {
    return (
        <NavLink className="text_link" to={`/${props.to}`}>
            <ButtonCancelMain>{props.text == null ? "Cancelar" : props.text}</ButtonCancelMain>
        </NavLink>
    );
}