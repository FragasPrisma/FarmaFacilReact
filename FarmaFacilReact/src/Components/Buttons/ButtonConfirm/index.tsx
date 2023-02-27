import { Spinner } from "react-bootstrap";
import { ButtonConfirmMain } from "./styles";
import { useEffect } from 'react';

interface Props {
    onCLick?: () => void;
    isLoading?: boolean;
}

<<<<<<< Updated upstream
export function ButtonConfirm({onCLick,isLoading}: Props) {
=======
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

>>>>>>> Stashed changes
    return (

        <ButtonConfirmMain onClick={onCLick} id="button-confirm">

            {isLoading ?
                <Spinner animation="border" size="sm" variant="secondary" />
<<<<<<< Updated upstream
                    :
                "Confirmar"
=======
                :
                t("btns.confirmar")
>>>>>>> Stashed changes
            }
        </ButtonConfirmMain>
    );
}