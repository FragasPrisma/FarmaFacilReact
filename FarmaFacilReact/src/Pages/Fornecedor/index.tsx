import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";

export function Fornecedor() {

    return (
        <>
            <HeaderMainContent title="Fornecedor" IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens 
                text="Fornecedor" 
                headerTable={["id", "nomeFornecedor"]} 
                headerTableView={["ID", "Nome"]}
                urlSearch="ListaPaginacaoFornecedor"
            />
        </>
    );
}
