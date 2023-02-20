import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { CustomTextArea } from "../../Components/Inputs/CustomTextArea";
import { Question } from "phosphor-react";
import { TableHelp } from "./TableHelp";
import { IMensagemPadrao } from "../../Interfaces/MensagemPadrao/IMensagemPadrao";

export function MensagemPadraoDetials() {

    const [mensagemModel, setMensagemModel] = useState({} as IMensagemPadrao);
    const [help, setHelp] = useState(false);
    const [colunas, setColunas] = useState(112)

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {
        async function Init() {
            const response = await GetId("RetornaMensagensPadraoPorId", idParams);
            setMensagemModel(response.data);
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
            <HeaderMainContent title="Visualizar Mensagem Padrão" IncludeButton={false} ReturnButton={true} to="mensagenspadrao" />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5 mb-3">
                            <CustomInput
                                label="Status"
                                type="text"
                                value={mensagemModel.statusDescricao}
                                readonly={true}
                                required={true}
                            />
                        </div>
                        <div className="col-2 mb-3">
                            <CheckboxCustom
                                options={["Descrição Rótulo"]}
                                check={mensagemModel.descricaoRotulo}
                                readOnly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CheckboxCustom
                                options={["Enviar Automáticamente"]}
                                check={mensagemModel.enviarAutomatico}
                                readOnly={true}
                            />
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-auto">
                            <CustomTextArea
                                value={mensagemModel.mensagem}
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
