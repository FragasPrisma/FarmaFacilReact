import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Pagination";

export function Bairro(){

    const [pagina,setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadDataTableBairro = async () => {
            const response = await getAll(`ListaPaginacao/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);

            if(response.data.listGroup.length == 0){
                const resp = await getAll(`ListaBairro`);
                setData(resp.data);
            }
        }

        loadDataTableBairro()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title="BAIRRO" IncludeButton={true} />
            <SearchContentScreens text="Bairro" data={data} filter={"nome"} headerTable={["id", "nome"]}/>
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
        </>
    );
}