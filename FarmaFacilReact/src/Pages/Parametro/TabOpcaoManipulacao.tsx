import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";

export const TabOpcaoManipulacao = () => {
    return (
        <>
            <div className="form-group row mt-4">
                <div className="col-4">
                    <FieldsetCustom legend="Bloqueios Venda" numberCols={12}>
                        <div className="mt-4">
                            <FieldsetCustom legend="Manipulação" numberCols={12}>
                                <div className="col-12 mt-3">
                                    <CheckboxCustom options={[
                                        "Bloquar vendas de fórmulas/fórmulas sem lote",
                                        "Bloquear excipientes sem lote",
                                        "Bloquear embalagens/cápsulas sem lote"
                                    ]} />
                                </div>
                            </FieldsetCustom>
                        </div>
                        <div className="mt-4">
                            <FieldsetCustom legend="Homeopatia" numberCols={12}>
                                <div className="col-12 mt-3">
                                    <CheckboxCustom options={[
                                        "Bloquar vendas de fórmulas/fórmulas sem lote",
                                        "Bloquear excipientes sem lote",
                                        "Bloquear embalagens sem lote"
                                    ]} />
                                </div>
                            </FieldsetCustom>
                        </div>
                    </FieldsetCustom>
                </div>
                <div className="col-8">
                    <div className="row">
                        <FieldsetCustom legend="Filtros (em dias)" numberCols={2}>
                            <div className="col-12 mt-3">
                                <CustomInput
                                    label="Filtros OP: 1"
                                    type="string"
                                    required={false}
                                />
                            </div>
                            <div className="col-12">
                                <CustomInput
                                    label="2"
                                    type="string"
                                    required={false}
                                />
                            </div>
                        </FieldsetCustom>
                        <FieldsetCustom legend="Estoque negativo" numberCols={2}>
                            <div className="col-12 mt-3">
                                <CheckboxCustom options={[
                                    "Permitir",
                                    "Não permitir",
                                    "Permitir com senha"
                                ]} />
                            </div>
                        </FieldsetCustom>
                        <FieldsetCustom legend="Dose máxima" numberCols={2}>
                            <div className="col-12 mt-3">
                                <CheckboxCustom options={[
                                    "Permitir",
                                    "Não permitir",
                                    "Permitir com senha"
                                ]} />
                            </div>
                        </FieldsetCustom>
                    </div>
                    <div className="row">
                        <FieldsetCustom legend="Número de registro de fórmulas" numberCols={6}>
                            <div className="col-12 mt-3">
                                <CheckboxCustom options={[
                                    "Ativar número de registros por CRM"
                                ]} />
                                <CustomInput
                                    label="Prescritor"
                                    type="string"
                                    required={false}
                                />
                                <CheckboxCustom options={[
                                    "Obrigar receita para uso tópico"
                                ]} />
                            </div>
                        </FieldsetCustom>
                    </div>
                </div>
            </div>

            <div className="form-group row mt-4">
                <FieldsetCustom legend="Precedência cálculo" numberCols={3}>
                    <div className="mt-3">
                        <CheckboxCustom options={[
                            "Acréscimo/Desconto",
                            "Desconto/Acréscimo"
                        ]} />
                    </div>
                </FieldsetCustom>
                <FieldsetCustom legend="Precedência cálculo Desconto" numberCols={3}>
                    <div className="mt-3">
                        <CheckboxCustom options={[
                            "Percentual/Valor",
                            "Valor/Percentual"
                        ]} />
                    </div>
                </FieldsetCustom>
                <FieldsetCustom legend="Repetição venda - Sugestão cápsula" numberCols={3}>
                    <div className="mt-3">
                        <CheckboxCustom options={[
                            "Manter cápsula anterior",
                            "Pedir confirmação se alterar tamanho",
                            "Manter sugestão do sistema"
                        ]} />
                    </div>
                </FieldsetCustom>
            </div>

            <div className="form-group row mt-4">
                <FieldsetCustom legend="Custo referência" numberCols={4}>
                    <div className="mt-4 row">
                        <FieldsetCustom legend="Nota Fiscal" numberCols={6}>
                            <div className="mt-3">
                                <CheckboxCustom options={[
                                    "Atualizar sempre",
                                    "Solicitar confirmação",
                                    "Não atualizar"
                                ]} />
                            </div>
                        </FieldsetCustom>
                        <FieldsetCustom legend="Fórmula padrão" numberCols={6}>
                            <div className="mt-3">
                                <CheckboxCustom options={[
                                    "Atualizar sempre",
                                    "Solicitar confirmação",
                                    "Não atualizar"
                                ]} />
                            </div>
                        </FieldsetCustom>
                    </div>
                </FieldsetCustom>
                <FieldsetCustom legend="Aviso duplicação de venda" numberCols={3}>
                    <div className="mt-3">
                        <CheckboxCustom options={[
                            "Não mostrar",
                            "Apenas avisar",
                            "Avisar e pedir senha",
                            "Bloquear venda"
                        ]} />
                    </div>
                </FieldsetCustom>
                <FieldsetCustom legend="Repetição venda - Quantidade cápsula" numberCols={3}>
                    <div className="mt-3">
                        <CheckboxCustom options={[
                            "Manter quantidade anterior",
                            "Recalcular quantidade"
                        ]} />
                    </div>
                </FieldsetCustom>
            </div>
        </>
    );
};
