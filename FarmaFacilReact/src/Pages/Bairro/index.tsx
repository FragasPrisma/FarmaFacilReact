import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useTranslation } from "react-i18next";

export function Bairro() {

    const { t } = useTranslation();

    return (
        <>
            <HeaderMainContent title={t('bairro.bairro')} IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens
                text={t('bairro.bairro')}
                headerTable={["id", "nome"]}
                headerTableView={[t('bairro.id'), t('bairro.nome')]}
                urlSearch={`ListaPaginacaoBairro`}
            />
        </>
    );
}