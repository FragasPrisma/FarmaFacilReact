import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState ,useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";
import { CustomTextArea } from "../../Components/Inputs/CustomTextArea";
import { Question } from "phosphor-react";
import { TableHelp } from "./TableHelp";

export function MensagemPadraoDetials() {

    const [statusDescricao, setStatusDescricao] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [enviarAutomatico, setEnviarAutomatico] = useState(false);
    const [descricaoRotulo, setDescricaoRotulo] = useState(false);
    const [help, setHelp] = useState(false);
    const [colunas, setColunas] = useState(112)

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {
        async function Init() {
            const response = await GetId("RetornaMensagensPadraoPorId", idParams);
            setStatusDescricao(response.data.statusDescricao);
            setMensagem(response.data.mensagem)
            setEnviarAutomatico(response.data.enviarAutomatico)
            setDescricaoRotulo(response.data.descricaoRotulo)
        }

        Init();
    }, []);

    function ColHelper(bool: boolean) {
        setHelp(bool)
        if (colunas == 56) {
            setColunas(112)
        } else {
            setColunas(56)
        }
    }

    return (
        <>
            <HeaderMainContent title="DETALHES MENSAGEM PADRÃO" IncludeButton={false} ReturnButton={true} to="mensagenspadrao" />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5 mb-3">
                            <CustomInput
                                label="Status"
                                type="text"
                                value={statusDescricao}
                                readonly={true}
                                required={true}
                            />
                        </div>
                        <div className="col-2 mb-3">
                            <CheckboxCustom
                                options={["Descrição Rótulo"]}
                                check={descricaoRotulo}
                                readOnly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CheckboxCustom
                                options={["Enviar Automáticamente"]}
                                check={enviarAutomatico}
                                readOnly={true}
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
                                readonly={true}
                                required={true}
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
                </Container>
            </div>
        </>
    );
}
