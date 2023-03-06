import { MessageError } from "./styles";

interface IParam{
    message : string
}

export function MessageErro({message} : IParam){
    return (
        <MessageError>
            {message}
        </MessageError>
    )
}