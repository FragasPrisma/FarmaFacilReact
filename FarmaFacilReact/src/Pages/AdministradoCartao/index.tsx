import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useTranslation } from "react-i18next";

export function AdministradoraDeCartao() {
    
    const { t } = useTranslation();

    return (
        <>
            <HeaderMainContent title={t('administradoraCartao.administradoraCartao')} IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens
                text={t('administradoraCartao.administradoraCartao')}
                headerTable={["id", "nome"]}
                headerTableView={[t('administradoraCartao.id'), t('administradoraCartao.nome')]}
                urlSearch="ListaPaginacaoAdministradoraCartao"
            />
        </>
    );
}