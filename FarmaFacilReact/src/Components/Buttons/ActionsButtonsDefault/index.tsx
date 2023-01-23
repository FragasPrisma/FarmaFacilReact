import { DeleteButton, EditButton, DetailsButton } from "./styles";
import { Eye, NotePencil, Trash } from "phosphor-react";
import { NavLink } from "react-router-dom";

interface Path{
    id: string;
    pathParameters:string;
}

export function ActionsButtonsDefault({id,pathParameters}:Path) {
    return (
        <div>
            <NavLink className="text_link" to={`/${pathParameters.toLowerCase()}/details/${id}`}>
                <DetailsButton><Eye size={22} color="#cf0209" /></DetailsButton>
            </NavLink>
            <NavLink className="text_link" to={`/${pathParameters.toLowerCase()}/edit/${id}`}>
                <EditButton><NotePencil size={20} color="#cf0209" /></EditButton>
            </NavLink>
            <DeleteButton><Trash size={20} color="#cf0209" /></DeleteButton>
        </div>
    );
}