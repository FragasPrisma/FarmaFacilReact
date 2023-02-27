import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import Paginations from "../../Components/Others/Pagination";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";

export function Dci() {
    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadDataTableDci = async () => {
            const response = await getAll(`ListaPaginacaoDci/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);
        }

        loadDataTableDci()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title="DCI" IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens text="DCI" data={data} filter={"codigoDci"} headerTable={["id", "codigoDci", "descricao"]} headerTableView={["ID", "Código DCI", "Descrição"]} urlSearch={"ListaPaginacaoDci"} />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)} />
        </>
    );
}