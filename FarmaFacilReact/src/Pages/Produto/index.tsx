import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";

export function Produto(){
    return (
        <>
        <HeaderMainContent title="PRODUTO" IncludeButton={true} />
        <SearchContentScreens text="Produto" />
        </>
    );
}