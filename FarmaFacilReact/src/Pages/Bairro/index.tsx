import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";
import { useTranslation } from "react-i18next";

export function Bairro(){
    const [pagina,setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const loadDataTableBairro = async () => {
            const response = await getAll(`ListaPaginacaoBairro/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);
        }

        loadDataTableBairro()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title={t('bairro.bairro')} IncludeButton={true} ReturnButton={false}/>
            <SearchContentScreens text={t('bairro.bairro')} data={data} filter={"nome"} headerTable={["id", "nome"]} headerTableView={[t('bairro.id'), t('bairro.nome')]}/>
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
        </>
    );
}