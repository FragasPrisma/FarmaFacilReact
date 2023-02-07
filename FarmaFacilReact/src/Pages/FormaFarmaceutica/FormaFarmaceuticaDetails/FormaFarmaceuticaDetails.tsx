import { useParams } from "react-router-dom";
import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react"
import TabsPage from "../../../Components/Others/Tabs";
import { itemsHandlesFormaFarmaceutica } from "../../../Enum/itensFormaFarmaceutica";
import { IFormaFarmaceutica } from "../../../Interfaces/FormaFarmaceutica/IFormaFarmaceutica";
import { GetId } from "../../../Services/Api";
import { FormaFarmaceuticaDetailsGeral } from "./FormaFarmaceuticaDetailsGeral";
import { FormaFarmaceuticaDetailsEnsaios } from "./FormaFarmaceuticaDetailsEnsaios";
import { FormaFarmaceuticaDetailsValores } from "./FormaFarmaceuticaDetailsValores";
import { FormaFarmaceuticaDetailsImagem } from "./FormaFarmaceuticaDetailsImagem";

export function FormaFarmaceuticaDetails() {

    const [formaFarmaceuticaModel, setFormaFarmaceuticaModel] = useState({} as IFormaFarmaceutica);
    const [nomeFuncionario, setNomeFuncionario] = useState("")
    const [nomeNcm, setNomeNcm] = useState("")

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {

            const response = await GetId("RetornaFormaFarmaceuticaPorId", idParams);
            setFormaFarmaceuticaModel(response.data)
            if (response.data.manipulador) { setNomeFuncionario(response.data.manipulador.nome) }
            if (response.data.ncm) { setNomeNcm(response.data.ncm.descricao) }
        }

        Init()
    }, [])

    let arrayTab: any = [];

    {
        formaFarmaceuticaModel.id > 0 &&
            arrayTab.push(<FormaFarmaceuticaDetailsGeral model={formaFarmaceuticaModel} nomeFuncionario={nomeFuncionario} />);
        arrayTab.push(<FormaFarmaceuticaDetailsEnsaios model={formaFarmaceuticaModel} />);
        arrayTab.push(<FormaFarmaceuticaDetailsValores model={formaFarmaceuticaModel} nomeNcm={nomeNcm} />);
        arrayTab.push(<FormaFarmaceuticaDetailsImagem model={formaFarmaceuticaModel} />);
    }

    return (
        <>
            <HeaderMainContent title="DETALHES FORMA FARMACÊUTICA" IncludeButton={false} ReturnButton={true} to="formafarmaceutica" />
            <div className="form-group">
                <TabsPage Childrens={arrayTab} TabsQtd={itemsHandlesFormaFarmaceutica.length} titles={itemsHandlesFormaFarmaceutica} />
            </div>
        </>
    )
}