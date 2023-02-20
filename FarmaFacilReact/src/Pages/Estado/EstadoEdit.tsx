import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { getAll, GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useParams, useNavigate } from 'react-router-dom';
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { GenericTable } from "../../Components/Others/GenericTable";

interface IAliquotaEstado {
    id: number,
    estadoOrigemId: number,
    estadoDestinoId: number,
    estadoDestinoNome: string,
    estadoDestinoSigla: string,
    aliquotaIcms: number
}

export function EstadoEdit() {
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    const [nome, setNome] = useState("");
    const [erroNome, setErroNome] = useState("")
    const [sigla, setSigla] = useState("");
    const [aliquotaIcmsEstado, setAliquotaIcmsEstado] = useState(0);
    const [aliquotaFcpEstado, setAliquotaFcpEstado] = useState(0)
    const [difalComCalculoPorDentro, setDifalComCalculoPorDentro] = useState(false);
    const [difalComCalculoDeIsento, setDifalComcalculoDeIsento] = useState(false);
    const [checagemContribuinteIsento, setChecagemContribuinteIsento] = useState(false);
    const [estadoId, setEstadoId] = useState(0);
    const [paisId, setPaisId] = useState(0);
    const [paises, setPaises] = useState([]);
    const [estados, setEstados] = useState([]);
    const [estadoDestinoId, setEstadoDestinoId] = useState(0);

    const [data] = useState({
        id: 0,
        nome: "",
        sigla: "",
        aliquotaIcmsEstado: 0,
        aliquotaFcpEstado: 0,
        paisId: 0,
        difalComCalculoPorDentro: false,
        difalComCalculoDeIsento: false,
        checagemContribuinteIsento: false
    })

    const [aliquotasEstadoModel, setAliquotasEstadoModel] = useState([] as IAliquotaEstado[]);
    const [aliquotasEstadoModelExcluir, setaliquotasEstadoModelExcluir] = useState([] as IAliquotaEstado[])

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaEstadoPorId", idParams);
            if (response.status == 200) {
                setEstadoId(response.data.id);
                setNome(response.data.nome);
                setSigla(response.data.sigla);
                setAliquotaIcmsEstado(response.data.aliquotaIcmsEstado);
                setAliquotaFcpEstado(response.data.aliquotaFcpEstado);
                setDifalComCalculoPorDentro(response.data.difalComCalculoPorDentro);
                setDifalComcalculoDeIsento(response.data.difalComCalculoDeIsento);
                setChecagemContribuinteIsento(response.data.checagemContribuinteIsento);

                const response2 = await GetId("ListaAliquotaEstado", idParams);

                if (response2.status == 200) {
                    let datasTable: any[] = [];

                    response2.data.map((x: { id: number, estadoDestino: any, estadoDestinoId: number, estadoOrigemId: number, aliquotaIcms: number }) => {
                        const data = {
                            id: x.id,
                            estadoOrigemId: x.estadoOrigemId,
                            estadoDestinoId: x.estadoDestinoId,
                            estadoDestinoNome: x.estadoDestino.nome,
                            estadoDestinoSigla: x.estadoDestino.sigla,
                            aliquotaIcms: x.aliquotaIcms
                        }

                        datasTable.push(data)
                    })

                    setAliquotasEstadoModel(datasTable)
                }
            }
        }

        Init()
    }, [])

    async function submit() {
        setErroNome("")
        setIsLoading(true)
        if (!nome.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroNome("Campo nome é obrigatório !")
            }, 2000)
            return;
        }

        data.id = estadoId;
        data.nome = nome;
        data.sigla = sigla;
        data.aliquotaIcmsEstado = aliquotaIcmsEstado;
        data.aliquotaFcpEstado = aliquotaFcpEstado;
        data.paisId = paisId;
        data.difalComCalculoPorDentro = difalComCalculoPorDentro;
        data.difalComCalculoDeIsento = difalComCalculoDeIsento;
        data.checagemContribuinteIsento = checagemContribuinteIsento;

        const response = await postFormAll("EditarEstado", data);

        if (response.status === 200) {

            if (aliquotasEstadoModel.length > 0) {
                aliquotasEstadoModel.map(async (item) => {
                    if (item.id == 0) {
                        const data = {
                            id: item.id,
                            estadoOrigemId: item.estadoOrigemId,
                            estadoDestinoId: item.estadoDestinoId,
                            aliquotaIcms: item.aliquotaIcms
                        }
                        const resp = await postFormAll("AdicionarAliquotaEstado", data);
                    } else {
                        const data = {
                            id: item.id,
                            estadoOrigemId: item.estadoOrigemId,
                            estadoDestinoId: item.estadoDestinoId,
                            aliquotaIcms: item.aliquotaIcms
                        }
                        const resp = await postFormAll("EditarAliquotaEstado", data);
                    }
                })
            }

            if (aliquotasEstadoModelExcluir.length > 0) {
                aliquotasEstadoModelExcluir.map(async (item) => {
                    const resp = await postFormAll("ExcluirAliquotaEstado", item);
                })
            }

            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/estado");
            }, 2000)
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000)
        }
    }

    useEffect(() => {
        const loadDataPaises = async () => {
            const response = await getAll("ListaPais");
            setPaises(response.data);
        }

        loadDataPaises()
    }, []);

    useEffect(() => {
        const loadDataEstados = async () => {
            const response = await getAll("ListaEstado");
            setEstados(response.data);
        }

        loadDataEstados()
    }, []);

    useEffect(() => {
        if (estadoDestinoId > 0) {
            function Init() {
                estados.map((item: { id: number, nome: string, sigla: string }) => {
                    if (item.id == estadoDestinoId) {
                        var aliquotasEstadoFiltrarExistente = aliquotasEstadoModel.filter((x) => x.estadoDestinoId == estadoDestinoId);

                        if (aliquotasEstadoFiltrarExistente.length == 0) {

                            aliquotasEstadoModel.push({
                                id: 0,
                                estadoOrigemId: estadoId,
                                estadoDestinoId: item.id,
                                estadoDestinoNome: item.nome,
                                estadoDestinoSigla: item.sigla,
                                aliquotaIcms: 0
                            });
                            setAliquotasEstadoModel([...aliquotasEstadoModel]);
                        }
                    }
                })
            }
            Init();
        }
    }, [estadoDestinoId])

    function ExcluirAliquotaEstado(index: number, item: any) {
        aliquotasEstadoModel.splice(index, 1)
        setAliquotasEstadoModel([...aliquotasEstadoModel])
        aliquotasEstadoModelExcluir.push(item)
        setaliquotasEstadoModelExcluir([...aliquotasEstadoModelExcluir])
    }

    function AdicionarAliquotaEstado(aliquota: number, index: number) {
        aliquotasEstadoModel[index].aliquotaIcms = aliquota
        setAliquotasEstadoModel([...aliquotasEstadoModel])
    }

    return (
        <>
            <HeaderMainContent title="EDITAR ESTADO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                {
                    estadoId > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-4">
                                <CustomInput
                                    label="Nome"
                                    type="text"
                                    placeholder="Digite o nome do Estado"
                                    value={nome}
                                    maxLength={50}
                                    erro={erroNome}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setNome(e.target.value)
                                    }
                                    required={true}
                                />
                            </div>
                            <div className="col-2">
                                <CustomInput
                                    label="Sigla"
                                    type="text"
                                    placeholder="SC"
                                    value={sigla}
                                    maxLength={150}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setSigla(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <CustomInput
                                    label="Aliquota Icms %"
                                    type="number"
                                    value={aliquotaIcmsEstado}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setAliquotaIcmsEstado(parseFloat(e.target.value))
                                    }
                                />
                            </div>
                            <div className="col-2">
                                <CustomInput
                                    label="Aliquota Fcp %"
                                    type="number"
                                    value={aliquotaFcpEstado}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setAliquotaFcpEstado(parseFloat(e.target.value))
                                    }
                                />
                            </div>
                            <div className="col-2">
                                <CustomDropDown
                                    data={paises}
                                    title="Selecione o Pais"
                                    filter="nome"
                                    label="Pais"
                                    Select={(paisId) =>
                                        setPaisId(paisId)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <CheckboxCustom
                                    options={["Checagem Contribuinte Isento(NFe N.T. 2015/003)"]}
                                    check={checagemContribuinteIsento}
                                    onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setChecagemContribuinteIsento(e.target.checked)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <CheckboxCustom
                                    options={["Difal com Calculo por Dentro"]}
                                    check={difalComCalculoPorDentro}
                                    onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setDifalComCalculoPorDentro(e.target.checked)}
                                />
                            </div>
                            <div className="col-3">
                                <CheckboxCustom
                                    options={["Difal com Calculo Isento"]}
                                    check={difalComCalculoDeIsento}
                                    onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setDifalComcalculoDeIsento(e.target.checked)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-4">
                                <FieldsetCustom legend="Aliquotas por Estado">
                                    <div className="row">
                                        <div className="col-6">
                                            <CustomDropDown
                                                data={estados}
                                                title="Selecione um estado de destino"
                                                filter="nome"
                                                label="Estado de Destino"
                                                Select={(estadoDestinoId) =>
                                                    setEstadoDestinoId(estadoDestinoId)}
                                            />
                                        </div>
                                    </div>
                                    {aliquotasEstadoModel.length > 0 &&
                                        aliquotasEstadoModel.map((item, index) => (
                                            <div key={item.id} className="row">
                                                <div className="col-1">
                                                    <CustomInput
                                                        label="Sigla"
                                                        type="text"
                                                        value={item.estadoDestinoSigla}
                                                        readonly={true}
                                                    />
                                                </div>
                                                <div className="col-3">
                                                    <CustomInput
                                                        label="Estado Destino"
                                                        type="text"
                                                        value={item.estadoDestinoNome}
                                                        readonly={true}
                                                    />
                                                </div>
                                                <div className="col-2">
                                                    <CustomInput
                                                        label="%Icms"
                                                        type="number"
                                                        value={item.aliquotaIcms}
                                                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                            AdicionarAliquotaEstado(parseFloat(e.target.value), index)
                                                        }
                                                    />
                                                </div>
                                                <div className="col-2 mt-3">
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => ExcluirAliquotaEstado(index, item)}
                                                    >
                                                        Excluir
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </FieldsetCustom>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 mt-2">
                                <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                                <ButtonCancel to="estado" />
                            </div>
                        </div>
                    </Container>
                }
                <SuccessModal show={isOpenSuccess} textCustom="Estado adicionado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}