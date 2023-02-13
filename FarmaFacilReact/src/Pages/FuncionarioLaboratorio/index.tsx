import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";

// Resolvendo merge

export function FuncionarioLaboratorio() {
  const [data, setData] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [qtdPagina, setQtdPagina] = useState(0);

  useEffect(() => {
    const loadDataTableFuncionarioLaboratorio = async () => {
      const response = await getAll(`ListaPaginacaoFuncionarioLaboratorio/${pagina}`);
      setQtdPagina(response.data.total);
      setData(response.data.listGroup);
    }

    loadDataTableFuncionarioLaboratorio()
  }, [pagina]);

  return (
    <>
      <HeaderMainContent title="FUNCIONÁRIO LABORATÓRIO" IncludeButton={true} ReturnButton={false} />
      <SearchContentScreens text="Funcionário Laboratório" data={data} filter={"nome"} headerTable={["id", "nome"]} headerTableView={["ID", "Nome"]} />
      <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)} />
    </>
  );
}