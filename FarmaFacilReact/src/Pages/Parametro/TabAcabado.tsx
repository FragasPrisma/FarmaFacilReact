import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";

export const TabAcabado = () => {
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
