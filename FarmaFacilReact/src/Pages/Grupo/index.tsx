import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";

export function Grupo(){
    return (
        <>
        <HeaderMainContent title="GRUPO" IncludeButton={true} />
        <SearchContentScreens text="Grupo" />
        </>
    );
}