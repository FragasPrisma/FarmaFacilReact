import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";
import { TableDefault } from "../../Components/TableDefault";

export function Pbm() {
  const data = [
    {Id : 1, Nome: "André", Apelido: "Fragax", Idade: 21},
    {Id : 2, Nome: "Bruno", Apelido: "Bahia", Idade: 30},
    {Id : 3, Nome: "Bruno", Apelido: "Maconha", Idade: 24,}
  ]

  return (
    <>
      <HeaderMainContent title="PBM" IncludeButton={true}/>
      <SearchContentScreens text="Pbm" />
      <TableDefault header={["Id", "Nome", "Apelido", "Idade"]} data={data}/>
    </>
  );
}
