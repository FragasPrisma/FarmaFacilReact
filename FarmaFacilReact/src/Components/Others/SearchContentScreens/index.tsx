import { useState, useEffect } from "react";
import { ContainerSearch } from "./styles";
import { X } from "phosphor-react";
import { TableDefault } from "../TableDefault";
import Lupa from "../../../assets/img/lupa.png";

interface IDataSearch {
  text: string;
  data:any[];
  filter:string;
  headerTable:string[];
}

export function SearchContentScreens({ text ,data, filter,headerTable}: IDataSearch) {

  const [searchOptions, setSearchOptions] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState(data);

  const searchOptionsFechar = () => {
    setValue("")
    setSearchOptions(!searchOptions);
  };

  useEffect(()=>{

    if(data){
      
      const filterArray = () => {  
        setSearch(data.filter(y => y[filter].toString().toLowerCase().includes(value)));
      };
  
      filterArray();
    }

  },[ value, data ]);
  
  return (
    <ContainerSearch className="">
      <span className="title_search">Pesquisa de {text} </span>
      <div className="container_search" onClick={searchOptionsFechar}>

        <img src={Lupa}/>

        <input type="text" onChange={(e) => setValue(e.target.value.toLowerCase())} value={value} />

        {searchOptions && <X size={15} cursor="pointer" />}
      </div>
      <TableDefault header={headerTable} data={search} path={text}/>
    </ContainerSearch>
    
  );
}
