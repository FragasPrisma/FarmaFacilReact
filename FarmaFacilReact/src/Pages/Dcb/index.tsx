import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";

export function Dcb(){
    const [pagina,setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadDataTableDcb = async () => {
            const response = await getAll(`ListaPaginacaoDcb/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);
        }

        loadDataTableDcb()
    }, [pagina]);

    return (
       <>
       <HeaderMainContent title="DCB" IncludeButton={true} ReturnButton={false}/>
        <SearchContentScreens text="Dcb" data={data} filter={"codigoDcb"} headerTable={["codigoDcb", "descricao"]}/>
        <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
       </>
    );
}