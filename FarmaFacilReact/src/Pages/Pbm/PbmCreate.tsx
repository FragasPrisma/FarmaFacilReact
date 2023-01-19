import { ButtonCancel } from "../../Components/ButtonCancel";
import { ButtonConfirm } from "../../Components/ButtonConfirm";
import { CustomInput } from "../../Components/CustomInput";
import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { Container } from "./styles";
import { useState, useEffect} from "react";
import { propTypes } from "react-bootstrap/esm/Image";

export function PbmCreate() {
  const [confirmacao, setConfirmacao] = useState(Boolean)
  const [nome, setnome] = useState()
  const [descricao, setdescricao] = useState()

  useEffect(() => {

  },[confirmacao])

  function adicionar(e: any) {
    e.preventDefault();
    console.log(nome, descricao);
    setConfirmacao(true);
  }

  return (
    <>
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-6">
              <CustomInput
                label="Nome"
                type="text"
                name="nome"
                placeholder="Digite o nome do Pbm"
                required={true}
                OnChange={(e: any) => setnome(e.target.value)}
              />
            </div>
            <div className="col-6">
              <CustomInput
                label="Observação"
                type="text"
                name="descricao"
                placeholder="Digite uma descrição para o Pbm"
                required={false}
                OnChange={(e: any) => setdescricao(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col 2">
              <button onClick={adicionar}>Adicionar</button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}