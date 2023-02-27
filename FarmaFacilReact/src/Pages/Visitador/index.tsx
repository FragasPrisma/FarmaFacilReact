import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import Paginations from "../../Components/Others/Pagination";

export function Visitador() {

    return (
        <>
            <HeaderMainContent title="VISITADOR" IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens
                text="Visitador"
                headerTable={["id", "nome"]}
                headerTableView={["ID", "Nome"]}
                urlSearch="ListaPaginacaoVisitador"
            />
        </>
    );
}