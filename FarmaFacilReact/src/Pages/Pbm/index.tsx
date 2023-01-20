import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { TableDefault } from "../../Components/Others/TableDefault";
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
      <HeaderMainContent title="PBM" IncludeButton={true} ReturnButton={false} />
      <SearchContentScreens text="Pbm" data={data} filter={"nome"} headerTable={["id", "nome", "observacao"]} />
    </>
  );
}
