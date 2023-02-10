import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";
import { IDuplicatasContasAPagar } from "../../Interfaces/DuplicatasContasAPagar/IDuplicatasContasAPagar";
import { InverterDate } from "../../helper/InverterDate";

export function ContasAPagar() {
    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([]);
    const [aPagar, setAPagar] = useState(false);

    useEffect(() => {
        const loadDataTable = async () => {
            const response = await getAll(`ListaPaginacaoDuplicatas/${pagina}/${aPagar}`);

            if (response.data.listGroup) {
                response.data.listGroup.map(function (x: IDuplicatasContasAPagar) {
                    x.dataPagamento = x.dataPagamento ? InverterDate(x.dataPagamento) : ""
                    x.dataVencimento = InverterDate(x.dataVencimento)
                })

                setQtdPagina(response.data.total);
                setData(response.data.listGroup);
            }
        }

        loadDataTable()
    }, [pagina, aPagar]);

    let filtros = { title: "Pagar", path: "/duplicatascontasapagar/pagar/" }

    if (aPagar) {
        filtros.path = "/duplicatascontasapagar/cancelarpagamento/"
        filtros.title = "Cancelar Pagamento"
    }

    let arrayHeader = [] as string [];

    function Check(check: boolean) {
        setAPagar(check)
        setPagina(1)
        
    }

    return (
        <>
            <HeaderMainContent
                title="DUPLICATAS CONTAS A PAGAR"
                IncludeButton={true}
                ReturnButton={false}
                IncludeSwitch={true}
                TextSwitch="Duplicatas Pagas"
                onClick={(check) => Check(check)}
            />
            <SearchContentScreens
                text="Duplicatas Contas a Pagar"
                data={data} filter={"numeroFatura"}
                headerTable={aPagar == true ?  ["numeroFatura", "observacao", "dataVencimento", "dataPagamento"]
                : ["numeroFatura", "observacao", "dataVencimento","valor"]}
                iconOptions={true}
                itensExtraButton={[filtros]}
                btnsEditExcluir={aPagar}
            />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)} />
        </>
    );
}