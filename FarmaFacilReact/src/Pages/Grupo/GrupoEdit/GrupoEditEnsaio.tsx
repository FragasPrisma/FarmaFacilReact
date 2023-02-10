import { useState, useEffect } from "react";
import { Container } from "../styles";
import { IGrupoEnsaios } from "../../../Interfaces/Grupo/IGrupo";
import { getAll } from "../../../Services/Api";
import { FieldsetCustom } from "../../../Components/Others/FieldsetCustom";
import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown";
import { GenericTable } from "../../../Components/Others/GenericTable";
import { IEnsaio } from "../../../Interfaces/Ensaio/IEnsaio";

export let gruposEnsaios = [] as IGrupoEnsaios[];
export let gruposEnsaiosDelete = [] as IGrupoEnsaios[];

interface IData {
    EnsaiosGrupo: IGrupoEnsaios[]
}

export function GrupoEditEnsaio({ EnsaiosGrupo }: IData) {

    const [grupoEnsaiosSelecionados, setGrupoEnsaiosSelecionados] = useState(EnsaiosGrupo)
    const [ensaios, setEnsaios] = useState([] as IEnsaio[])
    const [ensaiosDelete, setEnsaiosDelete] = useState([] as IGrupoEnsaios[])
    const [ensaiosView, setEnsaiosView] = useState([] as IEnsaio[])

    useEffect(() => {
        const loadDataTableEnsaio = async () => {
            const response = await getAll("ListaEnsaio");
            setEnsaios(response.data);
        }
        loadDataTableEnsaio()
    }, []);

    gruposEnsaios = grupoEnsaiosSelecionados;
    gruposEnsaiosDelete = ensaiosDelete;

    function AdicionarEnsaio(id: number) {

        const ensaiosFilter = ensaios.filter(item => item.id === id);
        const ensaio = ensaiosFilter[0];
        const ensaiosNoGrupo = grupoEnsaiosSelecionados.filter(item => item.ensaioId === ensaio.id);

        if (ensaiosNoGrupo.length === 0) {
            ensaiosView.push(ensaio)
            setEnsaiosView([...ensaiosView])
            grupoEnsaiosSelecionados.push({ id: 0, descricao: "", ensaioId: ensaio.id, grupoId: 0 })
            setGrupoEnsaiosSelecionados([...grupoEnsaiosSelecionados]);
        }
    }

    function ExcluirEnsaio(index: number) {

        grupoEnsaiosSelecionados.map((item, i) => {
            if (i == index) {
                ensaiosDelete.push(item)
            }
        })

        setEnsaiosDelete([...ensaiosDelete])

        ensaiosView.splice(index, 1)
        setEnsaiosView([...ensaiosView])

        grupoEnsaiosSelecionados.splice(index, 1)
        setGrupoEnsaiosSelecionados([...grupoEnsaiosSelecionados]);
    }

    useEffect(() => {

        if (ensaios) {

            const ensaiosSelect: IEnsaio[] = ensaios.filter(item =>
                EnsaiosGrupo.some(
                    x => x.ensaioId === item.id
                )
            );
            ensaiosSelect.map(
                item => (ensaiosView.push(item))
            );

            setEnsaiosView([...ensaiosView])
        }

    }, [ensaios]);

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
