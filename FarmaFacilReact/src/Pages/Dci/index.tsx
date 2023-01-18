import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";

export function Dci(){
    return (
        <>
        <HeaderMainContent title="DCI" IncludeButton={true} />
        <SearchContentScreens text="Dci" />
        </>
    );
}