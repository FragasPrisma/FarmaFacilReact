import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { Container } from "./styles";
import { useEffect, useState } from "react";
import { GetId } from "../../Services/Api";
import { useParams } from "react-router-dom";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom/index";
import { RadioCustom } from "../../Components/Inputs/RadioCustom/index";
import { INaturezaOperacao } from "../../Interfaces/NaturezaOperacao/INaturezaOperacao";

export function NaturezaOperacaoDetails() {

    const [naturezaOperacaoModel, setNaturezaOperacaoModel] = useState({} as INaturezaOperacao);

    const [nomeCst, setNomeCst] = useState("");
    const [nomeCsosn, setNomeCsosn] = useState("");
    const [nomePlanoDeContas, setNomePlanoDeContas] = useState("");


    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaNaturezaDeOperacaoPorId", idParams);
            if (response.status == 200) {

                setNaturezaOperacaoModel(response.data);

                if (response.data.planoDeConta) { setNomePlanoDeContas(response.data.planoDeConta.descricao) }
                if (response.data.cst) { setNomeCst(response.data.cst.descricao) }
                if (response.data.csosn) { setNomeCsosn(response.data.csosn.descricao) }
            }
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent
                title="DETALHES NATUREZA DE OPERAÇÃO"
                IncludeButton={false}
                ReturnButton={true}
                to="naturezadeoperacao"
            />
            <div className="form-group">
                {naturezaOperacaoModel.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-2">
                                <CustomInput
                                    label="Código"
                                    type="number"
                                    value={naturezaOperacaoModel.codigo}
                                    readonly={true}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <CustomInput
                                    label="Descrição"
                                    type="text"
                                    value={naturezaOperacaoModel.descricao}
                                    readonly={true}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <CustomInput
                                    label="Observação"
                                    type="text"
                                    value={naturezaOperacaoModel.observacao}
                                    readonly={true}
                                    required={false}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3">
                                <RadioCustom
                                    titleComponet="Tipo"
                                    options={[
                                        "Entrada",
                                        "Saida"
                                    ]}
                                    name="tipo"
                                    readonly={true}
                                    value={naturezaOperacaoModel.tipo}
                                />
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-4">
                                <CheckboxCustom options={[
                                    "Exige documento referenciado"
                                ]}
                                    check={naturezaOperacaoModel.exibeDocumentoReferenciado}
                                    readOnly={true}
                                />
                            </div>
                            <div className="col-4">
                                <CheckboxCustom options={[
                                    "Exportar Sintegra"
                                ]}
                                    check={naturezaOperacaoModel.exportarSintegra}
                                    readOnly={true}
                                />
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-4">
                                <CheckboxCustom options={[
                                    "Considerar CFOP no crédito do ICMS"
                                ]}
                                    check={naturezaOperacaoModel.considerarCfopCreditoIcms}
                                    readOnly={true}
                                />
                            </div>
                            <div className="col-4">
                                <CheckboxCustom options={[
                                    "Não incide PIS"
                                ]}
                                    check={naturezaOperacaoModel.naoInsidePis}
                                    readOnly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                <CheckboxCustom options={[
                                    "Não incide COFINS"
                                ]}
                                    check={naturezaOperacaoModel.naoInsideCofins}
                                    readOnly={true}
                                />
                            </div>
                            <div className="col-4">
                                <CheckboxCustom options={[
                                    "Não incide ICMS"
                                ]}
                                    check={naturezaOperacaoModel.naoInsideIcms}
                                    readOnly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                <CheckboxCustom options={[
                                    "CFOP de devolução"
                                ]}
                                    check={naturezaOperacaoModel.cfopDevolucao}
                                    readOnly={true}
                                />
                            </div>
                            <div className="col-4">
                                <CheckboxCustom options={[
                                    "CFOP Substituição tributária"
                                ]}
                                    check={naturezaOperacaoModel.cfopSubstituicaoTributaria}
                                    readOnly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <CustomInput
                                    label="Plano de Contas"
                                    type="text"
                                    value={nomePlanoDeContas}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label="CST"
                                    type="text"
                                    value={nomeCst}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="CSOSN"
                                    type="text"
                                    value={nomeCsosn}
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
