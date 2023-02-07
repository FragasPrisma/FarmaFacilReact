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
import { SelectInput } from "../../Components/Inputs/SelectInput";
import { IEtapa } from "../../Interfaces/Etapa/IEtapa";

export function EtapaEdit() {
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false);
    const { id } = useParams();
    const [descricao, setDescricao] = useState("");
    const [sequencia, setSequencia] = useState(Number);
    const [tipo, setTipo] = useState("");
    const [processo, setProcesso] = useState("");
    const [obrigatoria, setObrigatoria] = useState("");
    const [tempoMaximo, setTempoMaximo] = useState("");
    const [etapaId, setEtapaId] = useState(0);
    const [erroDescricao, setErroDescricao] = useState("");
    const [erroSequencia, setErroSequencia] = useState("");
    const [erroTipo, setErroTipo] = useState("");
    const [data] = useState({
        id: 0,
        descricao: "",
        sequencia: 0,
        processo: "",
        obrigatoria: "",
        tipo: "",
        tempoMaximo: "",
    } as IEtapa)

    let idParams = !id ? "0" : id.toString();

    useEffect(() =>{
    
        async function Init() {
          const response = await GetId("RetornaEtapaPorId", idParams);
          if(response.status == 200){
            setEtapaId(response.data.id);
            setDescricao(response.data.descricao);
            setSequencia(response.data.sequencia);
            setTipo(response.data.tipo);
            setProcesso(response.data.processo);
            setObrigatoria(response.data.obrigatoria);
            setTempoMaximo(response.data.tempoMaximo);
          }
        }
    
        Init()
    },[])

    async function submit() {
        setErroDescricao("")
        setErroSequencia("")
        setErroTipo("")
        setIsLoading(true)

        if (!descricao.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroDescricao("Campo descrição é obrigatório !")
            }, 2000)
            return;
        }

        if (sequencia <= 0) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroSequencia("Campo sequencia não pode ser menor ou igual a 0!")
            }, 2000)
            return;
        }

        if (!tipo.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroTipo("Campo tipo é obrigatório !")
            }, 2000)
            return;
        }

        data.id = etapaId;
        data.descricao = descricao.trim();
        data.sequencia = sequencia;
        data.tipo = tipo.trim();
        data.processo = processo.trim();
        data.obrigatoria = obrigatoria.trim();
        data.tempoMaximo = tempoMaximo.trim();

        const response = await postFormAll("EditarEtapa", data);

        if (response.status === 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/etapa");
            }, 2000)
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000)
        }
    }

    return (
        <>
            <HeaderMainContent title="EDITAR ETAPA" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                placeholder="Digite a descrição da Etapa"
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
                        <div className="col-3">
                            <CustomInput
                                label="Sequência"
                                type="number"
                                placeholder="Digite um valor para a sequência"
                                value={sequencia}
                                erro={erroSequencia}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setSequencia(parseInt(e.target.value))
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <SelectInput 
                                options={["","Nenhum", "Imagem Vinculada", "Produção Concluída", "Conferência"]}
                                label="Processo"
                                Select={(select) => setProcesso(select)}
                                valueEdit={processo}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <SelectInput 
                                options={["","Sim", "Não"]}
                                label="Obrigatória"
                                Select={(select) => setObrigatoria(select)}
                                valueEdit={obrigatoria}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <SelectInput 
                                options={["","Inicial", "Intermediária", "Final"]}
                                label="Tipo"
                                required={true}
                                erro={erroTipo}
                                Select={(select) => setTipo(select)}
                                valueEdit={tipo}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput 
                                label="Tempo Máximo"
                                type="time"
                                step="1"
                                placeholder="00:00:00"
                                value={tempoMaximo}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setTempoMaximo(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mt-2">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="etapa" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Etapa editada com"/>
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}