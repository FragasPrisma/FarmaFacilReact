import { useState } from "react";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";

export let drogariaAcabado = {
    id: 0,
    custoReferencia: 0,
    estoqueNegativo: 0,
    alteracaoValorVenda: 0,
    estoqueMinimoAvisarEstoqueMinimoNaVenda: false
}

export const TabAcabado = () => {

    const [custoReferencia, setCustoReferencia] = useState(0);
    const [estoqueNegativo, setEstoqueNegativo] = useState(0);
    const [alteracaoValorVenda, setAlteracaoValorVenda] = useState(0);
    const [estoqueMinimoAvisarEstoqueMinimoNaVenda, setEstoqueMinimoAvisarEstoqueMinimoNaVenda] = useState(false);

    drogariaAcabado.custoReferencia = custoReferencia;
    drogariaAcabado.estoqueNegativo = estoqueNegativo;
    drogariaAcabado.alteracaoValorVenda = alteracaoValorVenda;
    drogariaAcabado.estoqueMinimoAvisarEstoqueMinimoNaVenda = estoqueMinimoAvisarEstoqueMinimoNaVenda;

    return (
        <>
            <div className="row mt-4">
                <FieldsetCustom legend="Custo referência" numberCols={3}>
                    <div className="mt-3 col-12">
                        <RadioCustom
                            options={[
                                "Atualizar sempre",
                                "Solicitar confirmação",
                                "Não atualizar"
                            ]}
                            name="custo"
                            onClickOptions={(value, label) => setCustoReferencia(value)}
                            value={custoReferencia}
                        />
                    </div>
                </FieldsetCustom>
                <FieldsetCustom legend="Estoque negativo" numberCols={3}>
                    <div className="mt-3 col-12">
                        <RadioCustom
                            options={[
                                "Permitir",
                                "Não permitir",
                                "Permitir com senha"
                            ]}
                            name="estoqueNegativo"
                            onClickOptions={(value, label) => setEstoqueNegativo(value)}
                            value={estoqueNegativo}
                        />
                    </div>
                </FieldsetCustom>
                <FieldsetCustom legend="Alteração valor venda" numberCols={3}>
                    <div className="mt-3 col-12">
                        <RadioCustom
                            options={[
                                "Permitir",
                                "Não permitir",
                                "Permitir com senha"
                            ]}
                            name="alteracaoVenda"
                            onClickOptions={(value, label) => setAlteracaoValorVenda(value)}
                            value={alteracaoValorVenda}
                        />
                    </div>
                </FieldsetCustom>
                <div className="col-3 mt-3">
                    <CheckboxCustom options={[
                        "Avisar estoque mínimo na venda"
                    ]}
                        check={estoqueMinimoAvisarEstoqueMinimoNaVenda}
                        onClickOptions={(e) => setEstoqueMinimoAvisarEstoqueMinimoNaVenda(e.target.checked)}
                    />
                </div>
            </div>
        </>
    );
};
