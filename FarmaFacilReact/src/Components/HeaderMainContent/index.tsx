import { ButtonIncluir } from "../ButtonIncluir";
import { ContainerHeaderMain, TitleMainHeader } from "./styles";

interface IOptions {
    title: string
    IncludeButton: boolean
}


export function HeaderMainContent({title, IncludeButton}: IOptions) {
    return (
        <ContainerHeaderMain>
            <TitleMainHeader>{title}</TitleMainHeader>
            {IncludeButton &&
                <ButtonIncluir />
            }
            
        </ContainerHeaderMain>
    )   
}