import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ButtonRemoveItemsMain } from "./styles";

interface Props {
    onCLick?: () => void;
    isLoading?: boolean;
}

export function ButtonRemoveItems({ onCLick, isLoading }: Props) {
    const { t } = useTranslation();
    return (
        <ButtonRemoveItemsMain onClick={onCLick}>
            {isLoading ?
                <Spinner animation="border" size="sm" variant="secondary" />
                :
                t("btns.RemoverItens")
            }
        </ButtonRemoveItemsMain>
    );
}