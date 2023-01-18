import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";

export function Laboratorio(){
    return (
        <>
        <HeaderMainContent title="LABORATORIO" IncludeButton={true} />
        <SearchContentScreens text="Laboratorio" />
        </>
    );
}