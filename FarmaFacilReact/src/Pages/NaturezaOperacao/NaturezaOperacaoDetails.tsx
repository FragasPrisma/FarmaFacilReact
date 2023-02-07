import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { Container } from "./styles";
import { useEffect, useState } from "react";
import { GetId } from "../../Services/Api";
import { useParams } from "react-router-dom";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom/index";
import { RadioCustom } from "../../Components/Inputs/RadioCustom/index";

export function NaturezaOperacaoDetails() {

    const [idNaturezaOperacao, setId] = useState(0);
    const [codigo, setCodigo] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState(0);
    const [exportarSintegra, setExportarSintegra] = useState(false);
    const [observacao, setObservacao] = useState("");
    const [exibeDocumentoReferenciado, setExibeDocumentoReferenciado] = useState(false);
    const [considerarCfopCreditoIcms, setConsiderarCfopCreditoIcms] = useState(false);
    const [naoInsidePis, setNaoInsidePis] = useState(false);
    const [naoInsideCofins, setNaoInsideCofins] = useState(false);
    const [naoInsideIcms, setNaoInsideIcms] = useState(false);
    const [cfopDevolucao, setCfopDevolucao] = useState(false);
    const [cfopSubstituicaoTributaria, setCfopSubstituicaoTributaria] = useState(false);

    const [nomeCst, setNomeCst] = useState("");
    const [nomeCsosn, setNomeCsosn] = useState("");
    const [nomePlanoDeContas, setNomePlanoDeContas] = useState("");


    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaNaturezaDeOperacaoPorId", idParams);
            if (response.status == 200) {

                setId(response.data.id);
                setCodigo(response.data.codigo)
                setDescricao(response.data.descricao)
                setObservacao(response.data.observacao)
                setTipo(response.data.tipo)
                setExportarSintegra(response.data.exportarSintegra)
                setExibeDocumentoReferenciado(response.data.exibeDocumentoReferenciado)
                setConsiderarCfopCreditoIcms(response.data.considerarCfopCreditoIcms)
                setNaoInsidePis(response.data.naoInsidePis)
                setNaoInsideCofins(response.data.naoInsideCofins)
                setNaoInsideIcms(response.data.naoInsideIcms)
                setCfopDevolucao(response.data.cfopDevolucao)
                setCfopSubstituicaoTributaria(response.data.cfopSubstituicaoTributaria)

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
                {idNaturezaOperacao > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-2">
                                <CustomInput
                                    label="Código"
                                    type="number"
                                    value={codigo}
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
                                    value={descricao}
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
                                    value={observacao}
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
                                    value={tipo}
                                />
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-4">
                                <CheckboxCustom options={[
                                    "Exige documento referenciado"
                                ]}
                                    check={exibeDocumentoReferenciado}
                                    readOnly={true}
                                />
                            </div>
                            <div className="col-4">
                                <CheckboxCustom options={[
                                    "Exportar Sintegra"
                                ]}
                                    check={exportarSintegra}
                                    readOnly={true}
                                />
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-4">
                                <CheckboxCustom options={[
                                    "Considerar CFOP no crédito do ICMS"
                                ]}
                                    check={considerarCfopCreditoIcms}
                                    readOnly={true}
                                />
                            </div>
                            <div className="col-4">
                                <CheckboxCustom options={[
                                    "Não incide PIS"
                                ]}
                                    check={naoInsidePis}
                                    readOnly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                <CheckboxCustom options={[
                                    "Não incide COFINS"
                                ]}
                                    check={naoInsideCofins}
                                    readOnly={true}
                                />
                            </div>
                            <div className="col-4">
                                <CheckboxCustom options={[
                                    "Não incide ICMS"
                                ]}
                                    check={naoInsideIcms}
                                    readOnly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                <CheckboxCustom options={[
                                    "CFOP de devolução"
                                ]}
                                    check={cfopDevolucao}
                                    readOnly={true}
                                />
                            </div>
                            <div className="col-4">
                                <CheckboxCustom options={[
                                    "CFOP Substituição tributária"
                                ]}
                                    check={cfopSubstituicaoTributaria}
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
