import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";

export function Estado() {
    const [data, setData] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);

    useEffect(() => {
        const loadDataTable = async () => {
            const response = await getAll(`ListaPaginacaoEstado/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);
        }

        loadDataTable()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title="ESTADO" IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens text="Estado" data={data} filter={"nome"} headerTable={["id", "nome", "aliquotaIcmsEstado"]} headerTableView={["ID", "Nome", "Aliquota ICMS Estado"]} />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)} />
        </>
    );
}