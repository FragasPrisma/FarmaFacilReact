import { ChangeEvent } from "react";
import { InputCustomized, LabelRequired, ContainerInput } from "./styles";

interface IInput {
    label: string;
    placeholder: string;
    type: string;
    required: boolean;
    name: string;
    value?: string;
    readonly?: boolean;
    OnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function CustomInput({ label, placeholder, type, required, name, value, readonly, OnChange}: IInput) {
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
                    name={name}
                    value={value}
                    readOnly={readonly}
                    onChange={OnChange}
                />
            </div>
        </ContainerInput>
    );
}