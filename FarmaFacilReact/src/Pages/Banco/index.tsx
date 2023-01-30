import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";

export function Banco() {
    const [data, setData] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);

    useEffect(() => {
        const loadDataTableBanco = async () => {
            const response = await getAll(`ListaPaginacaoBanco/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);
        }

        loadDataTableBanco()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title="BANCO" IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens text="Banco" data={data} filter={"nome"} headerTable={["codigoBanco", "nome"]} />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
        </>
    );
}