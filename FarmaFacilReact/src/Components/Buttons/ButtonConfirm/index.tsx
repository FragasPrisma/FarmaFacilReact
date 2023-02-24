import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ButtonConfirmMain } from "./styles";
import { useEffect } from 'react';

interface Props {
    onCLick?: () => void;
    isLoading?: boolean;
}

export function ButtonConfirm({ onCLick, isLoading }: Props) {

    const { t } = useTranslation();

    function handleKeyUp(event: any) {
        
        if (event.key === 'Enter') {

            if (onCLick) {
                onCLick();
            }
        }
    }

    useEffect(() => {

        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keyup', handleKeyUp);
        };

    }, [onCLick]);

    return (

        <ButtonConfirmMain onClick={onCLick} id="button-confirm">

            {isLoading ?
                <Spinner animation="border" size="sm" variant="secondary" />
                :
                t("btns.confirmar")
            }
        </ButtonConfirmMain>
    );
}