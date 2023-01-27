import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import Paginations from "../../Components/Others/Pagination";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { getAll } from "../../Services/Api";

export function Tributo() {
  const [data, setData] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [qtdPagina, setQtdPagina] = useState(0);

  useEffect(() => {
    const loadDataTablePbm = async () => {
      const response = await getAll(`ListaPaginacaoTributo/${pagina}`);
      setQtdPagina(response.data.total);
      setData(response.data.listGroup);
    };
    loadDataTablePbm();
  }, [pagina]);

  return (
    <>
      <HeaderMainContent
        title="Tributo"
        IncludeButton={true}
        ReturnButton={false}
      />
      <SearchContentScreens
        text="Tributo"
        data={data}
        filter={"descricao"}
        headerTable={["id", "tipoTributo", "descricao", "codigo"]}
      />
      <Paginations
        pagina={pagina}
        qtdPagina={qtdPagina}
        Reload={(paginaAtual) => setPagina(paginaAtual)}
      />
    </>
  );
}
