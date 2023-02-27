import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";

export function EspecificacaoCapsula() {
    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadDataTableBairro = async () => {
            const response = await getAll(`ListaPaginacaoEspecificacaoCapsula/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);
        }

        loadDataTableBairro()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title="ESPECIFICAÇÃO CÁPSULA" IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens text="Especificação Cápsula" data={data} filter={"descricao"} headerTable={["id", "descricao"]} headerTableView={["ID", "Descrição"]} urlSearch={"ListaPaginacaoEspecificacaoCapsula"} />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)} />
        </>
    );
}