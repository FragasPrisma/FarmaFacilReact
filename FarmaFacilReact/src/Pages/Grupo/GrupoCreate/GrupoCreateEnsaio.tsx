import { useState, useEffect } from "react";
import { Container } from "../styles";
import { IGrupoEnsaios } from "../IGrupo";
import { getAll } from "../../../Services/Api";
import { FieldsetCustom } from "../../../Components/Others/FieldsetCustom";
import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown";
import { IEnsaio } from "../../Ensaio/IEnsaio";
import { GenericTable } from "../../../Components/Others/GenericTable";

export let gruposEnsaios = [] as IGrupoEnsaios[];

export function GrupoCreateEnsaio() {

    const [grupoEnsaios, setGrupoEnsaios] = useState([] as IGrupoEnsaios[])
    const [ensaios, setEnsaios] = useState([] as IEnsaio[])
    const [ensaiosView, setEnsaiosView] = useState([] as IEnsaio[])

    useEffect(() => {
        const loadDataTableEnsaio = async () => {
            const response = await getAll("ListaEnsaio");
            setEnsaios(response.data);
        }

        loadDataTableEnsaio()
    }, []);

    gruposEnsaios = grupoEnsaios;

    function AdicionarEnsaio(id: number) {

        const ensaiosFilter = ensaios.filter(item => item.id === id);
        const ensaio = ensaiosFilter[0];
        const ensaiosNoGrupo = grupoEnsaios.filter(item => item.ensaioId === ensaio.id);

        if (ensaiosNoGrupo.length === 0) {
            ensaiosView.push(ensaio)
            setEnsaiosView([...ensaiosView])
            grupoEnsaios.push({ id: 0, descricao: "", ensaioId: ensaio.id, grupoId: 0 })
            setGrupoEnsaios([...grupoEnsaios]);
        }
    }

    function ExcluirEnsaio(index: number) {
        ensaiosView.splice(index,1)
        setEnsaiosView([...ensaiosView])
        grupoEnsaios.splice(index,1)
        setGrupoEnsaios([...grupoEnsaios]);
    }

    return (
        <>

            <Container>
                <div className="row mt-4">
                    <div className="col-8">
                        <FieldsetCustom numberCols={12} legend="Selecione os Ensaios">
                            <CustomDropDown
                                data={ensaios}
                                filter="nome"
                                label="Selecione os Ensaios"
                                title="Ensaio"
                                Select={(idEnsaio) => AdicionarEnsaio(idEnsaio)}
                            />
                        </FieldsetCustom>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <GenericTable
                            data={ensaiosView}
                            header={["id", "nome"]}
                            onDelete={(index) => ExcluirEnsaio(index)}
                        />
                    </div>
                </div>
            </Container>
        </>
    );
}
