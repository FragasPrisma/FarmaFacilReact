import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useParams, useNavigate } from 'react-router-dom';
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";

export function FuncionarioLaboratorioEdit() {
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [erroNome, setErroNome] = useState("");
  const [nome, setNome] = useState("");
  const [ativo, setAtivo] = useState(Boolean);
  const [data] = useState({ id: 0, nome: "", ativo: true });
  const [funcionarioLaboratorioId, setFuncionarioLaboratorioId] = useState(0);

  let idParams = !id ? "0" : id.toString();

  useEffect(() => {

    async function Init() {
      const response = await GetId("RetornaFuncionarioLaboratorioPorId", idParams);
      if (response.status == 200) {
        setFuncionarioLaboratorioId(response.data.id);
        setNome(response.data.nome);
        setAtivo(response.data.ativo)
      }
    }

    Init()
  }, [])

  async function submit() {
    setErroNome("");
    setIsLoading(true);

    if (!nome.trim()) {
      setIsOpenFail(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsOpenFail(false);
        setErroNome("Campo nome é obrigatório !")
      }, 2000)
      return;
    }

    data.id = funcionarioLaboratorioId;
    data.nome = nome.trim();
    data.ativo = ativo;

    const resp = await postFormAll("EditarFuncionarioLaboratorio", data);

    if (resp.status == 200) {
      setIsOpenSuccess(true);
      setTimeout(() => {
        navigate("/funcionarioLaboratorio");
      }, 2000)
    } else {
      setIsOpenFail(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsOpenFail(false);
        setErroNome(resp.request.response)
      }, 2000)
    }

  }

  return (
    <>
      <HeaderMainContent title="ADICIONAR FUNCIONÁRIO LABORATÓRIO" IncludeButton={false} ReturnButton={false} />
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-5">
              <CustomInput
                label="Nome"
                type="text"
                placeholder="Digite o nome do funcionário do laboratório"
                value={nome}
                maxLength={50}
                erro={erroNome}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNome(e.target.value)
                }
                required={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-1">
              <CheckboxCustom
                options={["Ativo"]}
                check={ativo}
                onClickOptions={(e: ChangeEvent<HTMLInputElement>) =>
                  setAtivo(e.target.checked)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6 mt-2">
              <ButtonConfirm onCLick={submit} isLoading={isLoading} />
              <ButtonCancel to="funcionarioLaboratorio" />
            </div>
          </div>
        </Container>
        <SuccessModal show={isOpenSuccess} textCustom="Funcionário Laboratório editado com " />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}