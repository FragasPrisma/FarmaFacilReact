import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { ICategoria } from "../../Interfaces/Categoria/ICategoria";
import { useTranslation } from "react-i18next";

export function CategoriaDetails() {

    const [categoriaModel, setCategoriaModel] = useState({} as ICategoria);

    const [nomeCategoria, setNomeCategoria] = useState("");
    const { t } = useTranslation();
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
            <HeaderMainContent title={t('categoria.titleVisualizar')} IncludeButton={false} ReturnButton={true} to="categoria" />
            <div className="form-group">
                {categoriaModel.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-6">
                                <CustomInput
                                    label={t('textGeneric.nome')}
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
                                    label={t('categoria.propriedades.categoriaPai')}
                                    type="text"
                                    value={nomeCategoria}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <CheckboxCustom options={[
                                    t('categoria.propriedades.ativa')
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
