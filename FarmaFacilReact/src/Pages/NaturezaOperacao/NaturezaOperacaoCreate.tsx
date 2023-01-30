import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { Container } from "./styles";
import { ChangeEvent, useEffect, useState } from "react";
import { getAll, postFormAll } from "../../Services/Api";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { useNavigate } from "react-router-dom";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom/index";
import { RadioCustom } from "../../Components/Inputs/RadioCustom/index";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";

export function NaturezaOperacaoCreate() {

    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [erroCodigo, setErroCodigo] = useState("");
    const [erroDescricao, setErroDescricao] = useState("");

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

    const [planoDeContaId, setPlanoDeContaId] = useState();
    const [cstId, setCstId] = useState();
    const [csosnId, setCsosnId] = useState();

    const [tributosCsts, setTributosCsts] = useState([]);
    const [tributosCsons, setTributosCsons] = useState([]);
    const [planoDeContas, setPlanoDeContas] = useState([]);

    useEffect(() => {
        const loadDataTributoCst = async () => {
            const response = await getAll("ListaTributo");
            let TributoFilter = response.data;
            setTributosCsts(TributoFilter.filter((x: { tipoTributo: number; }) => x.tipoTributo == 0));
            setTributosCsons(TributoFilter.filter((x: { tipoTributo: number; }) => x.tipoTributo == 1));
        }

        loadDataTributoCst()
    }, []);

    useEffect(() => {
        const loadDataPlanoDeContas = async () => {
            const response = await getAll("ListaPlanoDeContas");
            let planoDecontasFilter = response.data;
            setPlanoDeContas(planoDecontasFilter.filter((x: { nivelConta: number; }) => x.nivelConta == 2));
        }

        loadDataPlanoDeContas()
    }, []);

    const data = {
        id: 0,
        codigo: codigo,
        descricao: descricao,
        tipo: tipo,
        exportarSintegra: exportarSintegra,
        observacao: observacao,
        exibeDocumentoReferenciado: exibeDocumentoReferenciado,
        considerarCfopCreditoIcms: considerarCfopCreditoIcms,
        naoInsidePis: naoInsidePis,
        naoInsideCofins: naoInsideCofins,
        naoInsideIcms: naoInsideIcms,
        cfopDevolucao: cfopDevolucao,
        cfopSubstituicaoTributaria: cfopSubstituicaoTributaria,
        planoDeContaId: planoDeContaId,
        cstId: cstId,
        csosnId: csosnId
    };

    async function submit() {

        setErroCodigo("");
        setErroDescricao("");
        setIsLoading(true);

        if (!codigo || codigo < 0) {
            setErroCodigo("Campo código é obrigatório !")
            return;
        }

        if (!descricao.trim()) {
            setErroDescricao("Campo descrição é obrigatório !")
            return;
        }

        const response = await postFormAll("AdicionarNaturezaOperacao", data);

        if (response.status === 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/naturezadeoperacao");
            }, 2000);
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000);
        }
    }

    return (
        <>
            <HeaderMainContent
                title="ADICIONAR NATUREZA DE OPERAÇÃO"
                IncludeButton={false}
                ReturnButton={false}
            />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Código"
                                type="number"
                                placeholder="Digite o código"
                                value={codigo}
                                maxLength={25}
                                erro={erroCodigo}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCodigo(parseInt(e.target.value))
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                placeholder="Digite a descrição"
                                value={descricao}
                                maxLength={250}
                                erro={erroDescricao}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDescricao(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <CustomInput
                                label="Observação"
                                type="text"
                                placeholder="Digite a observação"
                                value={observacao}
                                maxLength={50}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setObservacao(e.target.value)
                                }
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
                                onClickOptions={(value, label) => setTipo(value)}
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
                                onClickOptions={(e) => setExibeDocumentoReferenciado(e.target.checked)}
                            />
                        </div>
                        <div className="col-4">
                            <CheckboxCustom options={[
                                "Exportar Sintegra"
                            ]}
                                check={exportarSintegra}
                                onClickOptions={(e) => setExportarSintegra(e.target.checked)}
                            />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-4">
                            <CheckboxCustom options={[
                                "Considerar CFOP no crédito do ICMS"
                            ]}
                                check={considerarCfopCreditoIcms}
                                onClickOptions={(e) => setConsiderarCfopCreditoIcms(e.target.checked)}
                            />
                        </div>
                        <div className="col-4">
                            <CheckboxCustom options={[
                                "Não incide PIS"
                            ]}
                                check={naoInsidePis}
                                onClickOptions={(e) => setNaoInsidePis(e.target.checked)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <CheckboxCustom options={[
                                "Não incide COFINS"
                            ]}
                                check={naoInsideCofins}
                                onClickOptions={(e) => setNaoInsideCofins(e.target.checked)}
                            />
                        </div>
                        <div className="col-4">
                            <CheckboxCustom options={[
                                "Não incide ICMS"
                            ]}
                                check={naoInsideIcms}
                                onClickOptions={(e) => setNaoInsideIcms(e.target.checked)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <CheckboxCustom options={[
                                "CFOP de devolução"
                            ]}
                                check={cfopDevolucao}
                                onClickOptions={(e) => setCfopDevolucao(e.target.checked)}
                            />
                        </div>
                        <div className="col-4">
                            <CheckboxCustom options={[
                                "CFOP Substituição tributária"
                            ]}
                                check={cfopSubstituicaoTributaria}
                                onClickOptions={(e) => setCfopSubstituicaoTributaria(e.target.checked)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <CustomDropDown
                                data={planoDeContas}
                                title="Selecione o Plano de Contas"
                                filter="descricao"
                                label="Plano de Contas"
                                Select={(planoDeContaId) => setPlanoDeContaId(planoDeContaId)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            <CustomDropDown
                                data={tributosCsts}
                                title="Selecione o CST"
                                filter="descricao"
                                label="CST"
                                Select={(cstId) => setCstId(cstId)}
                            />
                        </div>
                        <div className="col-3">
                            <CustomDropDown
                                data={tributosCsons}
                                title="Selecione o CSOSN"
                                filter="descricao"
                                label="CSOSN"
                                Select={(csosnId) => setCsosnId(csosnId)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6 mt-2">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="naturezadeoperacao" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Natureza de Operação adicionada com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
