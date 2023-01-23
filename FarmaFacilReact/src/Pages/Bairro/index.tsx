import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";

// Resolvendo merge

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
            <HeaderMainContent title="BAIRRO" IncludeButton={true} ReturnButton={false}/>
            <SearchContentScreens text="Bairro" data={data} filter={"nome"} headerTable={["id", "nome"]}/>
        </>
    );
}