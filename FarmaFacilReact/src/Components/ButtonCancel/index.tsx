import { NavLink } from "react-router-dom";
import { ButtonCancelMain } from "./styles";

interface Props {
    to: string;
}

export function ButtonCancel({to}: Props) {
    return (
        <NavLink className="text_link" to={`/${to}`}>
            <ButtonCancelMain>Cancel</ButtonCancelMain>
        </NavLink>
    );
}