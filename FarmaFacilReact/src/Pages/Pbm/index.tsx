import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";
import { getAll } from "../../Services/Api";

export function Pbm() {
  const test = async () => {
    let r = await getAll("ListaPbm")
    console.log(r)
  }
 
  return (
    <>
      <HeaderMainContent title="PBM" IncludeButton={true}/>
      <SearchContentScreens text="Pbm" />

      <button onClick={test}>
          paooo
      </button>
    </>
  );
}
