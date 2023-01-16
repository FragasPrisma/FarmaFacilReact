import { ButtonIncluir } from "../ButtonIncluir";
import { ContainerHeaderMain, TitleMainHeader } from "./styles";

interface IOptions {
    title: string
}


export function HeaderMainContent({title}: IOptions) {
    return (
        <ContainerHeaderMain>
            <TitleMainHeader>{title}</TitleMainHeader>
        
            <ButtonIncluir />
        </ContainerHeaderMain>
    )   
}