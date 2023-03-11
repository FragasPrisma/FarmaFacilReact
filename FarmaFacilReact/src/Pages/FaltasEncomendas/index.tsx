import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useTranslation } from "react-i18next";

export function FaltasEncomendas() {

    const { t } = useTranslation();

    return (
        <>
            <HeaderMainContent title="Faltas Encomendas" IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens
                text="Faltas Encomendas"
                headerTable={["id", "observacao"]}
                headerTableView={["Id","Observação"]}
                urlSearch={`ListaPaginacaoFaltasEncomendas`}
            />
        </>
    );
}