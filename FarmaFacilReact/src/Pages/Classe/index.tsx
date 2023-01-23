import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Pagination";

export function Classe(){

    const [pagina,setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadDataTableClasse = async () => {
            const response = await getAll(`ListaPaginacaoClasse/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);
        }

        loadDataTableClasse()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title="CLASSE" IncludeButton={true} />
            <SearchContentScreens text="Classe"  data={data} filter={"descricao"} headerTable={["id", "descricao"]}/>
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
        </>
    );
}