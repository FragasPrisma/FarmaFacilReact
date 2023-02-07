import { X } from "phosphor-react"
import { useEffect, useState } from "react"
import { CustomInput } from "../../../Components/Inputs/CustomInput"
import { FieldsetCustom } from "../../../Components/Others/FieldsetCustom"
import { IEstado } from "../../../Interfaces/Estado/IEstado"
import { ncmPorEstado } from "../NcmCreate/NcmCreatePorEstado"
import { INcmPorEstado } from "../../../Interfaces/Ncm/INcmPorEstado"
import { Container } from "../styles"
import { ITributo } from "../../../Interfaces/Tributo/ITributo"

interface Data {
    NcmPorEstado: INcmPorEstado[]
    ListaTributosCst: ITributo[]
    ListaTributosCsosn: ITributo[]
    ListaEstados: IEstado[]
}

export function NcmDetailsPorEstado({ NcmPorEstado, ListaTributosCst, ListaTributosCsosn, ListaEstados }: Data) {
    const [ncmModel, setNcmModel] = useState([] as INcmPorEstado[]);

    useEffect(() => {
        if (NcmPorEstado && ListaEstados && ListaTributosCsosn && ListaTributosCst) {
            NcmPorEstado.forEach((ncm, index) => {
                const estadoOrigem = ListaEstados.find(estado => estado.id === ncm.estadoOrigemId);
                const estadoDestino = ListaEstados.find(estado => estado.id === ncm.estadoDestinoId);
                const tributoCst = ListaTributosCst.find(tributo => tributo.id === ncm.tributoCstId);
                const tributoCsosn = ListaTributosCsosn.find(tributo => tributo.id === ncm.tributoCsosnId);
                if (estadoOrigem && estadoDestino && tributoCst && tributoCsosn) {
                    ncm.nomeEstadoOrigem = estadoOrigem.nome;
                    ncm.nomeEstadoDestino = estadoDestino.nome;
                    ncm.descricaoTributoCst = tributoCst.descricao;
                    ncm.descricaoTributoCsosn = tributoCsosn.descricao;
                    ncmModel.push(ncm)
                }
                setNcmModel([...ncmModel])
            });
        }

    }, [NcmPorEstado, ListaEstados, ListaTributosCsosn, ListaTributosCst])

    console.log(NcmPorEstado)

    return (
        <>
            <Container>
                <div className="row">
                    <div className="col-12 mt-4">
                        <FieldsetCustom legend="Aliquota por Estado">
                            {ncmModel.length > 0 &&
                                ncmModel.map((item, index) => (
                                    <div key={index} className="row">
                                        <div className="col-2">
                                            <CustomInput
                                                value={item.nomeEstadoOrigem}
                                                label="Estado Origem"
                                                type="text"
                                                readonly={true}
                                            />
                                        </div>
                                        <div className="col-2">
                                            <CustomInput
                                                value={item.nomeEstadoDestino}
                                                label="Estado Destino"
                                                readonly={true}
                                                type="text"
                                            />
                                        </div>
                                        <div className="col-1">
                                            <CustomInput
                                                value={item.descricaoTributoCst}
                                                readonly={true}
                                                label="Cst"
                                                type="text"
                                            />
                                        </div>
                                        <div className="col-1">
                                            <CustomInput
                                                value={item.descricaoTributoCsosn}
                                                label="Csosn"
                                                readonly={true}
                                                type="text"
                                            />
                                        </div>
                                        <div className="col-1">
                                            <CustomInput
                                                label="% Icms"
                                                type="number"
                                                readonly={true}
                                                value={item.aliquotaIcms}
                                            />
                                        </div>
                                        <div className="col-1">
                                            <CustomInput
                                                label="% Icms Int"
                                                type="number"
                                                value={item.aliquotaIcmsInterna}
                                                readonly={true}
                                            />
                                        </div>
                                        <div className="col-1">
                                            <CustomInput
                                                label="% MVA"
                                                type="number"
                                                value={item.percentualMva}
                                                readonly={true}
                                            />
                                        </div>
                                        <div className="col-1">
                                            <CustomInput
                                                label="% FCP"
                                                type="number"
                                                value={item.percentualFcp}
                                                readonly={true}
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                        </FieldsetCustom>
                    </div>
                </div>
            </Container>
        </>
    )
}