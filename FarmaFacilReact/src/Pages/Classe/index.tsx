import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";

export function Classe(){
    return (
        <>
        <HeaderMainContent title="CLASSE" IncludeButton={true} />
        <SearchContentScreens text="Classe" />
        </>
    );
}