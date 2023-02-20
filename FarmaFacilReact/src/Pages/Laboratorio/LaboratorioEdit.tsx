import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useParams,useNavigate } from 'react-router-dom';
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";

export function LaboratorioEdit() {
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [erroDescricao,setErroDescricao] = useState("");
    const [descricao, setDescricao] = useState("");
    const { id } = useParams();
    const [laboratorioId, setLaboratorioId] = useState(0);
    const [data] = useState({id:0,descricao:""});
    const [isLoading,setIsLoading] = useState(false);
    
    let idParams = !id ? "0" : id.toString();

    useEffect(() =>{
    
        async function Init() {
          const response = await GetId("RetornaLaboratorioPorId", idParams);
          if(response.status == 200){
            setLaboratorioId(response.data.id);
            setDescricao(response.data.descricao);
          }
        }
    
        Init()
    },[])

    async function submit() {
        setErroDescricao("");
        setIsLoading(true);

        if(!descricao.trim()){
          setIsOpenFail(true);
          setIsLoading(false);
          setTimeout(() => {
            setIsOpenFail(false);
            setErroDescricao("Campo descrição é obrigatório !")
          }, 2000)
          return;
        }
    
        data.id = laboratorioId;
        data.descricao = descricao.trim();
        
        const resp = await postFormAll("EditarLaboratorio", data);
    
        if(resp.status == 200){
          setIsOpenSuccess(true);
          setTimeout(() => {
            navigate("/laboratorio");
          }, 2000)
        }else{
          setIsOpenFail(true);
          setIsLoading(false);
          setTimeout(() => {
            setIsOpenFail(false);
            setErroDescricao(resp.request.response)
          }, 2000)
        }
    
      }

    return (
        <>
            <HeaderMainContent title="EDITAR LABORATÓRIO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                placeholder="Digite a descrição para o laboratório"
                                value={descricao}
                                maxLength={50}
                                erro={erroDescricao}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDescricao(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mt-2">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading}/>
                            <ButtonCancel to="laboratorio" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Laboratório editado com"/>
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}