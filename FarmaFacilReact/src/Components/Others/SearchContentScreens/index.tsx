import { useState, useEffect } from "react";
import { ContainerSearch } from "./styles";
import { X } from "phosphor-react";
import { TableDefault } from "../TableDefault";
import Lupa from "../../../assets/img/lupa.png";
import { ItensButtonExtra } from "../../../Interfaces/ItensButtonExtra/ItensButtonExtra";
import { useTranslation } from "react-i18next";

interface IDataSearch {
  text: string;
  data: any[];
  filter: string;
  headerTable: string[];
  headerTableView?: string[];
  iconOptions?: boolean;
  itensExtraButton?: ItensButtonExtra[];
  btnsEditExcluir?: boolean;
  openModal?: boolean;
  openModalFunction?: (id:string) => void
}

export function SearchContentScreens({ text, data, filter, headerTable, iconOptions = false, itensExtraButton, btnsEditExcluir = false, headerTableView, openModal = false , openModalFunction}: IDataSearch) {

  const [searchOptions, setSearchOptions] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState(data);
  const { t } = useTranslation();

  const searchOptionsFechar = () => {
    setValue("")
    setSearchOptions(!searchOptions);
  };

  useEffect(() => {

    if (data) {

      const filterArray = () => {
        setSearch(data.filter(y => y[filter].toString().toLowerCase().includes(value)));
      };

      filterArray();
    }

  }, [value, data]);

  return (
    <ContainerSearch className="">
      <span className="title_search">{t('search.pesquisa')} {text} </span>
      <div className="container_search" onClick={searchOptionsFechar}>

        <img src={Lupa} />

        <input type="text" onChange={(e) => setValue(e.target.value.toLowerCase())} value={value} />

        {searchOptions && <X size={15} cursor="pointer" />}
      </div>
      <TableDefault
        header={headerTable}
        data={search}
        path={text}
        iconOptions={iconOptions}
        itensExtraButton={itensExtraButton}
        btnsEditExcluir={btnsEditExcluir}
        headerTableView={headerTableView}
        openModal={openModal}
        openModalFunction={openModalFunction}
      />
    </ContainerSearch>

  );
}
