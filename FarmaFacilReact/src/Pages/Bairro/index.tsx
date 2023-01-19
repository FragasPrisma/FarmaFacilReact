import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";
import { useEffect, useState, } from "react";
import { TableDefault } from "../../Components/TableDefault";
import { getAll } from "../../Services/Api";

export function Bairro(){

    const [data, setData] = useState([]);

    useEffect(() => {
        const loadDataTableBairro = async () => {
        const response = await getAll("ListaBairro");
        setData(response.data);
        }

        loadDataTableBairro()
    }, []);

    return (
        <>
            <HeaderMainContent title="BAIRRO" IncludeButton={true} />
            <SearchContentScreens text="Bairro" />
            <TableDefault header={["id", "nome"]} data={data} />
        </>
    );
}