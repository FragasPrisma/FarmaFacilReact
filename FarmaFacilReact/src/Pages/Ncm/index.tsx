import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";

export function Ncm() {
  const [data, setData] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [qtdPagina, setQtdPagina] = useState(0);

  useEffect(() => {
    const loadDataTableNcm = async () => {
      const response = await getAll(`ListaPaginacaoNcm/${pagina}`);
      setQtdPagina(response.data.total);
      setData(response.data.listGroup);
    }

    loadDataTableNcm()
  }, [pagina]);

  return (
    <>
      <HeaderMainContent title="NCM" IncludeButton={true} ReturnButton={false} />
      <SearchContentScreens text="Ncm" data={data} filter={"descricao"} headerTable={["codigoNcm", "descricao"]} headerTableView={["Código NCM", "Descrição"]} />
      <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)} />
    </>
  );
}