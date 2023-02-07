import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";

export function ContasAPagar(){
    const [pagina,setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadDataTable = async () => {
            const response = await getAll(`ListaPaginacaoContasAPagar/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);
        }

        loadDataTable()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title="CONTAS A PAGAR" IncludeButton={true} ReturnButton={false}/>
            <SearchContentScreens text="Contas a Pagar" data={data} filter={"duplicata"} headerTable={["duplicata", "observacao"]}/>
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
        </>
    );
}