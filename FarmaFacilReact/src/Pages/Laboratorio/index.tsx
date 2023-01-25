import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";

export function Laboratorio(){
    const [data, setData] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);

    useEffect(() => {
        const loadDataTableLaboratorio = async () => {
          const response = await getAll(`ListaPaginacaoLaboratorio/${pagina}`);
          setQtdPagina(response.data.total);
          setData(response.data.listGroup);
        }
    
        loadDataTableLaboratorio()
      }, [pagina]);

    return (
        <>
            <HeaderMainContent title="LABORATÓRIO" IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens text="Laboratorio" data={data} filter={"descricao"} headerTable={["id", "descricao"]} />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
        </>
    );
}