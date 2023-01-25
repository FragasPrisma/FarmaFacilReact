import { DeleteButton, EditButton, DetailsButton } from "./styles";
import { Eye, NotePencil, Trash } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { DeleteModal } from "../../Modals/DeleteModal";
import { useState } from "react";

interface Path{
    id: string;
    pathParameters:string;
    urlText: string;
}

export function ActionsButtonsDefault({id, pathParameters, urlText}: Path) {
    const [stateModal, setStateModal] = useState(false)
    
    function openModalDelete(){
        setStateModal(!stateModal)
    }

    return (
        <div>
            <NavLink className="text_link" to={`/${pathParameters.toLowerCase()}/details/${id}`}>
                <DetailsButton><Eye size={22} color="#cf0209" /></DetailsButton>
            </NavLink>
            <NavLink className="text_link" to={`/${pathParameters.toLowerCase()}/edit/${id}`}>
                <EditButton><NotePencil size={20} color="#cf0209" /></EditButton>
            </NavLink>
                <DeleteButton  onClick={openModalDelete}><Trash size={20} color="#cf0209" /> </DeleteButton>
                <DeleteModal idItem={id} show={stateModal} onClose={openModalDelete} textInformationModal="Tem certeza que deseja excluir?" urlText={urlText}/>
            </div>
    );
}