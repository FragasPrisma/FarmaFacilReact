import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../../Services/Api";
import { useParams } from "react-router-dom";
import { IGrupo } from "../IGrupo";
import { GrupoDetailsEnsaio } from "./GrupoDetailsEnsaio";
import { itemsHandlesGrupo } from "../../../Enum/itensGrupo"
import { GrupoDetailsGeral } from "./GrupoDetailsGeral"
import TabsPage from "../../../Components/Tabs";

export function GrupoDetails() {

    const [grupoModel,setGrupoModel] = useState({} as IGrupo)

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaGrupoPorId", idParams);
            setGrupoModel(response.data)
        }

        Init()
    }, [])

    let arrayTab: any = [];
    {
        grupoModel.id > 0 &&
            arrayTab.push(<GrupoDetailsGeral GrupoModel={grupoModel}/>)
            arrayTab.push(<GrupoDetailsEnsaio EnsaiosGrupo={grupoModel.grupoEnsaios} />)
    }

    return (
        <>
            <HeaderMainContent title="DETALHES GRUPO" IncludeButton={false} ReturnButton={true} to="grupo" />
            <div className="form-group">
                {grupoModel.id > 0 &&
                    <TabsPage Childrens={arrayTab} TabsQtd={itemsHandlesGrupo.length} titles={itemsHandlesGrupo} />
                }
            </div>
        </>
    );
}
