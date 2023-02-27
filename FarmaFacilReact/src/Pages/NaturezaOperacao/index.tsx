import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";


export function NaturezaDeOperecao() {
  const [data, setData] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [qtdPagina, setQtdPagina] = useState(0);

  useEffect(() => {
    const loadDataTable = async () => {
      const response = await getAll(`ListaPaginacaoNaturezaOperacao/${pagina}`);
      setQtdPagina(response.data.total);
      setData(response.data.listGroup);
    }

    loadDataTable()
  }, [pagina]);

  return (
    <>
      <HeaderMainContent title="NATUREZA DE OPERAÇÃO" IncludeButton={true} ReturnButton={false} />
      <SearchContentScreens text="Natureza de Operação" data={data} filter={"descricao"} headerTable={["id", "descricao"]} headerTableView={["ID", "Descrição"]} urlSearch={"ListaPaginacaoNaturezaOperacao"} />
      <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
    </>
  );
}
