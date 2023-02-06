import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { FieldsetCustom } from "../../../Components/Others/FieldsetCustom";
import { IFormaFarmaceutica } from "../IFormaFarmaceutica";
import { IFormaFarmaceuticaEnsaios } from "../IFormaFarmaceuticaEnsaios"
import { Container } from "../styles";

export let FormaFarmaceuticaEnsaiosModel = [] as IFormaFarmaceuticaEnsaios[]

interface IData {
    model: IFormaFarmaceutica;
}

export function FormaFarmaceuticaDetailsEnsaios({ model }: IData) {

    return (
        <>
            <Container className="mt-4">
                <FieldsetCustom legend="Ensaios" numberCols={12}>
                    {model.formaFarmaceuticaEnsaios &&

                        model.formaFarmaceuticaEnsaios.map((item, index) => (
                            <div key={index} className="row mb-3">
                                <div className="col-5">
                                    <CustomInput
                                        label="Descrição"
                                        type="text"
                                        value={item.descricao}
                                        required={true}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                        ))

                    }
                </FieldsetCustom>

            </Container>
        </>
    )
}