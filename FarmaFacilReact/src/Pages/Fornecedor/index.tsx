import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";


export function Fornecedor() {

    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadDataTableFornecedor = async () => {
            const response = await getAll(`ListaPaginacaoFornecedor/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);
        }

        loadDataTableFornecedor()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title="Fornecedor" IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens text="Fornecedor" data={data} filter={"nomeFornecedor"} headerTable={["id", "nomeFornecedor"]} headerTableView={["ID", "Nome"]} />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)} />
        </>
    );
}
