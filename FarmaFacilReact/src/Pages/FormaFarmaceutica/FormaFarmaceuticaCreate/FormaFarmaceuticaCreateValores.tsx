import { Container } from "../styles";
import { useState, useEffect } from "react";
import { IFormaFarmaceuticaValores } from "../IFormaFarmaceuticaValores";
import { IFormaFarmaceuticaMargens } from "../IFormaFarmaceuticaMargens";
import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown";
import { getAll } from "../../../Services/Api";
import { FieldsetCustom } from "../../../Components/Others/FieldsetCustom";

export let FormaFarmaceuticaValoresModel: IFormaFarmaceuticaValores = {
    formaFarmaceuticaMargens: [] as IFormaFarmaceuticaMargens[],
    custoAdicional: 0,
    valorMinimo: 0,
    ncmId: null
}

export function FormaFarmaceuticaCreateValores() {

    const [custoAdicional, setCustoAdicional] = useState(0);
    const [valorMinimo, setValorMinimo] = useState(0);
    const [ncmId, setNcmId] = useState(null);
    const [formasFarmaceuticasMargens, setFormasFarmaceuticasMargens] = useState([{ id: 0, formaFarmaceuticaId: 0, margem: 0, valorFinal: 0, valorInicial: 0 }] as IFormaFarmaceuticaMargens[]);
    const [ncms, setNcms] = useState([]);
    const [error, setError] = useState([""] as string[])

    FormaFarmaceuticaValoresModel.formaFarmaceuticaMargens = formasFarmaceuticasMargens;
    FormaFarmaceuticaValoresModel.custoAdicional = custoAdicional;
    FormaFarmaceuticaValoresModel.valorMinimo = valorMinimo;
    FormaFarmaceuticaValoresModel.ncmId = ncmId;

    useEffect(() => {
        const loadDataTable = async () => {
            const response = await getAll("ListaNcm");
            setNcms(response.data);
        }

        loadDataTable()
    }, []);

    function AdicionarValorInicial(value: number, index: number) {

        formasFarmaceuticasMargens[index].valorInicial = value;

        if (formasFarmaceuticasMargens[index].valorInicial > formasFarmaceuticasMargens[index].valorFinal
            && formasFarmaceuticasMargens[index].valorFinal > 0) {
            error[index] = "Valor inicial não pode ser maior que valor final !"
            setError([...error])
        } else {
            error[index] = ""
            setError([...error])
        }

        setFormasFarmaceuticasMargens([...formasFarmaceuticasMargens])
    }
    function AdicionarValorFinal(value: number, index: number) {

        formasFarmaceuticasMargens[index].valorFinal = value;

        if (formasFarmaceuticasMargens[index].valorInicial > formasFarmaceuticasMargens[index].valorFinal) {
            error[index] = "Valor inicial não pode ser maior que valor final !"
            setError([...error])
        } else {
            error[index] = ""
            setError([...error])
        }

        setFormasFarmaceuticasMargens([...formasFarmaceuticasMargens])
    }
    function AdicionarMargem(value: number, index: number) {

        formasFarmaceuticasMargens[index].margem = value;

        if (formasFarmaceuticasMargens[index].valorInicial > formasFarmaceuticasMargens[index].valorFinal) {
            error[index] = "Valor inicial não pode ser maior que valor final !"
            setError([...error])
            return;
        } else {
            error[index] = ""
            setError([...error])
        }

        if (formasFarmaceuticasMargens[index].margem > 0
            && formasFarmaceuticasMargens[index].valorInicial > 0
            && formasFarmaceuticasMargens[index].valorFinal > 0
            && formasFarmaceuticasMargens.length == (index + 1)) {
            formasFarmaceuticasMargens.push({ id: 0, formaFarmaceuticaId: 0, margem: 0, valorFinal: 0, valorInicial: 0 })
        }

        setFormasFarmaceuticasMargens([...formasFarmaceuticasMargens])
    }

    return (
        <>
            <Container>
                <div className="row mb-4">
                    <div className="col-2">
                        <CustomInput
                            label="Custo Adicional"
                            placeholder="Digite o custo adicional"
                            type="number"
                            value={custoAdicional}
                            OnChange={(e) => setCustoAdicional(parseFloat(e.target.value))}
                        />
                    </div>
                    <div className="col-2">
                        <CustomInput
                            label="Valor mínimo"
                            type="number"
                            placeholder="Digite o valor mínimo"
                            value={valorMinimo}
                            OnChange={(e) => setValorMinimo(parseFloat(e.target.value))}
                        />
                    </div>
                    <div className="col-4">
                        <CustomDropDown
                            data={ncms}
                            Select={(id) => setNcmId(id)}
                            filter="descricao"
                            label="NCM"
                            title="Selecione o NCM"
                        />
                    </div>
                </div>
                <FieldsetCustom legend="Margem Valor Forma" numberCols={8}>
                    {formasFarmaceuticasMargens.map((item, index) => (
                        <>
                            <div key={index} className="row mt-2">
                                <div className="col-3">
                                    <CustomInput
                                        label="Valor Inicial"
                                        placeholder="Digite o valor inicial"
                                        type="number"
                                        value={item.valorInicial}
                                        OnChange={(e) => AdicionarValorInicial(parseFloat(e.target.value), index)}
                                    />
                                </div>
                                <div className="col-3">
                                    <CustomInput
                                        label="Valor Final"
                                        placeholder="Digite o valor final"
                                        type="number"
                                        value={item.valorFinal}
                                        OnChange={(e) => AdicionarValorFinal(parseFloat(e.target.value), index)}
                                    />
                                    {error[index] &&
                                        <p className="text-danger">{error[index]}</p>
                                    }
                                </div>
                                <div className="col-3">
                                    <CustomInput
                                        label="Margem"
                                        placeholder="Digite a margem"
                                        type="number"
                                        value={item.margem}
                                        OnChange={(e) => AdicionarMargem(parseFloat(e.target.value), index)}
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