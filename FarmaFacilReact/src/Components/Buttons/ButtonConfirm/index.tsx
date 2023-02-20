import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ButtonConfirmMain } from "./styles";

interface Props {
    onCLick?: () => void;
    isLoading?:boolean;
}

export function ButtonConfirm({onCLick,isLoading}: Props) {
    const { t } = useTranslation();
    return (
        <ButtonConfirmMain onClick={ onCLick }>
            {isLoading ? 
                <Spinner animation="border" size="sm" variant="secondary" />
                    :
                t("btns.confirmar")
            }
            </ButtonConfirmMain>
    );
}