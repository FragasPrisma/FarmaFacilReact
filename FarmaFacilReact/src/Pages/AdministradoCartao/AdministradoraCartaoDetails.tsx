import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";

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
            const response = await GetId("RetornaAdministradoraDeCartaoPorId", idParams);

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
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES ADMINISTRADORA DE CARTÃO" IncludeButton={false} ReturnButton={true} to="administradoradecartao" />
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
                                    readonly={true}
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
                                        readonly={true}
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
                                    readonly={true}
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
