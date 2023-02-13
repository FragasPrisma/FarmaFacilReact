import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useEffect, useState } from "react";
import { getAll, GetId } from "../../Services/Api";
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
    let labelSwitch = "Duplicatas a Pagar";

    if (aPagar) {
        filtros.path = "/duplicatascontasapagar/cancelarpagamento/";
        filtros.title = "Cancelar Pagamento";
        labelSwitch = "Duplicatas Pagas";
    }

    function Check(check: boolean) {
        setAPagar(check)
        setPagina(1)

    }

    async function CancelarPagamento(id: string) {
        const response = await GetId("RetornaDuplicatasContasAPagarPorId", id);
        console.log(response.data)
    }

    return (
        <>
            <HeaderMainContent
                title="DUPLICATAS CONTAS A PAGAR"
                IncludeButton={true}
                ReturnButton={false}
                IncludeSwitch={true}
                TextSwitch={labelSwitch}
                onClick={(check) => Check(check)}
            />
            <SearchContentScreens
                text="Duplicatas Contas a Pagar"
                data={data} filter={"numeroFatura"}
                headerTable={aPagar == true ? ["numeroFatura", "observacao", "dataVencimento", "dataPagamento","valorPago"]
                    : ["numeroFatura", "observacao", "dataVencimento", "valor"]}
                headerTableView={aPagar == true ? ["Fatura", "Observação", "Vencimento", "Pagamento","Valor Pago"]
                    : ["Fatura", "Observação", "Vencimento", "Valor"]}
                iconOptions={true}
                itensExtraButton={[filtros]}
                btnsEditExcluir={aPagar}
                openModal={aPagar}
                openModalFunction={(id) =>
                    CancelarPagamento(id)}
            />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)} />
        </>
    );
}