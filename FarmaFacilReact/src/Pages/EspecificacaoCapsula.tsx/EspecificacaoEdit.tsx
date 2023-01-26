import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";

export function EspecificacaoEdit() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [descricao, setDescricao] = useState("");
    const [prioridade, setPrioridade] = useState(Number);
    const [erroDescricao, setErroDescricao] = useState("");
    const [erroPrioridade, setErroPrioridade] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [idEspecificacao, setEspecificacaoId] = useState(0);
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaEspecificacaoCapsulaPorId", idParams);
            setEspecificacaoId(response.data.id);
            setDescricao(response.data.descricao);
            setPrioridade(response.data.prioridade)
        }

        Init()
    }, [])

    const data = {
        id: idEspecificacao,
        descricao: descricao,
        prioridade: prioridade
    };

    async function submit() {

        setErroDescricao("");
        setErroPrioridade("");
        setIsLoading(true);

        if (!descricao.trim()) {
            setErroDescricao("Campo descrição é obrigatório !")
            setIsLoading(false);
            return;
        }

        if (!prioridade) {
            setErroPrioridade("Campo prioridade é obrigatório !")
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("EditarEspecificacaoCapsula", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/especificacaocapsula");
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
            <HeaderMainContent title="EDITAR ESPECIFICAÇÃO CÁPSULA" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                {idEspecificacao > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-5">
                                <CustomInput
                                    label="Descrição"
                                    type="text"
                                    placeholder="Digite a descrição"
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
                            <div className="col-4">
                                <CustomInput
                                    label="Prioridade"
                                    type="number"
                                    placeholder="Digite a observação"
                                    value={prioridade}
                                    erro={erroPrioridade}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setPrioridade(parseInt(e.target.value))
                                    }
                                    required={true}
                                />
                            </div>
                        </div>
                    </Container>
                }
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="especificacaocapsula" />
                    </div>
                </div>
                <SuccessModal show={isOpenSuccess} />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
