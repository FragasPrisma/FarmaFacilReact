import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";
import { TableDefault } from "../../Components/TableDefault";
import { getAll } from "../../Services/Api";

export function Pbm() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadDataTablePbm = async () => {
      const response = await getAll("ListaPbm");
      setData(response.data);
    }

    loadDataTablePbm()
  }, []);

  return (
    <>
      <HeaderMainContent title="PBM" IncludeButton={true} />
      <SearchContentScreens text="Pbm" />
      <TableDefault header={["id", "nome", "observacao"]} data={data} />
    </>
  );
}
