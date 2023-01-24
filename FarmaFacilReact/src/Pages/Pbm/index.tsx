import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { TableDefault } from "../../Components/Others/TableDefault";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";

// Resolvendo merge

export function Pbm() {
  const [data, setData] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [qtdPagina, setQtdPagina] = useState(0);

  useEffect(() => {
    const loadDataTablePbm = async () => {

      const response = await getAll(`ListaPaginacaoPbm/${pagina}`);
      setQtdPagina(response.data.total);
      setData(response.data.listGroup);
      if(response.data.listGroup.length == 0){
          const resp = await getAll(`ListaPbm`);
          setData(resp.data);
        } 
    }

    loadDataTablePbm()
  }, [pagina]);

  return (
    <>
      <HeaderMainContent title="PBM" IncludeButton={true} ReturnButton={false} />
      <SearchContentScreens text="Pbm" data={data} filter={"nome"} headerTable={["id", "nome", "observacao"]} />
      <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
    </>
  );
}
