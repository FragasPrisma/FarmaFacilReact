import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { getAll, GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";

export function AdministradoraCartaoDetails() {

    const [nome, setNome] = useState("");
    const [prazoDeRecebimento, setPrazoDeRecebimento] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [gerenciador, setGerenciador] = useState(-1);
    const [cieloPremia, setCieloPremia] = useState(-1);
    const [modalidade, setmodalidade] = useState(0);
    const [ativo, setAtivo] = useState(false);

    const { id } = useParams();

    const [nomeFornecedor, setNomeFornecedor] = useState("");
    const [descricaoPLanoDeContas, setDescricaoPLanoDeContas] = useState("");

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaAdministradoraCartaoPorId", idParams);

            setNome(response.data.nome);
            setPrazoDeRecebimento(response.data.prazoRecebimento)
            setDesconto(response.data.desconto)
            setGerenciador(response.data.gerenciador)
            setCieloPremia(response.data.cieloPremia)
            setmodalidade(response.data.modalidade)
            setAtivo(response.data.ativo)

            if (response.data.fornecedor) {
                setNomeFornecedor(response.data.fornecedor.nomeFornecedor)
            }
            if (response.data.planoDeConta) {
                setDescricaoPLanoDeContas(response.data.planoDeConta.descricao)
            }
            console.log(response.data)
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES ADMINISTRADORA CARTÃO" IncludeButton={false} ReturnButton={true} to="administradoracartao" />
            <div className="form-group">
                {nome &&
                    <Container>
                        <div className="row">
                            <div className="col-5">
                                <CustomInput
                                    label="Nome"
                                    type="text"
                                    value={nome}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <CustomInput
                                    label="Recebimento (Dias)"
                                    type="number"
                                    value={prazoDeRecebimento}
                                    required={false}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="Desconto Administradora (%)"
                                    type="number"
                                    value={desconto}
                                    required={false}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-5">
                                <RadioCustom
                                    options={["VisaMasterAmex",
                                        "BanriCompras",
                                        "ConvCard",
                                        "EDMCard",
                                        "HiperCard",
                                        "Integracao4S"]}
                                    name="gerenciador"
                                    onClickOptions={(value, label) => setGerenciador(value)}
                                    titleComponet="Gerenciador TEF"
                                    value={gerenciador}
                                />
                            </div>
                            <div className="col-5">
                                {gerenciador == 0 &&
                                    <RadioCustom
                                        titleComponet="Cielo Premia"
                                        options={["Troco",
                                            "Desconto",
                                            "ViasDiferenciadas",
                                            "CupomReduzido"]}
                                        name="cieloPremia"
                                        onClickOptions={(value, label) => setCieloPremia(value)}
                                        value={cieloPremia}
                                    />
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <RadioCustom
                                    options={["Débito",
                                        "Crédito"]}
                                    name="modalidade"
                                    onClickOptions={(value, label) => setmodalidade(value)}
                                    titleComponet="Modadilade"
                                    value={modalidade}
                                />
                            </div>
                            <div className="col-2 mt-4">
                                <CheckboxCustom
                                    options={["Administradora Ativa"]}
                                    check={ativo}
                                    onClickOptions={(check) => setAtivo(check)}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-5">
                                <CustomInput
                                    label="Fornecedor"
                                    type="text"
                                    value={nomeFornecedor}
                                    required={false}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-5">
                                <CustomInput
                                    label="Plano de Contas"
                                    type="text"
                                    value={descricaoPLanoDeContas}
                                    required={false}
                                    readonly={true}
                                />
                            </div>
                        </div>
                    </Container>
                }
            </div>
        </>
    );
}
