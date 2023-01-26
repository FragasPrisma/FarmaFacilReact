import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";

export function Nbm(){
    const [data, setData] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);

    useEffect(() => {
        const loadDataTablePbm = async () => {
          const response = await getAll(`ListaPaginacaoNbm/${pagina}`);
          setQtdPagina(response.data.total);
          setData(response.data.listGroup);
        }
    
        loadDataTablePbm()
      }, [pagina]);

    return (
        <>
            <HeaderMainContent title="NBM" IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens text="Nbm" data={data} filter={"descricao"} headerTable={["id", "codigoNbm", "descricao"]} />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
        </>
    );
}