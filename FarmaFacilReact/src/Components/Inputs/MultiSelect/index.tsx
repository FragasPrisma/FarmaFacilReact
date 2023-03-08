import React, { useEffect, useMemo, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import makeAnimated from "react-select/animated";
import { ContainerSuperiorDropDown, CustomDropDownContainer } from './styles';

const animatedComponents = makeAnimated();

interface IProps {
    placeholder?: string;
    isMultiple?: boolean;
    data: any[];
    inicialData?: any[];
    title: string;
    label: string;
    readonly?: boolean;
    required?: boolean;
    error?: string;
    Select: (list: number[]) => void
}

export function MultiSelect(props: IProps) {
    const [itemsSelecionados, setItemsSelecionados] = useState<any>([]);

    useEffect(() => {
        if (props.inicialData && props.inicialData.length > 0) {
            setItemsSelecionados([...props.inicialData]);
        }
    }, [props.inicialData]);

    useEffect(() => {
        let listIds: number[] = [];

        itemsSelecionados.map((item: any) => {
            listIds.push(item?.value);
        })

        props.Select(listIds)
    }, [itemsSelecionados])

    return (
        <>
            <CustomDropDownContainer>
                <ContainerSuperiorDropDown>
                    <span className='label_text'>{props.label}</span>
                    {props.required &&
                        <span className='text-danger'>*</span>
                    }
                </ContainerSuperiorDropDown>
                {itemsSelecionados.length > 0 &&
                    <Select
                        components={animatedComponents}
                        placeholder={props.placeholder}
                        isMulti={props.isMultiple}
                        onChange={(item) => setItemsSelecionados(item)}
                        options={props.data}
                        defaultValue={
                            itemsSelecionados.map((item: any, index: number) => {
                                return itemsSelecionados[index];
                            })
                        }
                        isClearable={true}
                        isSearchable={true}
                        closeMenuOnSelect={false}
                        styles={{
                            control: () => ({
                                background: "#ECECEC",
                                border: "none",
                                borderBottom: "3px solid black",
                                borderRadius: "4px",
                                display: "flex",
                            }),
                            menu: () => ({
                                background: "#ECECEC",
                                borderRadius: "4px"
                            }),
                            menuList: () => ({
                                zIndex: "9999",
                                background: "#ECECEC",
                                borderBottomLeftRadius: "5px",
                                overflowY: "scroll",
                                overflowX: "hidden",
                                height: "250px",
                                width: "100%",
                                position: "absolute",
                            })
                        }}
                    />
                }
                {itemsSelecionados.length == 0 &&
                    <Select
                        components={animatedComponents}
                        placeholder={props.placeholder}
                        isMulti={props.isMultiple}
                        onChange={(item) => setItemsSelecionados(item)}
                        options={props.data}
                        defaultValue={
                            itemsSelecionados.map((item: any, index: number) => {
                                return itemsSelecionados[index];
                            })
                        }
                        isClearable={true}
                        isSearchable={true}
                        closeMenuOnSelect={false}
                        styles={{
                            control: () => ({
                                background: "#ECECEC",
                                border: "none",
                                borderBottom: "3px solid black",
                                borderRadius: "4px",
                                display: "flex",
                            }),
                            menu: () => ({
                                background: "#ECECEC",
                                borderRadius: "4px"
                            }),
                            menuList: () => ({
                                zIndex: "9999",
                                background: "#ECECEC",
                                borderBottomLeftRadius: "5px",
                                overflowY: "scroll",
                                overflowX: "hidden",
                                height: "250px",
                                width: "100%",
                                position: "absolute",
                            })
                        }}
                    />
                }
                {props.error && <p className='error'>{props.error}</p>}
            </CustomDropDownContainer>
        </>
    );
}