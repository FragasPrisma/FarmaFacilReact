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
}

export function SearchContentScreens({ text, data, filter, headerTable, iconOptions = false, itensExtraButton, actionsButtons = false, btnsEditExcluir = false, btnVisualizar = false, headerTableView, openModal = false, openModalFunction, urlSearch }: IDataSearch) {


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
        let url = `${urlSearch}/${paginaRequest}/${valueParam.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`

        const response = await getAll(url);

        dispatch(changeSearch({ value, location: urlLocation }))

        setPaginaRequest(paginaRequest > response.data.count ? 1 : paginaRequest)

        setQtdPaginaRequest(response.data.count);
        setSearch(response.data.lista);
        

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
