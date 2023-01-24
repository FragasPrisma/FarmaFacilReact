import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/";
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Pagination";

// Resolvendo merge

export function Fornecedor(){

    const [pagina,setPagina] = useState(1);
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
            <HeaderMainContent title="Fornecedor" IncludeButton={true} />
            <SearchContentScreens text="Fornecedor" data={data} filter={"nomeFornecedor"} headerTable={["id", "nomeFornecedor"]}/>
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
        </>
    );
}
