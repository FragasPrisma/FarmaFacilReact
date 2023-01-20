import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";
import { useEffect, useState, } from "react";
import { TableDefault } from "../../Components/TableDefault";
import { getAll } from "../../Services/Api";

export function Classe(){

    const [data, setData] = useState([]);

    useEffect(() => {
        const loadDataTableClasse = async () => {
        const response = await getAll("ListaClasse");
        setData(response.data);
        }

        loadDataTableClasse()
    }, []);

    return (
        <>
            <HeaderMainContent title="CLASSE" IncludeButton={true} />
            <SearchContentScreens text="Classe" />
            <TableDefault header={["id", "descricao"]} data={data} />
        </>
    );
}