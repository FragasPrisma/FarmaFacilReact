import { InputCustomized, LabelRequired, ContainerInput } from "./styles";

interface Input {
    label: string;
    placeholder: string;
    type: string;
    required: boolean;
}

export function CustomInput({ label, placeholder, type, required }: Input) {
    return (
        <ContainerInput >
            <div className="containerAbc">
                <div className="container_sup">
                    <label className="label_text">{label}</label>
                    {required &&
                        <LabelRequired>*</LabelRequired>
                    }
                </div>
                <InputCustomized
                    type={type}
                    placeholder={placeholder}
                />
            </div>
        </ContainerInput>
    );
}