import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";

export function Ncm() {

  return (
    <>
      <HeaderMainContent title="NCM" IncludeButton={true} ReturnButton={false} />
      <SearchContentScreens
        text="Ncm"
        headerTable={["codigoNcm", "descricao"]}
        headerTableView={["Código NCM", "Descrição"]}
        urlSearch="ListaPaginacaoNcm"
      />

    </>
  );
}