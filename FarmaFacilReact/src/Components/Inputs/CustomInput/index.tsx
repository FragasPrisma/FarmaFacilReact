import { Question } from "phosphor-react";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import { InputCustomized, LabelRequired, ContainerInput } from "./styles";
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

interface IInput {
    label: string;
    step?: string;
    placeholder?: string;
    type: string;
    name?: string;
    required?: boolean;
    readonly?: boolean;
    value?: any;
    maxLength?: number | undefined;
    erro?: string;
    index?: number;
    erros?: { erro: Boolean, index: number, erroNome: string };
    OnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    focusParam?: boolean;
    textAlign?: boolean;
    color?: string;
}

export function CustomInput({ label, placeholder, name, readonly, type, required, value, maxLength, erro, OnChange, step, erros, index, focusParam = false, textAlign, color}: IInput) {

    //let aligRight = textAlign ? ".5rem" : "0"
    const [erroParameter, setErroParameter] = useState(erro)
    const [errosParameter, setErrosParameter] = useState(erros)
    const [focus] = useState(focusParam);

    useEffect(() => {
        setErroParameter(erro)
    }, [erro])

    useEffect(() => {
        setErrosParameter(erros)
    }, [erros])

    return (
        <ContainerInput >
            <div className="containerAbc" style={{ backgroundColor: readonly ? "var(--readonly)" : "#ececec"}}>
                <div className="container_sup" >
                    <label className="label_text">{label}</label>
                    {required &&
                        <LabelRequired>*</LabelRequired>
                    }
                </div>
                
                    <InputCustomized
                        type={type}
                        step={step}
                        placeholder={placeholder}
                        name={name}
                        value={value}
                        readOnly={readonly}
                        maxLength={maxLength}
                        onChange={OnChange}
                        autoFocus={focus}
                        style={{
                            textAlign: textAlign ? "end" : "left",
                            paddingRight: textAlign ? ".5rem" : "0",
                            backgroundColor: color
                        }}
                    />
                   
            
            </div>
            {errosParameter?.erro && errosParameter.index == index &&
                <div className="row divError">
                    <label className="text-danger-erro">{errosParameter?.erroNome}</label>
                </div>
            }
            {erroParameter &&
                <div className="row divError">
                    <label className="text-danger-erro">{erroParameter}</label>
                </div>
            }
        </ContainerInput>
    );
}