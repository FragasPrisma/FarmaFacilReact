import { useState, useEffect } from "react";
import { ContainerSearch } from "./styles";
import { X } from "phosphor-react";
import { TableDefault } from "../TableDefault";
import Lupa from "../../../assets/img/lupa.png";
import { ItensButtonExtra } from "../../../Interfaces/ItensButtonExtra/ItensButtonExtra";
import { useTranslation } from "react-i18next";
import { getAll } from "../../../Services/Api";
import Paginations from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/IRootState";
import { changeSearch } from "../../../store/Search";
import { IContasAPagar } from "../../../Interfaces/ContasAPagar/IContasAPagar";
import { IViewContasAPagas } from "../../../Interfaces/ContasAPagar/IViewContasAPagar";

interface IDataSearch {
  text: string;
  data?: any[];
  filter?: string;
  headerTable: string[];
  headerTableView?: string[];
  iconOptions?: boolean;
  itensExtraButton?: ItensButtonExtra[];
  btnsEditExcluir?: boolean;
  btnVisualizar?: boolean;
  actionsButtons?: boolean;
  openModal?: boolean;
  openModalFunction?: (id: string) => void;
  urlSearch: string;
  urlParamBool?: boolean
}

export function SearchContentScreens({ text, data, filter, headerTable, iconOptions = false, itensExtraButton, actionsButtons = false, btnsEditExcluir = false, btnVisualizar = false, headerTableView, openModal = false, openModalFunction, urlSearch, urlParamBool = false }: IDataSearch) {


  const searchInitial = useSelector((state: RootState) => state.search.searchSelect);
  const locationInitial = useSelector((state: RootState) => state.search.location);
  const [urlLocation] = useState(window.location.pathname)
  const [searchOptions, setSearchOptions] = useState(false);
  const [value, setValue] = useState(searchInitial);
  const [search, setSearch] = useState([] as any []);
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
      setValue("")
      setPaginaRequest(1)
    }

  }, [])

  useEffect(() => {

    const loadDataTable = async () => {
      try {

        let valueParam = urlLocation != locationInitial ? "" : value
        let url = urlParamBool ? `${urlSearch}/${paginaRequest}/${urlParamBool}/${valueParam.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}` : `${urlSearch}/${paginaRequest}/${valueParam.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`

        const response = await getAll(url);

        dispatch(changeSearch({ value, location: urlLocation }))

        setPaginaRequest(paginaRequest > response.data.count ? 1 : paginaRequest)

        setQtdPaginaRequest(response.data.count);

        if (urlParamBool) {

          response.data.lista.map((x: any) => {
            let viewContasAPagar = {
              id: 0,
              observacao: "",
              dataVencimento: "",
              dataPagamento: "",
              valor: 0,
              valorPago: 0,
              numeroFatura: "",
              numeroParcela: 0,
              ContasAPagarId: 0,
              nomeFornecedor: x.fornecedor.nomeFornecedor
            }

            x.duplicatasContasAPagar.map((y :any) => {
              viewContasAPagar.id = y.id
              viewContasAPagar.observacao = y.observacao
              viewContasAPagar.dataVencimento = y.dataVencimento
              viewContasAPagar.dataPagamento = y.dataPagamento
              viewContasAPagar.valor = y.valor

              viewContasAPagar.valorPago = y.valorPago
              viewContasAPagar.numeroFatura = y.numeroFatura
              viewContasAPagar.numeroParcela = y.numeroParcela
              viewContasAPagar.ContasAPagarId = y.contasAPagarId
            })

            search.push(viewContasAPagar)

          })
          console.log(search)
          setSearch([...search])
        } else {
          setSearch(response.data.lista);
        }

      } catch (error: any) {
        console.log(error)
      }

    }

    loadDataTable()
  }, [paginaRequest, value])

  return (
    <>
      <ContainerSearch className="">
        <span className="title_search">{t('search.pesquisa')} {text} </span>
        <div className="container_search">

          <img src={Lupa} />

          <input type="text" onChange={(e) => setValue(e.target.value)} value={value ? value : ""} />

          {value && <X size={15} cursor="pointer" onClick={searchOptionsFechar} />}
        </div>
        <TableDefault
          header={headerTable}
          data={search}
          path={text}
          iconOptions={iconOptions}
          itensExtraButton={itensExtraButton}
          btnsEditExcluir={btnsEditExcluir}
          btnVisualizar={btnVisualizar}
          headerTableView={headerTableView}
          actionsButtons={actionsButtons}
          openModal={openModal}
          openModalFunction={openModalFunction}
        />
      </ContainerSearch>
      <Paginations pagina={paginaRequest} qtdPagina={qtdPaginaRequest} Reload={(paginaAtual) => setPaginaRequest(paginaAtual)} />

    </>
  );
}
