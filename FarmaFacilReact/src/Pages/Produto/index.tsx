import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";

export function Produto(){
    return (
        <>
        <HeaderMainContent title="PRODUTO" IncludeButton={true} ReturnButton={false}/>
        {/* <SearchContentScreens text="Produto" /> */}
        </>
    );
}