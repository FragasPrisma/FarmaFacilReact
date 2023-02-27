import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate, useParams } from 'react-router-dom';
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { IBairro } from "../../Interfaces/Bairro/IBairro";

export function BairroEdit() {

  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
<<<<<<< Updated upstream
  const navigate = useNavigate();
  const [erroNome,setErroNome] = useState("");
  const [nome, setNome] = useState("");
  const [bairroId, setBairroId] = useState(0);
  const { id } = useParams();
  const [isLoading,setIsLoading] = useState(false);
=======
  const [erroNome, setErroNome] = useState("");
  const [nome, setNome] = useState("");
  const [bairroId, setBairroId] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
>>>>>>> Stashed changes

  let idParams = !id ? "0" : id.toString();

  useEffect(() =>{
    
    async function Init() {
      const response = await GetId("RetornaBairroPorId", idParams);
      setBairroId(response.data.id);
      setNome(response.data.nome);
    }

    Init()
  },[])

  let data : IBairro = {
    id : bairroId,
    nome : nome
  }
    
  async function submit() {

    setErroNome("");
    setIsLoading(true);

    if(!nome.trim()){
      setIsOpenFail(true);
      setTimeout(() => {
        setIsOpenFail(false);
        setErroNome("Campo nome é obrigatório !")
      }, 2000)
      setIsLoading(false);
      return;
    }

    const resp = await postFormAll("EditarBairro", data);

<<<<<<< Updated upstream
    if(resp.status == 200){
=======
    if (resp.status == 200) {

>>>>>>> Stashed changes
      setIsOpenSuccess(true);
      setTimeout(() => {
        navigate("/bairro");
      }, 2000)
    }else{
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
<<<<<<< Updated upstream
      <HeaderMainContent title="EDITAR BAIRRO" IncludeButton={false} ReturnButton={false}/>
=======
      <HeaderMainContent title={`${t('bairro.titleEdit')}`} IncludeButton={false} ReturnButton={false} />
>>>>>>> Stashed changes
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-5">
              <CustomInput
                label="Nome"
                type="text"
                placeholder="Digite o nome do Bairro"
                value={nome}
                maxLength={50}
                erro={erroNome}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNome(e.target.value)
                }
                focusParam={true}
                required={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <ButtonConfirm onCLick={submit} isLoading={isLoading}/>
              <ButtonCancel to="bairro" />
            </div>
          </div>
        </Container>
<<<<<<< Updated upstream
        <SuccessModal show={isOpenSuccess} textCustom="Dado editado com"/>
=======
        <SuccessModal show={isOpenSuccess} textCustom={t('textGeneric.registroEditado').toString()} />
>>>>>>> Stashed changes
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
