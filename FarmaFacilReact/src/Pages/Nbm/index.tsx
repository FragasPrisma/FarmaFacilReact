import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";

export function Nbm(){
    return (
        <>
        <HeaderMainContent title="NBM" IncludeButton={true} />
        <SearchContentScreens text="Nbm" />
        </>
    );
}