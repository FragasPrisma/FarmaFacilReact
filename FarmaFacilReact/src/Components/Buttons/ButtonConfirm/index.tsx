import { Spinner } from "react-bootstrap";
import { ButtonConfirmMain } from "./styles";

interface Props {
    onCLick?: () => void;
    isLoading?:boolean;
}

export function ButtonConfirm({onCLick,isLoading}: Props) {
    return (
        <ButtonConfirmMain onClick={onCLick}>
            {isLoading ? 
                <Spinner animation="border" size="sm" variant="secondary" />
                    :
                "Confirmar"
            }
            </ButtonConfirmMain>
    );
}