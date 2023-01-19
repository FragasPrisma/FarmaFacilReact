import { DeleteButton, EditButton, DetailsButton } from "./styles";
import { Eye, NotePencil, Trash } from "phosphor-react";


export function ActionsButtonsDefault() {
    return (
        <div>
            <DetailsButton><Eye size={22} color="#cf0209" /></DetailsButton>
            <EditButton><NotePencil size={20} color="#cf0209" /></EditButton>
            <DeleteButton><Trash size={20} color="#cf0209" /></DeleteButton>
        </div>
    );
}