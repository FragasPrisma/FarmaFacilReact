import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { getAll, GetId } from "../../../Services/Api";
import { useParams } from "react-router-dom";
import TabsPage from "../../../Components/Tabs";
import { itemsHandlesNcm } from "../../../Enum/ItemsNcm";
import { NcmDetailsGeral } from "./NcmDetailsGeral";
import { NcmDetailsPorEstado } from "./NcmDetailsPorEstado";
import { INcmGeral, NcmGeral } from "../NcmGeral";
import { INcmPorEstado, NcmPorEstado } from "../NcmPorEstado";
import { ITributo } from "../Tributo";
import { IEstado } from "../IEstado";

export function NcmDetails(){
    const [listaNcmPorEstado, setListaNcmPorEstado] = useState([] as INcmPorEstado []);
    const [listaEstados, setListaEstados] = useState([] as IEstado []);
    const [listaTributosCst, setListaTributosCst] = useState([] as ITributo []);
    const [listaTributosCsosn, setListaTributosCsosn] = useState([] as ITributo []);
    const [dataNcm, setDataNcm] = useState({} as INcmGeral);

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function ListEstados() {
            const response = await getAll("ListaEstado");
            setListaEstados(response.data)
        }

        async function ListTributos() {
            const response = await getAll("ListaTributo");
            setListaTributosCst(response.data.filter((tributo: any) => tributo.tipoTributo == 0))
            setListaTributosCsosn(response.data.filter((tributo: any) => tributo.tipoTributo == 1))
        }

        async function Init() {
            const response = await GetId("RetornaNcmPorId", idParams);
            if (response.status == 200) {
                setDataNcm(response.data)
                setListaNcmPorEstado(response.data.ncmEstados);
            }
        }

        ListEstados()
        ListTributos()
        Init()
    }, [])

    let arrayTab: any = [];
    const titles = itemsHandlesNcm;

    {
        dataNcm.id > 0 && 
        
        arrayTab.unshift(
            <NcmDetailsGeral
                NcmGeralModel={dataNcm}
            />
        );

        arrayTab.push(
            <NcmDetailsPorEstado
                NcmPorEstado={listaNcmPorEstado}
                ListaTributosCst={listaTributosCst}
                ListaTributosCsosn={listaTributosCsosn}
                ListaEstados={listaEstados}
            />
        );
    }

    return (
        <>
            <HeaderMainContent title="DETALHES NCM" IncludeButton={false} ReturnButton={true} to="ncm" />
            <div className="form-group">

                {dataNcm.id > 0 &&
                    <TabsPage Childrens={arrayTab} TabsQtd={titles.length} titles={titles} />
                }
            </div>
        </>
    );
}