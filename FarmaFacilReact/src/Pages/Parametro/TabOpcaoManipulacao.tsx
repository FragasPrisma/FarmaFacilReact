import { CustomInput } from "../../Components/Inputs/CustomInput";

export const TabOpcaoManipulacao = () => {
    return (
        <>
            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="Previsão de Entrega"
                        required={false}
                        type="text"
                    />
                </div>
            </div>
        </>
    );
};
