import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
<<<<<<< Updated upstream
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";

export function AdministradoraDeCartao(){
    const [pagina,setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadDataTableBairro = async () => {
            const response = await getAll(`ListaPaginacaoAdministradoraCartao/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);
        }

        loadDataTableBairro()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title="ADMINISTRADORA DE CARTÃO" IncludeButton={true} ReturnButton={false}/>
            <SearchContentScreens text="Administradora de Cartão" data={data} filter={"nome"} headerTable={["id", "nome"]} headerTableView={["ID","Nome"]}/>
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
=======
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
>>>>>>> Stashed changes
        </>
    );
}