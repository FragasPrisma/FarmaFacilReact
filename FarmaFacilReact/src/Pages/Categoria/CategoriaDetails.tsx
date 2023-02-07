import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { ICategoria } from "../../Interfaces/Categoria/ICategoria";

export function CategoriaDetails() {

    const [categoriaModel, setCategoriaModel] = useState({} as ICategoria);

    const [nomeCategoria, setNomeCategoria] = useState("");
    const { id } = useParams();
    let idParams = !id ? "" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaCategoriaPorId", idParams);

            setCategoriaModel(response.data);

            if (response.data.categoriaPai) {
                setNomeCategoria(response.data.categoriaPai.nome)
            }
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES CATEGORIA" IncludeButton={false} ReturnButton={true} to="categoria" />
            <div className="form-group">
                {categoriaModel.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-6">
                                <CustomInput
                                    label="Nome"
                                    type="text"
                                    value={categoriaModel.nome}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CustomInput
                                    label="Categoria Pai"
                                    type="text"
                                    value={nomeCategoria}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <CheckboxCustom options={[
                                    "Categoria Ativa"
                                ]}
                                    check={categoriaModel.categoriaAtivo}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    </Container>
                }
            </div>
        </>
    );
}
