import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";

export function PrincipioAtivo(){
    return (
        <>
        <HeaderMainContent title="PRINCIPIO ATIVO" IncludeButton={true} />
        <SearchContentScreens text="Principio Ativo" />
        </>
    );
}