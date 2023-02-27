import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import Paginations from "../../Components/Others/Pagination";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { getAll } from "../../Services/Api";

export function MaquinaPos() {
  const [data, setData] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [qtdPagina, setQtdPagina] = useState(0);

  useEffect(() => {
    const loadDataTableMaquinaPos = async () => {
      const response = await getAll(`ListaPaginacaoMaquinaPos/${pagina}`);

      setQtdPagina(response.data.total);
      setData(response.data.listGroup);
    };
    loadDataTableMaquinaPos();
  }, [pagina]);

  return (
    <>
      <HeaderMainContent
        title="Máquina Pós"
        IncludeButton={true}
        ReturnButton={false}
      />
      <SearchContentScreens
        text="Máquina Pós"
        data={data}
        filter={"descricao"}
        headerTable={["id", "descricao", "serialPos"]}
        headerTableView={["ID", "Descrição", "Serial PÓS"]} 
        urlSearch={"ListaPaginacaoMaquinaPos"}      
      />
      <Paginations
        pagina={pagina}
        qtdPagina={qtdPagina}
        Reload={(paginaAtual) => setPagina(paginaAtual)}
      />
    </>
  );
}
