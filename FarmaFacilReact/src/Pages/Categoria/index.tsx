import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";
import { useTranslation } from "react-i18next";
import { TableDefault } from "../../Components/Others/TableDefault";

export function Categoria() {

    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const loadDataTable = async () => {
            const response = await getAll(`ListaPaginacaoCategoria/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);
        }

        loadDataTable()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title={t('categoria.categoria')} IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens
                text={t('categoria.categoria')}
                data={data} filter={"nome"}
                headerTable={["id", "categoriaPai.nome", "nome"]}
                headerTableView={[t('categoria.header.id'), t('categoria.header.categoriaPai'), t('categoria.header.nome')]}
            />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)} />
        </>
    );
}