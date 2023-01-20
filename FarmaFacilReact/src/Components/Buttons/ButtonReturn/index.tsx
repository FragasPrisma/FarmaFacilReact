import { NavLink } from "react-router-dom";
import { ButtonReturnMain } from "./styles";

interface Props {
    to?: string;
    text?: string;
}

export function ButtonReturn(props: Props) {
    return (
        <NavLink className="text_link" to={`/${props.to}`}>
            <ButtonReturnMain>{props.text == null ? "Voltar" : props.text}</ButtonReturnMain>
        </NavLink>
    );
}