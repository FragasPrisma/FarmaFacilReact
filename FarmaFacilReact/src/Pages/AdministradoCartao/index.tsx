import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";
import { useTranslation } from "react-i18next";
import { IAdministradoCartao } from "../../Interfaces/AdministradoCartao/IAdministradoCartao";

export function AdministradoraDeCartao() {
    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([] as IAdministradoCartao[]);
    const { t } = useTranslation();

    useEffect(() => {
        const loadDataTable = async () => {
            const response = await getAll(`ListaPaginacaoAdministradoraCartao/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);
        }

        loadDataTable()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title={t('administradoraCartao.administradoraCartao')} IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens
                text={t('administradoraCartao.administradoraCartao')}
                data={data}
                filter={"nome"}
                headerTable={["id", "nome"]}
                headerTableView={[t('administradoraCartao.id'), t('administradoraCartao.nome')]}
            />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)} />
        </>
    );
}