import { useState } from "react";

import { ContainerSearch } from "./styles";
import Lupa from "../../assets/img/lupa.png";
import { X } from "phosphor-react";

interface IDataSearch {
  text: string;
}

export function SearchContentScreens({ text }: IDataSearch) {
  const [searchOptions, setSearchOptions] = useState(false);

  const searchOptionsFechar = () => {
    setSearchOptions(!searchOptions);
  };

  return (
    <ContainerSearch className="">
      <span className="title_search">Pesquisa de {text} </span>
      <div className="container_search" onClick={searchOptionsFechar}>
        <img src={Lupa} />
        <input type="text" />

        {searchOptions && <X size={15} />}
      </div>
    </ContainerSearch>
  );
}
