import { ButtonCancel } from "../../Components/ButtonCancel";
import { ButtonConfirm } from "../../Components/ButtonConfirm";
import { CustomInput } from "../../Components/CustomInput";
import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { Container } from "./styles";

export function PbmCreate() {
  return (
    <>
      <HeaderMainContent title="ADICIONAR PBM" IncludeButton={false} />
      <div className="form-group">
        <Container >
          <div className="row">
            <div className="col-5">
              <CustomInput
                label="Nome"
                type="text"
                placeholder="Digite o nome do Pbm"
                required={true}
              />
            </div>
            <div className="col-5">
              <CustomInput
                label="Observação"
                type="text"
                placeholder="Digite uma descrição para o Pbm"
                required={false}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <ButtonConfirm
                to="pbm"
              />
            </div>
            <div className="col-2">
              <ButtonCancel
                to="pbm"
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}