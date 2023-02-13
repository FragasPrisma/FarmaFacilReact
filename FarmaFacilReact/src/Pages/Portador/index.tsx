import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";

export function Portador() {
    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadDataTable = async () => {
            const response = await getAll(`ListaPaginacaoPortador/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);
        }

        loadDataTable()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title="PORTADOR" IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens text="Portador" data={data} filter={"nome"} headerTable={["id", "nome"]} headerTableView={["ID", "Nome"]} />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)} />
        </>
    );
}