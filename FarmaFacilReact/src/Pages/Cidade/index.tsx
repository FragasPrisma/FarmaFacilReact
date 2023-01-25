import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";

export function Cidade(){

    const [pagina,setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadDataTableCidade = async () => {
            const response = await getAll(`ListaPaginacaoCidade/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);
        }

        loadDataTableCidade()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title="CIDADE" IncludeButton={true} ReturnButton={false}/>
            <SearchContentScreens text="Cidade"  data={data} filter={"nome"} headerTable={["id", "nome"]}/>
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
        </>
    );
}