import { useState, useEffect } from "react";
import { Container } from "../styles";
import { IGrupoEnsaios } from "../../../Interfaces/Grupo/IGrupo";
import { getAll } from "../../../Services/Api";
import { FieldsetCustom } from "../../../Components/Others/FieldsetCustom";
import { GenericTable } from "../../../Components/Others/GenericTable";
import { IEnsaio } from "../../../Interfaces/Ensaio/IEnsaio";

interface IData {
    EnsaiosGrupo: IGrupoEnsaios[]
}

export function GrupoDetailsEnsaio({ EnsaiosGrupo }: IData) {

    const [ensaios, setEnsaios] = useState([] as IEnsaio[])
    const [ensaiosView, setEnsaiosView] = useState([] as IEnsaio[])

    useEffect(() => {
        const loadDataTableEnsaio = async () => {
            const response = await getAll("ListaEnsaio");
            setEnsaios(response.data);
        }
        loadDataTableEnsaio()
    }, []);

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
                        <FieldsetCustom numberCols={12} legend="Ensaios">
                            <GenericTable
                                data={ensaiosView}
                                header={["id", "nome"]}
                                deleteButton={false}
                            />
                        </FieldsetCustom>
                    </div>
                </div>
            </Container>
        </>
    );
}
