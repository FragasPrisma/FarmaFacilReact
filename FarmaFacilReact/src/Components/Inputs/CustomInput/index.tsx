import { ChangeEvent } from "react";
import { InputCustomized, LabelRequired, ContainerInput } from "./styles";

interface IInput {
    label: string;
    placeholder?: string;
    type: string;
    name?: string;
    required: boolean;
    readonly?: boolean;
    value?: any;
    maxLength?: number|undefined;
    erro?:string;
    OnChange?: (e: ChangeEvent<HTMLInputElement>) => void
 }

export function CustomInput({ label, placeholder, name, readonly, type, required, value,maxLength,erro,  OnChange }: IInput) {
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
                    maxLength={maxLength}
                    onChange={OnChange}
                />
            </div>
            {erro &&
                <div className="row divError">
                    <label className="text-danger">{erro}</label>
                </div>
            }
        </ContainerInput>
    );
}