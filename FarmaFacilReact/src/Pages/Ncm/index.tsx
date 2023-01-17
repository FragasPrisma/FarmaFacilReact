import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";

export function Ncm(){
    return (
        <>
        <HeaderMainContent title="NCM" IncludeButton={true} />
        <SearchContentScreens text="Ncm" />
        </>
    );
}