import { CustomInput } from "../../Components/Inputs/CustomInput";

export const TabGeralManipulacao = () => {
    return (
        <>
            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="Caminho salvar NFe"
                        required={false}
                        type="string"
                    />
                </div>
            </div>
        </>
    );
};
