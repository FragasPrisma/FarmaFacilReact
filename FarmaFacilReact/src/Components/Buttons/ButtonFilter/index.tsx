import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ButtonFilterMain } from "./styles";

interface Props {
    onCLick?: () => void;
    isLoading?:boolean;
}

export function ButtonFilter({onCLick,isLoading}: Props) {
    const { t } = useTranslation();
    return (
        <ButtonFilterMain onClick={ onCLick }>
            {isLoading ? 
                <Spinner animation="border" size="sm" variant="secondary" />
                    :
                t("btns.filtrar")
            }
            </ButtonFilterMain>
    );
}