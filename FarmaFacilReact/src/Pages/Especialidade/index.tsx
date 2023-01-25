import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";

export function Especialidade() {
    const [data, setData] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);

    useEffect(() => {
        const loadDataTablePbm = async () => {
            const response = await getAll(`ListaPaginacaoEspecialidade/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);
        }

        loadDataTablePbm()
    }, [pagina]);
    
    return (
        <>
            <HeaderMainContent title="ESPECIALIDADE" IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens text="Especialidade" data={data} filter={"descricao"} headerTable={["id", "descricao"]} />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
        </>
    )
}