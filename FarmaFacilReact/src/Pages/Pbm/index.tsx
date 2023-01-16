import { CustomInput } from "../../Components/CustomInput";
import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { SearchContentScreens } from "../../Components/SearchContentScreens";

import { Container } from "./styles";

export function Pbm() {
  return (
    <>
      <HeaderMainContent title="PBM" />
      <SearchContentScreens text="Pbm" />
      <div className="form-group">
        <Container className="row">
          <div className="col-5">
            <CustomInput
              label="Nome"
              type="text"
              placeholder="Digite o nome do Pbm"
              required={true} />
          </div>
          <div className="col-5">
            <CustomInput
              label="Observacao"
              type="number"
              placeholder="Digite uma descrição para o Pbm"
              required={false}
            />
          </div>
        </Container>
      </div>
    </>
  );
}
