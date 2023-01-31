import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { GenericTable } from "../../Components/Others/GenericTable";

export function EstadoDetails() {
    const [nome, setNome] = useState("");
    const [sigla, setSigla] = useState("");
    const [aliquotaIcmsEstado, setAliquotaIcmsEstado] = useState(0);
    const [aliquotaFcpEstado, setAliquotaFcpEstado] = useState(0)
    const [difalComCalculoPorDentro, setDifalComCalculoPorDentro] = useState(false);
    const [difalComCalculoDeIsento, setDifalComcalculoDeIsento] = useState(false);
    const [checagemContribuinteIsento, setChecagemContribuinteIsento] = useState(false);
    const [nomePais, setNomePais] = useState("");
    const [datas, setDatas] = useState([]);
    const [datasTable, setDatasTable] = useState<Array<any>>([]);

    const { id } = useParams();

    let idParams = !id ? "0" : id.toString()

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaEstadoPorId", idParams);
            if (response.status == 200) {
                setNome(response.data.nome);
                setSigla(response.data.sigla);
                setAliquotaIcmsEstado(response.data.aliquotaIcmsEstado);
                setAliquotaFcpEstado(response.data.aliquotaFcpEstado);
                setDifalComCalculoPorDentro(response.data.difalComCalculoPorDentro);
                setDifalComcalculoDeIsento(response.data.difalComCalculoDeIsento);
                setChecagemContribuinteIsento(response.data.checagemContribuinteIsento);

                if (response.data.paisId > 0) {
                    setNomePais(response.data.pais.nome);
                }

                const response2 = await GetId("ListaAliquotaEstado", idParams);

                if (response2.status == 200) {
                    setDatas(response2.data)
                }
            }
        }

        Init()
    }, [])


    useEffect(() => {
        function teste() {
            let dataTable: any[] = [];

            const modelData = {
                SiglaEstadoOrigem: "",
                EstadoOrigem: "",
                SiglaEstadoDestino: "",
                EstadoDestino: "",
                PorcentagemIcms: 0
            }
    
            datas.map((x: {estadoDestino: any, estadoOrigem: any, aliquotaIcms: number}) => {
                const modelData = {
                    SiglaEstadoOrigem: x.estadoOrigem.sigla,
                    EstadoOrigem: x.estadoOrigem.nome,
                    SiglaEstadoDestino:  x.estadoDestino.sigla,
                    EstadoDestino: x.estadoDestino.nome,
                    PorcentagemIcms: x.aliquotaIcms
                }
                // modelData.EstadoDestino = x.estadoDestino.nome;
                // modelData.EstadoOrigem = ;
                // modelData.SiglaEstadoDestino =;
                // modelData.SiglaEstadoOrigem = ;
                // modelData.PorcentagemIcms = ;
    
                dataTable.push(modelData);
            })
    
            setDatasTable(dataTable);
        }

        teste();
    }, [datas])

    return (
        <>
            <HeaderMainContent title="DETALHES ESTADO" IncludeButton={false} ReturnButton={true} to="estado" />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-4">
                            <CustomInput
                                label="Nome"
                                type="text"
                                readonly={true}
                                value={nome}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Sigla"
                                type="text"
                                readonly={true}
                                value={sigla}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Aliquota Icms %"
                                type="number"
                                readonly={true}
                                value={aliquotaIcmsEstado}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Aliquota Fcp %"
                                type="number"
                                readonly={true}
                                value={aliquotaFcpEstado}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Pais"
                                type="text"
                                readonly={true}
                                value={nomePais}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <CheckboxCustom
                                options={["Checagem Contribuinte Isento(NFe N.T. 2015/003)"]}
                                check={checagemContribuinteIsento}
                                readOnly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CheckboxCustom
                                options={["Difal com Calculo por Dentro"]}
                                check={difalComCalculoPorDentro}
                                readOnly={true}
                            />
                        </div>
                        <div className="col-3">
                            <CheckboxCustom
                                options={["Difal com Calculo Isento"]}
                                check={difalComCalculoDeIsento}
                                readOnly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-4">
                            <FieldsetCustom legend="Aliquotas por Estado">
                                <div className="row">
                                    <div className="col-10">
                                        <GenericTable
                                            data={datasTable}
                                            deleteButton={false}
                                            header={["SiglaEstadoOrigem", "EstadoOrigem", "SiglaEstadoDestino", "EstadoDestino", "PorcentagemIcms"]}
                                        />
                                    </div>
                                </div>
                            </FieldsetCustom>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}