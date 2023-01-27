import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";

export function AdministradoraDeCartao(){
    const [pagina,setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadDataTableBairro = async () => {
            const response = await getAll(`ListaPaginacaoAdministradoraCartao/${pagina}`);
            setQtdPagina(response.data.total);
            setData(response.data.listGroup);
        }

        loadDataTableBairro()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title="ADMINISTRADORA CARTÃO" IncludeButton={true} ReturnButton={false}/>
            <SearchContentScreens text="Administradora Cartão" data={data} filter={"nome"} headerTable={["id", "nome"]}/>
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
        </>
    );
}