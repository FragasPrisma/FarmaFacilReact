import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import Paginations from "../../Components/Others/Pagination";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { Farmacia } from "../../Interfaces/Empresa/IFarmacia";
import { getAll } from "../../Services/Api";

export function Empresa() {
    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadDataTableEmpresa = async () => {
            const response = await getAll(`ListaPaginacaoEmpresa/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);
        }

        loadDataTableEmpresa()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title="Empresa" IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens text="Empresa" data={data} filter={"id"} headerTable={["id", "farmacia.nomeFantasia"]}  headerTableView={["ID", "Nome"]} />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)} />
        </>
    )
}