import { ChangeEvent } from "react";
import { InputCustomized, LabelRequired, ContainerInput } from "./styles";

interface IInput {
    label: string;
    placeholder: string;
    type: string;
    required: boolean;
    value?: string
    OnChange: (e: ChangeEvent<HTMLInputElement>) => void
 }

export function CustomInput({ label, placeholder, type, required, value, OnChange }: IInput) {
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
                    value={value}
                    onChange={OnChange}
                />
            </div>
        </ContainerInput>
    );
}