import { ButtonIncluir } from "../ButtonIncluir";
import { ModalAddDefault } from "../ModalAddDefault";
import { ContainerHeaderMain, TitleMainHeader } from "./styles";


interface IOptions {
    title: string
    IncludeButton: boolean
    modalButton: boolean
    titleModal?: string
    children?: React.ReactNode
}

export function HeaderMainContent({title, IncludeButton, modalButton, titleModal, children,}: IOptions) {
    return (
        <ContainerHeaderMain>
            <TitleMainHeader>{title}</TitleMainHeader>
            {modalButton == true ? <ModalAddDefault title = {titleModal} children = {children}/> : IncludeButton && <ButtonIncluir/>}
        </ContainerHeaderMain>
    )   
}