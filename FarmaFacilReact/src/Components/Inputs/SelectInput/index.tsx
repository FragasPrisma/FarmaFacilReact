import React, { useState, useEffect } from 'react';
import { ContainerInput, CustomSelectContainer, LabelRequired } from './styles';

interface Props {
    options: string[];
    label: string;
    required?: boolean;
    erro?: string;
    Select: (string: any) => void
    valueEdit?: string | number;
    selectString?: boolean
}

export function SelectInput({ options, label, required, Select, erro, valueEdit, selectString = true }: Props) {
    const [selectedOption, setSelectedOption] = useState<string | number>();

    useEffect(() => {
        if (valueEdit) {
            setSelectedOption(valueEdit)
        };
    });

    function onSelect(selected: string | number) {
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
                    {selectString ?
                        options.map((option) => (
                            <option key={option} value={option} >
                                {option}
                            </option>
                        )) :
                        options.map((option, index) => (
                            <option key={option} value={index} >
                                {option}
                            </option>
                        ))
                    }
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