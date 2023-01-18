import { DeleteButton, EditButton, DetailsButton } from "./styles";

export function ActionsButtonsDefault() {
    return (
        <div>
            <DetailsButton>Detalhes</DetailsButton>
            <EditButton>Editar</EditButton>
            <DeleteButton>Deletar</DeleteButton>
        </div>
    );
}