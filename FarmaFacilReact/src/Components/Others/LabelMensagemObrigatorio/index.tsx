import { useTranslation } from "react-i18next";
import { LabelMensagemObrigatorio } from "./styles";

export function LabelObrigatorio() {
    const { t } = useTranslation();
    return (
        <LabelMensagemObrigatorio>
            {t('labelObrigatorio.message')}
        </LabelMensagemObrigatorio>
    )
}