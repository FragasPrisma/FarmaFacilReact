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
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { CustomTextArea } from "../../Components/Inputs/CustomTextArea";
import { Question } from "phosphor-react";
import { Table } from "react-bootstrap";
import { TableHelp } from "./TableHelp";
import { IMensagemPadrao } from "../../Interfaces/MensagemPadrao/IMensagemPadrao";
import { LabelObrigatorio } from "../../Components/Others/LabelMensagemObrigatorio";

export function MensagemPadraoEdit() {

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
    const [idMensagem, setId] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {
        async function Init() {
            const response = await GetId("RetornaMensagensPadraoPorId", idParams);
            setId(response.data.id);
            setStatusDescricao(response.data.statusDescricao);
            setMensagem(response.data.mensagem)
            setEnviarAutomatico(response.data.enviarAutomatico)
            setDescricaoRotulo(response.data.descricaoRotulo)
        }

        Init();
    }, []);



    const data : IMensagemPadrao = {
        id: idMensagem,
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
            setErroStatus("Campo de preenchimento obrigatório.")
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000)
            return;
        }

        if (!mensagem.trim()) {
            setErroMensagem("Campo de preenchimento obrigatório.")
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000)
            return;
        }

        const resp = await postFormAll("EditarMensagensPadrao", data);

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
            <HeaderMainContent title="Editar Mensagem Padrão" IncludeButton={false} ReturnButton={false} />
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
                        <div className="col-2 mb-3 mt-1">
                            <CheckboxCustom
                                options={["Descrição rótulo"]}
                                onClickOptions={(e) => setDescricaoRotulo(e.target.checked)}
                                check={descricaoRotulo}
                            />
                        </div>
                        <div className="col-2 mt-1">
                            <CheckboxCustom
                                options={["Enviar automáticamente"]}
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
                    <LabelObrigatorio/>
                    <div className="row">
                        <div className="col-6">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="mensagenspadrao" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Registro editado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
