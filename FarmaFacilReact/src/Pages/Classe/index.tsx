import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useEffect, useState, } from "react";
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
            <HeaderMainContent title="CLASSE" IncludeButton={true} ReturnButton={false}/>
            <SearchContentScreens text="Classe"  data={data} filter={"descricao"} headerTable={["id", "descricao"]}/>
        </>
    );
}