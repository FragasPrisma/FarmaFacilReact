import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useTranslation } from "react-i18next";

export function Banner() {
    
    const { t } = useTranslation();

    return (
        <>
            <HeaderMainContent title={t('banner.banner')} IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens
                text={t('banner.banner')}
                headerTable={["posicao", "descricao"]}
                headerTableView={[t('banner.header.posicao'), t('banner.header.descricao')]}
                urlSearch="ListaPaginacaoBanner"
            />
        </>
    );
}