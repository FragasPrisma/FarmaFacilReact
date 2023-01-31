import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { Container } from "./styles";
import { ChangeEvent, useState } from "react";
import { postFormAll } from "../../Services/Api";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { useNavigate } from "react-router-dom";
import { SelectInput } from "../../Components/Inputs/SelectInput";

export function EtapaCreate() {
    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [descricao, setDescricao] = useState("");
    const [sequencia, setSequencia] = useState(Number);
    const [tipo, setTipo] = useState("");
    const [processo, setProcesso] = useState("");
    const [obrigatoria, setObrigatoria] = useState("");
    const [tempoMaximo, setTempoMaximo] = useState("");
    const [erroDescricao, setErroDescricao] = useState("");
    const [erroSequencia, setErroSequencia] = useState("");
    const [erroTipo, setErroTipo] = useState("");

    const data = {
        id: 0,
        descricao: descricao.trim(),
        sequencia: sequencia,
        processo: processo.trim(),
        obrigatoria: obrigatoria.trim(),
        tipo: tipo.trim(),
        tempoMaximo: tempoMaximo.trim(),
    }

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

        const response = await postFormAll("AdicionarEtapa", data);

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
            <HeaderMainContent title="ADICIONAR ETAPA" IncludeButton={false} ReturnButton={false} />
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
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <SelectInput 
                                options={["","Sim", "Não"]}
                                label="Obrigatória"
                                Select={(select) => setObrigatoria(select)}
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
                <SuccessModal show={isOpenSuccess} textCustom="Etapa adicionada com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}