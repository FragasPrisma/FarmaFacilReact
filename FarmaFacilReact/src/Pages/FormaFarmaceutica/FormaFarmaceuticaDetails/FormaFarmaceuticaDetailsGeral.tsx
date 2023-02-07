import { Container } from "../styles";
import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../../Components/Others/CheckboxCustom";
import { RadioCustom } from "../../../Components/Inputs/RadioCustom";
import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown";
import { IFormaFarmaceutica } from "../IFormaFarmaceutica";


interface IData {
    model: IFormaFarmaceutica;
    nomeFuncionario:string
}

export function FormaFarmaceuticaDetailsGeral({ model , nomeFuncionario}: IData) {

    return (
        <>
            <Container>
                <div className="row">
                    <div className="col-7">
                        <CustomInput
                            label="Descrição"
                            type="text"
                            value={model.descricao}
                            readonly={true}
                            required={true}
                        />
                    </div>
                    <div className="col-3 mt-1">
                        <CheckboxCustom
                            options={["Inativar Forma"]}
                            check={model.inativo}
                            readOnly={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <RadioCustom
                            name="tipo"
                            options={["Cápsula",
                                "Volume",
                                "Homeopatia",
                                "Floral",
                                "Unitário",
                                "Volume X Qtd (%)",
                                "Volume X Qtd (mg)",
                                "Papel",
                                "Implante",
                                "Comprimidos"]}
                            titleComponet="Tipo"
                            value={model.tipo}
                            readonly={true}
                        />
                    </div>
                    <div className="col-5 mt-4">
                        <CheckboxCustom
                            options={["Selecionar quantidade sugerida"]}
                            check={model.selecionaQuantidadeSugerida}
                            readOnly={true}
                        />
                        {model.tipo > 4 && model.tipo < 7 &&
                            < CheckboxCustom
                                options={["Multiplicar composição"]}
                                check={model.multiplicaComposicao}
                                readOnly={true}
                            />
                        }
                        {model.tipo == 2 &&
                            <div className="row">

                                <div className="col-6">
                                    <CheckboxCustom
                                        options={["Homeopatia líquida"]}
                                        check={model.homeopatiaLiquida}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="col-6">
                                    <CheckboxCustom
                                        options={["Não deduzir do Veículo"]}
                                        check={model.deduzirQuantidadeVeiculo}
                                        readOnly={true}
                                    />
                                </div>

                            </div>
                        }
                        {model.tipo > 4 && model.tipo < 7 &&
                            <RadioCustom
                                name="multiplicarComposicao"
                                options={["Volume unitário",
                                    "Volume Total"]}
                                titleComponet="Cálculo embalagem"
                                value={model.calculoEmbalagemForma ? model.calculoEmbalagemForma : 0}
                                readonly={true}
                            />
                        }
                        <CheckboxCustom
                            options={["Converte volume embalagem"]}
                            check={model.converteVolumeEmbalagem}
                            readOnly={true}
                        />
                        {model.tipo == 3 &&
                            <CheckboxCustom
                                options={["Imprimir unidade no rótulo"]}
                                check={model.imprimirUnidadeMedidaNoRotulo}
                                readOnly={true}
                            />
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 mt-4">
                        <CustomInput
                            label="Uso"
                            type="text"
                            value={model.uso}
                            readonly={true}
                        />
                    </div>
                    <div className="col-3">
                        <RadioCustom
                            name="tipoUso"
                            options={["Sistêmico",
                                "Tópico"]}
                            titleComponet="Tipo de Uso"
                            value={model.tipoUso}
                            readonly={true}
                        />
                    </div>
                    <div className="col-4 mt-4">
                        <CustomInput
                            label="Manipulador"
                            type="text"
                            value={nomeFuncionario}
                            readonly={true}
                        />
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Fórmulas/Hora"
                            type="number"
                            value={model.quantidadeFormulasHora}
                            readonly={true}
                        />
                    </div>

                </div>
                <div className="row">
                    <div className="col-3">
                        <CustomInput
                            label="P.O.P"
                            type="text"
                            value={model.popForma}
                            readonly={true}
                        />
                    </div>
                    <div className="col-3 mt-1">
                        <CheckboxCustom
                            options={["Imprimir campos análise produto"]}
                            check={model.imprimirCamposAnalise}
                            readOnly={true}
                        />
                        {model.tipo > 4 && model.tipo < 7 &&
                            <CheckboxCustom
                                options={["Selecionar volume automático"]}
                                check={model.selecionarVolumeAutomatico}
                                readOnly={true}
                            />
                        }
                    </div>

                    {model.tipo != 2 && model.tipo != 3 && model.tipo != 4 && model.tipo != 7 &&

                        <>
                            <div className="col-4">
                                <CustomInput
                                    label="Descrição Rótulo"
                                    type="text"
                                    value={model.descricaoRotulo}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-2">
                                <CustomInput
                                    label="QSP Mínimo (%)"
                                    type="number"
                                    value={model.quantidadeQspMinimo}
                                    readonly={true}
                                />
                            </div>
                        </>

                    }
                </div>
                <div className="row">
                    <div className="col-3">
                        <CustomInput
                            label="Validade (dias)"
                            type="number"
                            value={model.validade}
                            readonly={true}
                        />
                    </div>
                    {model.tipo != 2 && model.tipo != 3 && model.tipo != 4 && model.tipo != 7 &&
                        <>
                            <div className="col-3 mt-2">
                                <CheckboxCustom
                                    options={["Aplica fator perda QSP"]}
                                    check={model.ativaFatorPerdaQsp}
                                    readOnly={true}
                                />
                            </div>
                            <div className="col-4">
                                <CustomInput
                                    label="Fator Perda"
                                    type="number"
                                    value={model.fatorPerdaProduto}
                                    readonly={true}
                                />
                            </div>
                        </>
                    }
                    <div className="col-2">
                        <CustomInput
                            label="ML / Gotas"
                            type="number"
                            value={model.mlGotas}
                            readonly={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 mt-1 mb-2">
                        <CheckboxCustom
                            options={["Pesagem Monitorada Forma"]}
                            check={model.ativaPesagemMonitorada}
                            readOnly={true}
                        />
                        <CheckboxCustom
                            options={["Calcular Densidade"]}
                            check={model.calcularDensidade}
                            readOnly={true}
                        />
                    </div>
                    <div className="col-4">
                        {model.tipo != 0 && model.tipo != 1 && model.tipo != 5 && model.tipo != 6 && model.tipo != 9 && model.tipo != 8 &&
                            <CustomDropDown
                                data={[]}
                                filter="nome"
                                label="Veículo"
                                title="Veículo"
                                Select={(idManipulador) => 1 + idManipulador} //Ajustar com o cadastro de produto
                            />
                        }
                    </div>

                </div>
            </Container>
        </>
    )
}