import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../../Services/Api";
import { useParams } from "react-router-dom";
import TabsPage from "../../../Components/Tabs";
import { IConvenio } from "../IConvenio";
import { itemsHandlesConvenio } from "../../../Enum/itensConvenio";
import { ConvenioDetailsGeral } from "./ConvenioDetailsGeral";
import { ConvenioDetailsComplemento } from "./ConvenioDetailsComplemento";

export function ConvenioDetails() {

    const [nomeEstado, setNomeEstado] = useState("")
    const [nomeCidade, setNomeCidade] = useState("")
    const [nomeBairro, setNomeBairro] = useState("")
    const [nomeVisitador, setNomeVisitador] = useState("")
    const [convenio, setConvenio] = useState({} as IConvenio)
    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaConvenioPorId", idParams);

            if (response.data.estado) {
                setNomeEstado(response.data.estado.sigla)
                response.data.estado = null
            }
            if (response.data.cidade) {
                setNomeCidade(response.data.cidade.nome)
                response.data.cidade = null
            }
            if (response.data.bairro) {
                setNomeBairro(response.data.bairro.nome)
                response.data.bairro = null
            }
            if (response.data.visitador) {
                setNomeVisitador(response.data.visitador.nome)
                response.data.visitador = null
            }

            setConvenio(response.data)

        }

        Init()
    }, [])

    let arrayTab: any = [];

    {
        convenio.id > 0 &&
            
        arrayTab.push(<ConvenioDetailsGeral
            convenioModel={convenio}
            nomeEndereco={{ nomeEstado: nomeEstado, nomeCidade: nomeCidade, nomeBairro: nomeBairro }}
        />)

        arrayTab.push(<ConvenioDetailsComplemento
            convenioModel={convenio}
            nomeVisitador={nomeVisitador}
        />)
    }

    return (
        <>
            <HeaderMainContent title="DETALHES CONVÊNIO" IncludeButton={false} ReturnButton={true} to="convenio" />
            <div className="form-group">
                {convenio.id > 0 &&

                    < TabsPage Childrens={arrayTab} TabsQtd={itemsHandlesConvenio.length} titles={itemsHandlesConvenio} />
                }
            </div>
        </>
    );
}
