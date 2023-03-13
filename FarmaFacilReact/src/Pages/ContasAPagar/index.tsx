import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useEffect, useState } from "react";
import { getAll, GetId } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";
import { IDuplicatasContasAPagar } from "../../Interfaces/DuplicatasContasAPagar/IDuplicatasContasAPagar";
import { InverterDate } from "../../helper/InverterDate";
import { ModalGeneric } from "../../Components/Modals/ModalGeneric";
import { FailModal } from "../../Components/Modals/FailModal";
import { ContainerSearch } from "../../Components/Others/SearchContentScreens/styles";
import Lupa from "../../assets/img/lupa.png";
import { X } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../store/IRootState";
import { changeSearch } from "../../store/Search";
import { IDuplicatasView } from "../../Interfaces/DuplicatasContasAPagar/IDuplicatasView";
import { changeApagar } from "../../store/Apagar";
import { TableDefaultContasAPagar } from "../../Components/Others/TableDefaultContasAPagar";


export function ContasAPagar() {


    const aPagarInitial = useSelector((state: RootState) => state.aPagar.paga)
    const [aPagar, setAPagar] = useState(aPagarInitial);
    const [duplicata, setDuplicata] = useState({} as IDuplicatasContasAPagar);
    const [openModal, setOpenModal] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false)
    const searchInitial = useSelector((state: RootState) => state.search.searchSelect);
    const locationInitial = useSelector((state: RootState) => state.search.location);
    const [urlLocation] = useState(window.location.pathname)
    const [searchOptions, setSearchOptions] = useState(false);
    const [value, setValue] = useState(searchInitial);
    const [duplicatas, setDuplicatas] = useState([] as IDuplicatasView[]);
    const { t } = useTranslation();
    const [paginaRequest, setPaginaRequest] = useState(1);
    const [qtdPaginaRequest, setQtdPaginaRequest] = useState(0);
    const dispatch = useDispatch();

    const searchOptionsFechar = () => {
        setValue("")
        setSearchOptions(!searchOptions);
    };

    useEffect(() => {
        //Resetar a pesquisa 
        if (urlLocation != locationInitial) {
            dispatch(changeSearch({ value: "", location: urlLocation }))
            dispatch(changeApagar({ paga: false }))
            setValue("")
            setPaginaRequest(1)
        }

    }, [])

    useEffect(() => {

        const loadDataTable = async () => {
            try {

                let valueParam = urlLocation != locationInitial ? "" : value
                let url = `ListaPaginacaoContasAPagar/${paginaRequest}/${aPagar}/${valueParam.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replaceAll("/", "-")}`

                const response = await getAll(url);
                dispatch(changeApagar(aPagar))
                dispatch(changeSearch({ value, location: urlLocation }))

                setPaginaRequest(paginaRequest > response.data.count ? 1 : paginaRequest)

                response.data.lista.map((x: { dataVencimento: string }) => InverterDate(x.dataVencimento))
                console.log(response.data)
                setQtdPaginaRequest(response.data.count);
                response.data.lista.map((x: { dataVencimento: string, dataPagamento: string, valor: number | string, valorPago: number | string }) => {
                    x.dataVencimento = InverterDate(x.dataVencimento)
                    x.valor = x.valor.toLocaleString("pt-Br")
                    if (aPagar) {
                        x.valorPago = x.valorPago.toLocaleString("pt-Br")
                        x.dataPagamento = InverterDate(x.dataPagamento)
                    }
                })
                setDuplicatas(response.data.lista);


            } catch (error: any) {
                console.log(error)
            }

        }

        loadDataTable()
    }, [paginaRequest, value, aPagar])

    let filtros = { title: "Pagar", path: "/duplicatascontasapagar/pagar/" }
    let labelSwitch = "Duplicatas a Pagar";

    if (aPagar) {
        filtros.path = "/duplicatascontasapagar/cancelarpagamento/";
        filtros.title = "Cancelar Pagamento";
        labelSwitch = "Duplicatas Pagas";
    }

    function Check(check: boolean) {
        setAPagar(check)
        setPaginaRequest(1)

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
        } else {
            setIsOpenFail(true)
        }

    }

    function closeModal() {
        setOpenModal(false)
    }

    return (
        <>
            <HeaderMainContent
                title="Contas a pagar"
                IncludeButton={true}
                ReturnButton={false}
                IncludeSwitch={true}
                TextSwitch={labelSwitch}
                onClick={(check) => Check(check)}
                checked={aPagar}
            />

            <ContainerSearch className="">
                <span className="title_search">{t('search.pesquisa')} Contas a pagar</span>
                <div className="container_search">

                    <img src={Lupa} />

                    <input type="text" onChange={(e) => setValue(e.target.value)} value={value ? value : ""} />

                    {value && <X size={15} cursor="pointer" onClick={searchOptionsFechar} />}
                </div>
                <TableDefaultContasAPagar
                    data={duplicatas}
                    path={"duplicatascontasapagar"}
                    iconOptions={true}
                    itensExtraButton={[filtros]}
                    btnsEditExcluir={aPagar}
                    openModal={aPagar}
                    openModalFunction={(id) => CancelarPagamento(id)}
                />
            </ContainerSearch>
            <Paginations pagina={paginaRequest} qtdPagina={qtdPaginaRequest} Reload={(paginaAtual) => setPaginaRequest(paginaAtual)} />
            <ModalGeneric
                textSucces="Cancelamento efetuado com"
                object={duplicata} textInformationModal="Confirma o cancelamento?"
                url="EditarDuplicataContasAPagar"
                openModal={openModal}
                onClose={closeModal}
                textError="Ocorreu algum erro interno ao cancelar o pagamento. Tente novamente mais tarde."
            />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} text="Ocorreu algum erro interno ao cancelar o pagamento. Tente novamente mais tarde." />

        </>
    );
}