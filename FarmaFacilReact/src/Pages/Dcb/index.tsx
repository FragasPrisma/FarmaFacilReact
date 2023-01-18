import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";

export function Dcb(){
    return (
       <>
       <HeaderMainContent title="DCB" IncludeButton={true} />
        <SearchContentScreens text="Dcb" />
       </>
    );
}