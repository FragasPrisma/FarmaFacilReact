import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { IAdministradoCartao } from "../../Interfaces/AdministradoCartao/IAdministradoCartao";

export function AdministradoraCartaoDetails() {

    const [administradoraModel, setAdministradoModel] = useState({} as IAdministradoCartao);

    const { id } = useParams();

    const [nomeFornecedor, setNomeFornecedor] = useState("");
    const [descricaoPLanoDeContas, setDescricaoPLanoDeContas] = useState("");

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaAdministradoraDeCartaoPorId", idParams);

            setAdministradoModel(response.data);

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
                {administradoraModel.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-5">
                                <CustomInput
                                    label="Nome"
                                    type="text"
                                    value={administradoraModel.nome}
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
                                    value={administradoraModel.prazoRecebimento}
                                    required={false}
                                    readonly={true}
                                    textAlign={true}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="Desconto Administradora (%)"
                                    type="number"
                                    value={administradoraModel.desconto}
                                    required={false}
                                    readonly={true}
                                    textAlign={true}
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
                                    titleComponet="Gerenciador TEF"
                                    value={administradoraModel.gerenciador}
                                />
                            </div>
                            <div className="col-5">
                                {administradoraModel.gerenciador == 0 &&
                                    <RadioCustom
                                        titleComponet="Cielo Premia"
                                        options={["Troco",
                                            "Desconto",
                                            "ViasDiferenciadas",
                                            "CupomReduzido"]}
                                        name="cieloPremia"
                                        readonly={true}
                                        value={administradoraModel.cieloPremia}
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
                                    titleComponet="Modadilade"
                                    value={administradoraModel.modalidade}
                                />
                            </div>
                            <div className="col-2 mt-4">
                                <CheckboxCustom
                                    options={["Administradora Ativa"]}
                                    check={administradoraModel.ativo}
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
