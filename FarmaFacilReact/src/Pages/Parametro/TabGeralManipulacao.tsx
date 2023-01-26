import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { useState, ChangeEvent } from 'react'
import { RadioCustom } from "../../Components/Inputs/RadioCustom";

export let geralManipulacao = {
    id: 0,
    previsaoEntregaHoras: "",
    formulasHoras: "",
    margemSegurancaPadraoPercentual: "",
    tipoCRPadrao: "",
    excipientePadrao: "",
    mlGotas: "",
    farmacopeiaPadrao: "",
    valorPadrao: "",
    validadeHomeopatia: "",
    pesagemMonitorada: false,
    avisarEstoqueMinimoDeVenda: false,
    entregarRegistroReceituarioGeral: false,
    validadeFormulaPorLote: false,
    habilitaPCP: false,
    pesagemAutomatizadaDosItens: false,
    habilitaQuarentena: false,
    deduzirQuantidadeLoteAnteriorDaDinamizacao: false,
    buscaultimoFatorLoteOrcamentoUIUFCUTR: false,
    manterValorDaPreVenda: false,
    exibirQSPAutomático: false,
    formatacaoBSPO: 0,
    metodoDeAnalise: 0,
    alterarPesoDoProduto: 0,
    amostragemAmostras: "",
    amostragemPercentual: "",
    amostragemLimiteMenorIgualPercentual: "",
    amostragemLimiteMaiorIgualPercentual: "",
    amostragemQuantidadeG: "",
    amostragemDesPadraoRelat: "",
    amostragemQtdTeoricaMin: "",
    amostragemQtdTeoricaMax: "",
    conclusaoOrdemManipulacao:0
}

