import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";

export function Turno() {
    const [data, setData] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);

    useEffect(() => {
        const loadDataTable = async () => {
            const response = await getAll(`ListaPaginacaoTurno/${pagina}`);
            setQtdPagina(response.data.total);
            response.data.listGroup.map((x: { horaInicial: string, horaFinal: string}) => {
                x.horaInicial = x.horaInicial.slice(11, 16)
                x.horaFinal = x.horaFinal.slice(11, 16)
            })
            setData(response.data.listGroup);
        }
    
        loadDataTable()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title="TURNO" IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens text="Turno" data={data} filter={"horaInicial"} headerTable={["id", "horaInicial", "horaFinal"]} />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)}/>
        </>
    );
}