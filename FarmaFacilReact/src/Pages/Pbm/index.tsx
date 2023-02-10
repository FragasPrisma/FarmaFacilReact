import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";


export function Pbm() {
  const [data, setData] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [qtdPagina, setQtdPagina] = useState(0);

  useEffect(() => {
    const loadDataTablePbm = async () => {
      const response = await getAll(`ListaPaginacaoPbm/${pagina}`);
      setQtdPagina(response.data.total);
      setData(response.data.listGroup);
    }

    loadDataTablePbm()
  }, [pagina]);

  return (
    <>
      <HeaderMainContent title="PBM" IncludeButton={true} ReturnButton={false} />
      <SearchContentScreens text="Pbm" data={data} filter={"nome"} headerTable={["id", "nome", "observacao"]} headerTableView={["ID", "Nome", "Observação"]} />
      <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
    </>
  );
}
