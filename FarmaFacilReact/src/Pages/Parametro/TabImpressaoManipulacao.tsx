import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";

export const TabImpressaoManipulacao = () => {
    return (
        <>
            <div className="form-group row mt-4">
                <FieldsetCustom legend="Impressão ordem manipulação" numberCols={3}>
                    <div className="mt-4">
                        <FieldsetCustom legend="Impressora" numberCols={10}>
                            <div className="mt-3">
                                <CheckboxCustom options={[
                                    "Matricial",
                                    "Jato de tinta/Laser",
                                    "Laser(Especial)",
                                    "60 Colunas",
                                    "40 Colunas",
                                    "Relatório gerencial ECF"
                                ]} />
                            </div>
                        </FieldsetCustom>
                    </div>
                    <div className="col-10">
                        <CheckboxCustom options={[
                            "Imprimir OM na venda",
                            "Imprimir farmacêutico na OM",
                            "Imprimir campos análise produto",
                            "Imprimir ensaios forma farmacêutica",
                            "Alinhar ensaios",
                            "Dupla pesagem",
                            "Ignorar sinônimo na OM"
                        ]} />
                        <CustomInput
                            label="Número de vias"
                            type="text"
                            required={false}
                        />
                    </div>
                </FieldsetCustom>

                <FieldsetCustom legend="Impressão ficha análise" numberCols={3}>
                    <div className="mt-4">
                        <FieldsetCustom legend="Impressora" numberCols={10}>
                            <div className="mt-3">
                                <CheckboxCustom options={[
                                    "Matricial",
                                    "Jato de tinta/Laser",
                                    "60 Colunas",
                                    "40 Colunas"
                                ]} />
                            </div>
                            <CustomInput
                                label="Número de vias"
                                type="text"
                                required={false}
                            />
                        </FieldsetCustom>
                    </div>
                </FieldsetCustom>

                <FieldsetCustom legend="Impressão código de barra PCP" numberCols={3}>
                    <div className="mt-3">
                        <CheckboxCustom options={[
                            "Padrão",
                            "Reduzido"
                        ]} />
                    </div>
                    <div className="mt-3">
                        <CheckboxCustom options={[
                            "Exibir veículo no dinamizado",
                            "Destaca número de venda"
                        ]} />
                    </div>
                </FieldsetCustom>
            </div>
        </>
    );
};
