import { propTypes } from "react-bootstrap/esm/Image";
import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";
import { TableDefault } from "../../Components/TableDefault";
import { getAll } from "../../Services/Api";
import { PbmCreate } from "./PbmCreate";

export function Pbm() {

  const data = [{}]

  return (
    <>
      <HeaderMainContent title="PBM" IncludeButton={false} modalButton={true} titleModal="Adicionar Pbm" children={<PbmCreate/>}/>
      <SearchContentScreens text="Pbm" />      
      <TableDefault header={["Id", "Nome", "Observação"]} data={data} modalButtons={true}/>
    </>
  );
}
