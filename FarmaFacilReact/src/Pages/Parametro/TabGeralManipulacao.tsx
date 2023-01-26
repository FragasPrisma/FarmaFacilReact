import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";

export const TabGeralManipulacao = () => {
    return (
        <>
            <div className="row mt-3">
                <div className="col-3">
                    <CustomInput
                        label="Previsão de Entrega (Horas)"
                        required={false}
                        type="text"
                    />
                </div>

                <div className="col-3">
                    <CustomInput
                        label="Formulas Hora"
                        required={false}
                        type="text"
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
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="Excipiente Padrão"
                        required={false}
                        type="text"
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="Farmacopéia Padrão"
                        required={false}
                        type="text"
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="Veículo Padrão"
                        required={false}
                        type="text"
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="Validade Homeopatia (Dias)"
                        required={false}
                        type="text"
                    />
                </div>
                <div className="row mt-5">
                    <div className="col-4">
                        <div className="row mb-4 mt-3">
                            <div className="col-12">
                                <div className="col-12">
                                    <CheckboxCustom options={[
                                        "Passagem Monitorada",
                                        "Avisar Estoque Mínimo na Venda",
                                        "Entrega Registro Receituário Geral",
                                        "Validade Fórmula por Lote",
                                        "Habilita PCP"
                                    ]} />
                                </div>
                                <CheckboxCustom options={[
                                    "Pesagem Automatizada dos Itens",
                                ]} />
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="col-12">
                            <FieldsetCustom legend="Conclusão Ordem Manipulação Pesagem" numberCols={12}>
                                <div className="col-12 mt-3">

                                    <CheckboxCustom options={[
                                        "Concluir sempre",
                                        "Perguntar se deseja concluir",
                                        "Não concluir"
                                    ]} />
                                </div>
                            </FieldsetCustom>
                        </div>
                        <div className="col-12">
                            <CheckboxCustom options={[
                                "Habilita quarentena",
                                "Farmácia veterinária",
                                "Deduzir quantidade do Lote anterior na dinamização",
                                "Buscar último fator lote orçamento (UI/UFC/UTR)",
                                "Manter valor da pré-venda",
                                "Exibir QSP automático"
                            ]} />
                        </div>
                    </div>
                    <div className="col-4">
                        <FieldsetCustom legend="Formatação BSPO (Casas decimais)" numberCols={12}>
                            <div className="col-12 mt-3">

                                <CheckboxCustom options={[
                                    "3 Casas",
                                    "4 Casas"
                                ]} />
                            </div>
                        </FieldsetCustom>
                    </div>
                </div>

            </div>

            <div className="form-group row mt-4">
                <FieldsetCustom legend="Análise Produto" numberCols={12}>
                    <div className="row mt-4">
                        <FieldsetCustom legend="Método de Análise" numberCols={4}>
                            <div className="col-12 mt-4">

                                <CheckboxCustom options={[
                                    "USP",
                                    "Formulário nacional"
                                ]} />
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
                                        />
                                    </div>
                                    <div className="col-6">
                                        <CustomInput
                                            label="(%)"
                                            required={false}
                                            type="text"
                                        />
                                    </div>
                                </div>
                            </div>
                        </FieldsetCustom>
                        <FieldsetCustom legend="Alterar Peso do Produto" numberCols={4}>
                            <div className="col-12 mt-4">

                                <CheckboxCustom options={[
                                    "Permitir",
                                    "Não permitir",
                                    "Permitir com senha"
                                ]} />
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
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Limite (>)+/- (%)"
                                required={false}
                                type="text"
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Quantidade (g)"
                                required={false}
                                type="text"
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Des. Padrão Relat. (%)"
                                required={false}
                                type="text"
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Qtd teórica mínima (%)"
                                required={false}
                                type="text"
                            />
                        </div>

                        <div className="col-2">
                            <CustomInput
                                label="Qtd teórica max (%)"
                                required={false}
                                type="text"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
