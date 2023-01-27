import React, { useState, useEffect} from 'react';
import { ContainerInput, CustomSelectContainer, LabelRequired } from './styles';

interface Props {
    options: string[];
    label: string;
    required?: boolean;
    erro?: string;
    Select: (string: any) => void
    valueEdit?: string;
}

export function SelectInput({ options, label, required, Select, erro, valueEdit}: Props) {
    const [selectedOption, setSelectedOption] = useState<string>("");

    useEffect(() => {
        if (valueEdit) {
            setSelectedOption(valueEdit)
        };
    });

    function onSelect(selected: string) {
        setSelectedOption(selected)
        Select(selected);
    }

    return (
        <ContainerInput >
            <div className="containerAbc">
                <div className="container_sup">
                    <label className="label_text">{label}</label>
                    {required &&
                        <LabelRequired>*</LabelRequired>
                    }
                </div>
                
                <CustomSelectContainer value={selectedOption} onChange={e => onSelect(e.target.value)}>
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </CustomSelectContainer>
            </div>
            {erro &&
                <div className="row divError">
                    <label className="text-danger">{erro}</label>
                </div>
            }
        </ContainerInput>
    );
};
