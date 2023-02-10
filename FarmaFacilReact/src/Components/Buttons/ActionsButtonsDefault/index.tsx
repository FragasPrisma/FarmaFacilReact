import { DeleteButton, EditButton, DetailsButton, ExtraButton, Container } from "./styles";
import { Eye, NotePencil, Trash } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { DeleteModal } from "../../Modals/DeleteModal";
import { useState } from "react";
import { CustomDropDownExtra } from "../../Inputs/CustomDropDownExtra";
import { ItensButtonExtra } from "../../../Interfaces/ItensButtonExtra/ItensButtonExtra";

interface Path {
    id: string;
    pathParameters: string;
    urlText: string;
    iconOptions?: boolean;
    itensExtraButton?: ItensButtonExtra[];
    btnsEditExcluir?: boolean;
}

export function ActionsButtonsDefault({ id, pathParameters, urlText, iconOptions, itensExtraButton, btnsEditExcluir = false }: Path) {
    const [stateModal, setStateModal] = useState(false)

    function openModalDelete() {
        setStateModal(!stateModal)
    }

    return (
        <Container>
            {iconOptions && itensExtraButton &&
                <ExtraButton><CustomDropDownExtra itens={itensExtraButton} id={id} /></ExtraButton>
            }
            <NavLink className="text_link" to={`/${pathParameters.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '')}/details/${id}`}>
                <DetailsButton><Eye size={22} color="#cf0209" /></DetailsButton>
            </NavLink>
            {!btnsEditExcluir &&
                <>
                    <NavLink className="text_link" to={`/${pathParameters.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '')}/edit/${id}`}>
                        <EditButton><NotePencil size={20} color="#cf0209" /></EditButton>
                    </NavLink>
                    <DeleteButton onClick={openModalDelete}><Trash size={20} color="#cf0209" /> </DeleteButton>
                </>
            }
            <DeleteModal idItem={id} show={stateModal} onClose={openModalDelete} textInformationModal="Tem certeza que deseja excluir?" urlText={urlText} />
        </Container>
    );
}