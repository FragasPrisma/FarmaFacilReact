import { CustomInput } from "../../Components/Inputs/CustomInput";

export const TabImpressaoManipulacao = () => {
    return (
        <>
            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="Cheks"
                        required={false}
                        type="text"
                    />
                </div>
            </div>
        </>
    );
};
