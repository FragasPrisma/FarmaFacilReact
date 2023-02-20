import { useState } from "react"
import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { FieldsetCustom } from "../../../Components/Others/FieldsetCustom";
import { IFormaFarmaceuticaEnsaios } from "../../../Interfaces/FormaFarmaceutica/IFormaFarmaceuticaEnsaios"
import { Container } from "../styles";

export let FormaFarmaceuticaEnsaiosModel = [] as IFormaFarmaceuticaEnsaios[]

export function FormaFarmaceuticaCreateEnsaios() {

    const [formasFarmaceuticasEnsaios, setFormasFarmaceuticasEnsaios] = useState([] as IFormaFarmaceuticaEnsaios[])

    FormaFarmaceuticaEnsaiosModel = formasFarmaceuticasEnsaios

    function AdicionarEnsaio() {
        let arrayFilter = formasFarmaceuticasEnsaios.filter(x => x.descricao.length == 0)

        if (arrayFilter.length == 0) {
            formasFarmaceuticasEnsaios.push({ id: 0, descricao: "", formaFarmaceuticaId: 0 })
            setFormasFarmaceuticasEnsaios([...formasFarmaceuticasEnsaios])
        }
    }

    function ExcluirEnsaio(index: number) {
        formasFarmaceuticasEnsaios.splice(index, 1)
        setFormasFarmaceuticasEnsaios([...formasFarmaceuticasEnsaios])
    }

    function AdicionarDescricao(value: string, index: number) {
        formasFarmaceuticasEnsaios[index].descricao = value.trim();
        setFormasFarmaceuticasEnsaios([...formasFarmaceuticasEnsaios])
    }

    return (
        <>
            <Container>
                <div className="row mt-4">
                    <FieldsetCustom legend="Adicione os Ensaios" numberCols={8}>
                        <button
                            className="btn btn-success mt-4"
                            onClick={() => AdicionarEnsaio()}
                        >Clique Aqui !
                        </button>
                    </FieldsetCustom>
                </div>

                {formasFarmaceuticasEnsaios.map((item, index) => (
                    <div key={index} className="row mb-3">
                        <div className="col-5">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                value={item.descricao}
                                OnChange={(e) => AdicionarDescricao(e.target.value, index)}
                                required={true}
                                maxLength={50}
                            />
                        </div>
                        <div className="col-3">
                            <button className="btn btn-danger mt-3" onClick={() => ExcluirEnsaio(index)}>Excluir</button>
                        </div>
                    </div>
                ))
                }

            </Container>
        </>
    )
}