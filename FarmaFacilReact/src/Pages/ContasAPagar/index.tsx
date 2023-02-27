import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useEffect, useState } from "react";
import { getAll, GetId } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";
import { IDuplicatasContasAPagar } from "../../Interfaces/DuplicatasContasAPagar/IDuplicatasContasAPagar";
import { InverterDate } from "../../helper/InverterDate";
import { ModalGeneric } from "../../Components/Modals/ModalGeneric";
import { FailModal } from "../../Components/Modals/FailModal";

export function ContasAPagar() {
    
    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([]);
    const [aPagar, setAPagar] = useState(false);
    const [duplicata, setDuplicata] = useState({} as IDuplicatasContasAPagar);
    const [openModal, setOpenModal] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false)

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
       
        if (response.status == 200) {
            duplicata.id = response.data.id;
            duplicata.valor = response.data.valor;
            duplicata.ContasAPagarId = response.data.contasAPagarId;
            duplicata.dataVencimento = response.data.dataVencimento;
            duplicata.numeroFatura = response.data.numeroFatura;
            duplicata.numeroParcela = response.data.numeroParcela;
            duplicata.observacao = response.data.observacao;
            duplicata.valorPago = 0;
            duplicata.dataPagamento = null;
            setOpenModal(true)
        }else{
            setIsOpenFail(true)
        }

    }

    function closeModal(){
        setOpenModal(false)
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
                headerTable={aPagar == true ? ["numeroFatura", "observacao", "dataVencimento", "dataPagamento", "valorPago"]
                    : ["numeroFatura", "observacao", "dataVencimento", "valor"]}
                headerTableView={aPagar == true ? ["Fatura", "Observação", "Vencimento", "Pagamento", "Valor Pago"]
                    : ["Fatura", "Observação", "Vencimento", "Valor"]}
                iconOptions={true}
                itensExtraButton={[filtros]}
                btnsEditExcluir={aPagar}
                openModal={aPagar}
                openModalFunction={(id) => CancelarPagamento(id)} 
                urlSearch={"ListaPaginacaoContaAPagar"}            
            />
            <ModalGeneric object={duplicata} textInformationModal="Confirma o cancelamento?" url="EditarDuplicataContasAPagar" openModal={openModal} onClose={closeModal} />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)} />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} text="Ocorreu algum erro interno ao cancelar o pagamento. Tente novamente mais tarde." />
        </>
    );
}