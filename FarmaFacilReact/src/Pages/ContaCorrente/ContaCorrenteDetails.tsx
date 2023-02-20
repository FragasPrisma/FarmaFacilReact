import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { IContaCorrente } from "../../Interfaces/ContaCorrente/IContaCorrente";
export function ContaCorrenteDetails() {

  const [contaCorrenteModel, setContaCorrentemodel] = useState({} as IContaCorrente);

  const { id } = useParams();
  let idParams = !id ? "0" : id.toString();

  useEffect(() => {
    async function Init() {
      const response = await GetId("RetornaContaCorrentePorId", idParams);
      setContaCorrentemodel(response.data);
    }

    Init();
  }, []);

  return (
    <>
      <HeaderMainContent title="DETALHES CONTA CORRENTE" IncludeButton={false} ReturnButton={true} to="contacorrente" />
      <div className="form-group">
        {contaCorrenteModel.id > 0 &&
          <Container>
            <div className="row">
              <div className="col-6 mb-3">
                <CustomInput
                  label="Nome"
                  type="text"
                  value={contaCorrenteModel.nome}
                  readonly={true}
                  required={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <CustomInput
                  label="Número da Conta"
                  type="text"
                  value={contaCorrenteModel.numeroConta}
                  readonly={true}
                  required={true}
                />
              </div>
              <div className="col-2">
                <CustomInput
                  label="Limite"
                  type="number"
                  value={contaCorrenteModel.limite}
                  required={false}
                  readonly={true}
                />
              </div>
            </div>
          </Container>
        }
      </div>
    </>
  );
}
