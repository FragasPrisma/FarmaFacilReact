import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";

export function Bairro(){
    return (
        <>
        <HeaderMainContent title="BAIRRO" IncludeButton={true} />
        <SearchContentScreens text="Bairro" />
        </>
    );
}