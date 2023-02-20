import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import Paginations from "../../Components/Others/Pagination";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { getAll } from "../../Services/Api";

export function Compras() {
    const [data, setData] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);

    let filtros = [{ title: "Consultar Pedido", path: "/pedidoDeCompra/consultar/"}, {title: "Cotação", path: "/cotacaoCompras/"}, {title: "Relatório de Compras", path: "/relatorioCompras/"}]

    useEffect(() => {
        const loadDataTableCompras = async () => {
          const response = await getAll(`ListaPaginacaoCompra/${pagina}`);
          setQtdPagina(response.data.total);
          setData(response.data.listGroup);
        }
    
        loadDataTableCompras()
      }, [pagina]);

    return (
        <>
            <HeaderMainContent title="Compras" IncludeButton={true} ReturnButton={false}/>
            <SearchContentScreens 
                text="Compras"
                data={data}
                filter={"nome"} 
                headerTable={["id", "data", "tipo", "curva", "total", "status"]}
                headerTableView={["ID", "Data", "Tipo", "Curva", "Total", "Status Pedido/Cotação"]}
                iconOptions={true} 
                itensExtraButton={filtros}
            />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
        </>
    )
}