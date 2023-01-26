import { useState } from "react";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";

export let drogariaAcabado = {
    id: 0,
    custoReferencia: 0,
    estoqueNegativo: 0,
    alteracaoValorVenda: 0,
    estoqueMinimoAvisarEstoqueMinimoNaVenda: false
  }

export const TabAcabado = () => {

    const [custoReferencia,setCustoReferencia] = useState(0);
    const [estoqueNegativo,setEstoqueNegativo] = useState(0);
    const [alteracaoValorVenda,setAlteracaoValorVenda] = useState(0);
    const [estoqueMinimoAvisarEstoqueMinimoNaVenda,setEstoqueMinimoAvisarEstoqueMinimoNaVenda] = useState(false);

    drogariaAcabado.custoReferencia = custoReferencia;
    drogariaAcabado.estoqueNegativo = estoqueNegativo;
    drogariaAcabado.alteracaoValorVenda = alteracaoValorVenda;
    drogariaAcabado.estoqueMinimoAvisarEstoqueMinimoNaVenda = estoqueMinimoAvisarEstoqueMinimoNaVenda;

    return (
        <>
            <div className="row mt-4">
                <FieldsetCustom legend="Custo referência" numberCols={2}>
                    <div className="mt-3">
                        <CheckboxCustom options={[
                            "Atualizar sempre",
                            "Solicitar confirmação",
                            "Não atualizar"
                        ]} />
                    </div>
                </FieldsetCustom>
                <FieldsetCustom legend="Estoque negativo" numberCols={2}>
                    <div className="mt-3">
                        <CheckboxCustom options={[
                            "Permitir",
                            "Não permitir",
                            "Permitir com senha"
                        ]} />
                    </div>
                </FieldsetCustom>
                <FieldsetCustom legend="Alteração valor venda" numberCols={2}>
                    <div className="mt-3">
                        <CheckboxCustom options={[
                            "Permitir",
                            "Não permitir",
                            "Permitir com senha"
                        ]} />
                    </div>
                </FieldsetCustom>
                <div className="col-3 mt-3">
                    <CheckboxCustom options={[
                        "Avisar estoque mínimo na venda"
                    ]} />
                </div>
            </div>
        </>
    );
};
