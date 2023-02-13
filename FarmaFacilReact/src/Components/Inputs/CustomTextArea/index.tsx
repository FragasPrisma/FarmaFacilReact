import { ChangeEvent } from "react";
import { InputCustomized, LabelRequired, ContainerInput } from "./styles";

interface IInput {
    label: string;
    placeholder?: string;
    name?: string;
    required?: boolean;
    readonly?: boolean;
    value?: any;
    maxLength?: number|undefined;
    erro?:string;
    cols:number;
    rows:number
    OnChange?: (e: any) => void
 }

export function CustomTextArea({ label, placeholder, name, readonly, required, value,maxLength,erro,cols,rows,OnChange }: IInput) {
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
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    readOnly={readonly}
                    maxLength={maxLength}
                    cols={cols}
                    rows={rows}
                    onChange={OnChange}
                />
            </div>
            {erro &&
                <div className="row divError">
                    <label className="text-danger-erro">{erro}</label>
                </div>
            }
        </ContainerInput>
    );
}