export const TabGeralManipulacao = () => {

    const [previsaoEntregaHoras, setPrevisaoEntregaHoras] = useState("");
    const [formulasHoras, setFormulasHoras] = useState("");
    const [margemSegurancaPadraoPercentual, setMargemSegurancaPadraoPercentual] = useState("");
    const [tipoCRPadrao, setTipoCRPadrao] = useState("");
    const [excipientePadrao, setExcipientePadrao] = useState("");
    const [mlGotas, setMlGotas] = useState("");
    const [farmacopeiaPadrao, setFarmacopeiaPadrao] = useState("");
    const [valorPadrao, setValorPadrao] = useState("");
    const [validadeHomeopatia, setValidadeHomeopatia] = useState("");
    const [pesagemMonitorada, setPesagemMonitorada] = useState(false);
    const [avisarEstoqueMinimoDeVenda, setAvisarEstoqueMinimoDeVenda] = useState(false);
    const [entregarRegistroReceituarioGeral, setEntregarRegistroReceituarioGeral] = useState(false);
    const [validadeFormulaPorLote, setValidadeFormulaPorLote] = useState(false);
    const [habilitaPCP, setHabilitaPCP] = useState(false);
    const [pesagemAutomatizadaDosItens, setPesagemAutomatizadaDosItens] = useState(false);
    const [habilitaQuarentena, setHabilitaQuarentena] = useState(false);
    const [deduzirQuantidadeLoteAnteriorDaDinamizacao, setDeduzirQuantidadeLoteAnteriorDaDinamizacao] = useState(false);
    const [buscaultimoFatorLoteOrcamentoUIUFCUTR, setBuscaultimoFatorLoteOrcamentoUIUFCUTR] = useState(false);
    const [manterValorDaPreVenda, setManterValorDaPreVenda] = useState(false);
    const [exibirQSPAutomático, setExibirQSPAutomático] = useState(false);
    const [formatacaoBSPO, setFormatacaoBSPO] = useState(0);
    const [metodoDeAnalise, setMetodoDeAnalise] = useState(0);
    const [alterarPesoDoProduto, setAlterarPesoDoProduto] = useState(0);
    const [amostragemAmostras, setAmostragemAmostras] = useState("");
    const [amostragemPercentual, setAmostragemPercentual] = useState("");
    const [amostragemLimiteMenorIgualPercentual, setAmostragemLimiteMenorIgualPercentual] = useState("");
    const [amostragemLimiteMaiorIgualPercentual, setAmostragemLimiteMaiorIgualPercentual] = useState("");
    const [amostragemQuantidadeG, setAmostragemQuantidadeG] = useState("");
    const [amostragemDesPadraoRelat, setAmostragemDesPadraoRelat] = useState("");
    const [amostragemQtdTeoricaMin, setAmostragemQtdTeoricaMin] = useState("");
    const [amostragemQtdTeoricaMax, setAmostragemQtdTeoricaMax] = useState("");
    const [conclusaoOrdemManipulacao,setConclusaoOrdemManipulacao] = useState(0);

    geralManipulacao.previsaoEntregaHoras = previsaoEntregaHoras;
    geralManipulacao.formulasHoras = formulasHoras;
    geralManipulacao.margemSegurancaPadraoPercentual = margemSegurancaPadraoPercentual;
    geralManipulacao.tipoCRPadrao = tipoCRPadrao;
    geralManipulacao.excipientePadrao = excipientePadrao;
    geralManipulacao.mlGotas = mlGotas;
    geralManipulacao.farmacopeiaPadrao = farmacopeiaPadrao;
    geralManipulacao.valorPadrao = valorPadrao;
    geralManipulacao.validadeHomeopatia = validadeHomeopatia;
    geralManipulacao.pesagemMonitorada = pesagemMonitorada;
    geralManipulacao.avisarEstoqueMinimoDeVenda = avisarEstoqueMinimoDeVenda;
    geralManipulacao.entregarRegistroReceituarioGeral = entregarRegistroReceituarioGeral;
    geralManipulacao.validadeFormulaPorLote = validadeFormulaPorLote;
    geralManipulacao.habilitaPCP = habilitaPCP;
    geralManipulacao.pesagemAutomatizadaDosItens = pesagemAutomatizadaDosItens;
    geralManipulacao.habilitaQuarentena = habilitaQuarentena;
    geralManipulacao.deduzirQuantidadeLoteAnteriorDaDinamizacao = deduzirQuantidadeLoteAnteriorDaDinamizacao;
    geralManipulacao.buscaultimoFatorLoteOrcamentoUIUFCUTR = buscaultimoFatorLoteOrcamentoUIUFCUTR;
    geralManipulacao.manterValorDaPreVenda = manterValorDaPreVenda;
    geralManipulacao.exibirQSPAutomático = exibirQSPAutomático;
    geralManipulacao.formatacaoBSPO = formatacaoBSPO;
    geralManipulacao.metodoDeAnalise = metodoDeAnalise;
    geralManipulacao.alterarPesoDoProduto = alterarPesoDoProduto;
    geralManipulacao.amostragemAmostras = amostragemAmostras;
    geralManipulacao.amostragemPercentual = amostragemPercentual;
    geralManipulacao.amostragemLimiteMenorIgualPercentual = amostragemLimiteMenorIgualPercentual;
    geralManipulacao.amostragemLimiteMaiorIgualPercentual = amostragemLimiteMaiorIgualPercentual;
    geralManipulacao.amostragemQuantidadeG = amostragemQuantidadeG;
    geralManipulacao.amostragemDesPadraoRelat = amostragemDesPadraoRelat;
    geralManipulacao.amostragemQtdTeoricaMin = amostragemQtdTeoricaMin;
    geralManipulacao.amostragemQtdTeoricaMax = amostragemQtdTeoricaMax;
    geralManipulacao.conclusaoOrdemManipulacao = conclusaoOrdemManipulacao;
    return (
        <>
            <div className="row mt-3">
                <div className="col-3">
                    <CustomInput
                        label="Previsão de Entrega (Horas)"
                        required={false}
                        type="text"
                        maxLength={50}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPrevisaoEntregaHoras(e.target.value)
                        }
                    />
                </div>

                <div className="col-3">
                    <CustomInput
                        label="Formulas Hora"
                        required={false}
                        type="text"
                        maxLength={50}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setFormulasHoras(e.target.value)
                        }
                        value={formulasHoras}
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="M. Segurança Padrão (%)"
                        required={false}
                        type="text"
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="Tipo CR Padrão"
                        required={false}
                        type="text"
                        maxLength={50}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setTipoCRPadrao(e.target.value)
                        }
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="Excipiente Padrão"
                        required={false}
                        type="text"
                        maxLength={50}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setExcipientePadrao(e.target.value)
                        }
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="Farmacopéia Padrão"
                        required={false}
                        type="text"
                        maxLength={50}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setFarmacopeiaPadrao(e.target.value)
                        }
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="Veículo Padrão"
                        required={false}
                        type="text"
                        maxLength={50}
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="Validade Homeopatia (Dias)"
                        required={false}
                        type="text"
                        maxLength={50}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setValidadeHomeopatia(e.target.value)
                        }
                    />
                </div>
                <div className="row mt-5">
                    <div className="col-4">
                        <div className="row mb-4 mt-3">
                            <div className="col-12">
                                <div className="col-12">
                                    <CheckboxCustom options={[
                                        "Passagem Monitorada"
                                    ]}
                                        value={pesagemMonitorada}
                                        onClickOptions={(checked) => setPesagemMonitorada(checked)}
                                    />
                                    <CheckboxCustom options={[
                                        "Avisar Estoque Mínimo na Venda"
                                    ]}
                                        value={avisarEstoqueMinimoDeVenda}
                                        onClickOptions={(checked) => setAvisarEstoqueMinimoDeVenda(checked)}
                                    />
                                    <CheckboxCustom options={[
                                        "Entrega Registro Receituário Geral",
                                    ]}
                                        value={entregarRegistroReceituarioGeral}
                                        onClickOptions={(checked) => setEntregarRegistroReceituarioGeral(checked)}
                                    />
                                    <CheckboxCustom options={[
                                        "Validade Fórmula por Lote"
                                    ]}
                                        value={validadeFormulaPorLote}
                                        onClickOptions={(checked) => setValidadeFormulaPorLote(checked)}
                                    />
                                    <CheckboxCustom options={[
                                        "Habilita PCP"
                                    ]}
                                        value={habilitaPCP}
                                        onClickOptions={(checked) => setHabilitaPCP(checked)}
                                    />
                                </div>
                                <CheckboxCustom options={[
                                    "Pesagem Automatizada dos Itens",
                                ]}
                                    value={pesagemAutomatizadaDosItens}
                                    onClickOptions={(checked) => setPesagemAutomatizadaDosItens(checked)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="col-12">
                            <FieldsetCustom legend="Conclusão Ordem Manipulação Pesagem" numberCols={12}>
                                <div className="col-12 mt-3">
                                    <RadioCustom
                                        options={[
                                            "Concluir sempre",
                                            "Perguntar se deseja concluir",
                                            "Não concluir"
                                        ]}
                                        name="conclusaoOrdemManipulacao"
                                        onClickOptions={(value, label) => setConclusaoOrdemManipulacao(value)}
                                        value={conclusaoOrdemManipulacao}
                                    />
                                </div>
                            </FieldsetCustom>
                        </div>
                        <div className="col-12">
                            <CheckboxCustom options={[
                                "Habilita quarentena"
                            ]}
                                value={habilitaQuarentena}
                                onClickOptions={(checked) => setHabilitaQuarentena(checked)}
                            />
                            <CheckboxCustom options={[
                                "Farmácia veterinária"
                            ]}
                            />
                            <CheckboxCustom options={[
                                "Deduzir quantidade do Lote anterior na dinamização"
                            ]}
                                value={deduzirQuantidadeLoteAnteriorDaDinamizacao}
                                onClickOptions={(checked) => setDeduzirQuantidadeLoteAnteriorDaDinamizacao(checked)}
                            />
                            <CheckboxCustom options={[
                                "Buscar último fator lote orçamento (UI/UFC/UTR)",
                            ]}
                                value={buscaultimoFatorLoteOrcamentoUIUFCUTR}
                                onClickOptions={(checked) => setBuscaultimoFatorLoteOrcamentoUIUFCUTR(checked)}
                            />
                            <CheckboxCustom options={[
                                "Manter valor da pré-venda"
                            ]}
                                value={manterValorDaPreVenda}
                                onClickOptions={(checked) => setManterValorDaPreVenda(checked)}
                            />
                            <CheckboxCustom options={[
                                "Exibir QSP automático"
                            ]}
                                value={exibirQSPAutomático}
                                onClickOptions={(checked) => setExibirQSPAutomático(checked)}
                            />

                        </div>
                    </div>
                    <div className="col-4">
                        <FieldsetCustom legend="Formatação BSPO (Casas decimais)" numberCols={12}>
                            <div className="col-12 mt-3">
                                <RadioCustom
                                    options={[
                                        "3 Casas",
                                        "4 Casas"
                                    ]}
                                    name="formatacao"
                                    onClickOptions={(value, label) => setFormatacaoBSPO(value)}
                                    value={formatacaoBSPO}
                                />
                            </div>
                        </FieldsetCustom>
                        <div className="col-4">
                            <CustomInput
                                label="ML/Gotas"
                                required={false}
                                type="text"
                                maxLength={50}
                                value={mlGotas}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setMlGotas(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>

            </div>

            <div className="form-group row mt-4">
                <FieldsetCustom legend="Análise Produto" numberCols={12}>
                    <div className="row mt-4">
                        <FieldsetCustom legend="Método de Análise" numberCols={4}>
                            <div className="col-12 mt-4">
                                <RadioCustom
                                    options={[
                                        "USP",
                                        "Formulário Nacional"
                                    ]}
                                    name="metodoAnalise"
                                    onClickOptions={(value, label) => setMetodoDeAnalise(value)}
                                    value={metodoDeAnalise}
                                />
                            </div>
                        </FieldsetCustom>
                        <FieldsetCustom legend="Amostragem" numberCols={4}>
                            <div className="col-12 mt-3">
                                <div className="row">
                                    <div className="col-6">
                                        <CustomInput
                                            label="Amostras"
                                            required={false}
                                            type="text"
                                            maxLength={50}
                                            value={amostragemAmostras}
                                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                setAmostragemAmostras(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-6">
                                        <CustomInput
                                            label="(%)"
                                            required={false}
                                            type="text"
                                            maxLength={50}
                                            value={amostragemPercentual}
                                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                setAmostragemPercentual(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </FieldsetCustom>
                        <FieldsetCustom legend="Alterar Peso do Produto" numberCols={4}>
                            <div className="col-12 mt-4">
                                <RadioCustom
                                    options={[
                                        "Permitir",
                                        "Não permitir",
                                        "Permitir com senha"
                                    ]}
                                    name="alterarPesoProduto"
                                    onClickOptions={(value, label) => setAlterarPesoDoProduto(value)}
                                    value={alterarPesoDoProduto}
                                />
                            </div>
                        </FieldsetCustom>
                    </div>
                </FieldsetCustom>
                <div className="col-12 mb-2">
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Limite (<=)+/- (%)"
                                required={false}
                                type="text"
                                maxLength={50}
                                value={amostragemLimiteMenorIgualPercentual}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setAmostragemLimiteMenorIgualPercentual(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Limite (>)+/- (%)"
                                required={false}
                                type="text"
                                maxLength={50}
                                value={amostragemLimiteMaiorIgualPercentual}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setAmostragemLimiteMaiorIgualPercentual(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Quantidade (g)"
                                required={false}
                                type="text"
                                maxLength={50}
                                value={amostragemQuantidadeG}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setAmostragemQuantidadeG(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Des. Padrão Relat. (%)"
                                required={false}
                                type="text"
                                maxLength={50}
                                value={amostragemDesPadraoRelat}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setAmostragemDesPadraoRelat(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Qtd teórica mínima (%)"
                                required={false}
                                type="text"
                                maxLength={50}
                                value={amostragemQtdTeoricaMin}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setAmostragemQtdTeoricaMin(e.target.value)
                                }
                            />
                        </div>

                        <div className="col-2">
                            <CustomInput
                                label="Qtd teórica max (%)"
                                required={false}
                                type="text"
                                maxLength={50}
                                value={amostragemQtdTeoricaMax}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setAmostragemQtdTeoricaMax(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
