import { Container } from "../styles";
import { IFormaFarmaceuticaValores } from "../IFormaFarmaceuticaValores";
import { IFormaFarmaceuticaMargens } from "../IFormaFarmaceuticaMargens";
import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { FieldsetCustom } from "../../../Components/Others/FieldsetCustom";
import { IFormaFarmaceutica } from "../IFormaFarmaceutica";

export let FormaFarmaceuticaValoresModel: IFormaFarmaceuticaValores = {
    formaFarmaceuticaMargens: [] as IFormaFarmaceuticaMargens[],
    custoAdicional: 0,
    valorMinimo: 0,
    ncmId: null
}

interface IData {
    model: IFormaFarmaceutica;
    nomeNcm: string
}

export function FormaFarmaceuticaDetailsValores({ model, nomeNcm }: IData) {

    return (
        <>
            <Container>
                <div className="row mb-4">
                    <div className="col-2">
                        <CustomInput
                            label="Custo Adicional"
                            type="number"
                            value={model.custoAdicional}
                            readonly={true}
                        />
                    </div>
                    <div className="col-2">
                        <CustomInput
                            label="Valor mínimo"
                            type="number"
                            value={model.valorMinimo}
                            readonly={true}
                        />
                    </div>
                    <div className="col-4">
                        <CustomInput
                            label="NCM"
                            type="text"
                            value={nomeNcm}
                            readonly={true}
                        />
                    </div>
                </div>
                <FieldsetCustom legend="Margem Valor Forma" numberCols={8}>
                    {model.formaFarmaceuticaMargens &&
                        model.formaFarmaceuticaMargens.map((item, index) => (
                            <>
                                <div key={index} className="row mt-2">
                                    <div className="col-3">
                                        <CustomInput
                                            label="Valor Inicial"
                                            type="number"
                                            value={item.valorInicial}
                                            readonly={true}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <CustomInput
                                            label="Valor Final"
                                            type="number"
                                            value={item.valorFinal}
                                            readonly={true}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <CustomInput
                                            label="Margem"
                                            type="number"
                                            value={item.margem}
                                            readonly={true}
                                        />
                                    </div>
                                </div>
                            </>
                        ))}

                </FieldsetCustom>
            </Container>
        </>
    )

}