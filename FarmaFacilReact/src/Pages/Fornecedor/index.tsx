import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";

export function Fornecedor() {
  return (
    <>
      <HeaderMainContent title="FORNECEDOR" IncludeButton={true} />
      <SearchContentScreens text="Fornecedor" />
    </>
  );
}
