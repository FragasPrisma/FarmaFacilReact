import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState } from "react";
import { postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { CustomTextArea } from "../../Components/Inputs/CustomTextArea";
import { Question } from "phosphor-react";
import { TableHelp } from "./TableHelp";
import { IMensagemPadrao } from "../../Interfaces/MensagemPadrao/IMensagemPadrao";

export function MensagemPadraoCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [statusDescricao, setStatusDescricao] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [enviarAutomatico, setEnviarAutomatico] = useState(false);
    const [descricaoRotulo, setDescricaoRotulo] = useState(false);
    const [erroStatus, setErroStatus] = useState("");
    const [erroMensagem, setErroMensagem] = useState("");
    const [help, setHelp] = useState(false);
    const [colunas, setColunas] = useState(112)
    const navigate = useNavigate();



    const data : IMensagemPadrao = {
        id: 0,
        statusDescricao: statusDescricao.trim(),
        mensagem: mensagem.trim(),
        enviarAutomatico: enviarAutomatico,
        descricaoRotulo: descricaoRotulo
    };

    function ColHelper(bool: boolean) {
        setHelp(bool)
        if (colunas == 56) {
            setColunas(112)
        } else {
            setColunas(56)
        }
    }

    async function submit() {

        setErroStatus("")
        setErroMensagem("")
        setIsLoading(true);

        if (!statusDescricao.trim()) {
            setErroStatus("Campo status é obrigatório !")
            setIsLoading(false);
            return;
        }

        if (!mensagem.trim()) {
            setErroMensagem("Campo mensagem é obrigatório !")
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("AdicionarMensagensPadrao", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/mensagenspadrao");
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
            <HeaderMainContent title="ADICIONAR MENSAGEM PADRÃO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5 mb-3">
                            <CustomInput
                                label="Status"
                                type="text"
                                placeholder="Digite o status"
                                value={statusDescricao}
                                maxLength={30}
                                erro={erroStatus}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setStatusDescricao(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                        <div className="col-2 mb-3">
                            <CheckboxCustom
                                options={["Descrição Rótulo"]}
                                onClickOptions={(e) => setDescricaoRotulo(e.target.checked)}
                                check={descricaoRotulo}
                            />
                        </div>
                        <div className="col-2">
                            <CheckboxCustom
                                options={["Enviar Automáticamente"]}
                                onClickOptions={(e) => setEnviarAutomatico(e.target.checked)}
                                check={enviarAutomatico}
                            />
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-auto">
                            <CustomTextArea
                                value={mensagem}
                                label="Mensagem"
                                cols={colunas}
                                rows={20}
                                maxLength={1000}
                                erro={erroMensagem}
                                required={true}
                                OnChange={(e) => { setMensagem(e.target.value) }}
                            />
                        </div>

                        {help &&
                            <div className="col-5 containerHelp">
                                <TableHelp />
                            </div>
                        }
                    </div>
                    <div className="row mb-2 mt-3 containerHover">
                        <div className="col-auto" onClick={() => ColHelper(!help)}>
                            <Question size={36} color="#cf0209" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="mensagenspadrao" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Mensagem Padrão adicionada com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
