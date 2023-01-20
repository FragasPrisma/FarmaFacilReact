import { ButtonReturn } from "../ButtonReturn";
import { ButtonIncluir } from "../ButtonIncluir";
import { ContainerHeaderMain, TitleMainHeader } from "./styles";

interface IOptions {
    title: string
    IncludeButton: boolean
    ReturnButton: boolean
    to?: string
    ButtonName?: string
}

export function HeaderMainContent(props: IOptions) {
    return (
        <ContainerHeaderMain>
            <TitleMainHeader>{props.title}</TitleMainHeader>
            {props.IncludeButton &&
                <ButtonIncluir />
            }
            {props.ReturnButton &&
                <ButtonReturn to={props.to} text={props.ButtonName}/>
            }
            
        </ContainerHeaderMain>
    )   
}