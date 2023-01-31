import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { Container } from "./styles";
import { ChangeEvent, useEffect, useState } from "react";
import { getAll, GetId, postFormAll } from "../../Services/Api";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { useNavigate } from "react-router-dom";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { GenericTable } from "../../Components/Others/GenericTable";

export function EstadoCreate() {
    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState("");
    const [sigla, setSigla] = useState("");
    const [aliquotaIcmsEstado, setAliquotaIcmsEstado] = useState(0);
    const [aliquotaFcpEstado, setAliquotaFcpEstado] = useState(0)
    const [difalComCalculoPorDentro, setDifalComCalculoPorDentro] = useState(false);
    const [difalComCalculoDeIsento, setDicalComcalculoDeIsento] = useState(false);
    const [checagemContribuinteIsento, setChecagemContribuinteIsento] = useState(false);
    const [paisId, setPaisId] = useState();
    const [erroNome, setErroNome] = useState("");
    const [paises, setPaises] = useState([]);
    const [estados, setEstados] = useState([]);
    const [estadoOrigemId, setEstadoOrigemId] = useState(0);
    const [estadoOrigemNome, setEstadoOrigemNome] = useState("");
    const [estadoDestinoId, setEstadoDestinoId] = useState(0);
    const [estadoDestinoNome, setEstadoDestinoNome] = useState("");
    const [porcentagemIcms, setPorcentagemIcms] = useState(0);
    const [datas, setDatas] = useState<any>([]);

    const aliquotaEstado = {
        estadoOrigem: "",
        estadoDestino: "",
        porcentagemIcms: 0
    }

    function submitAliquota() {
        aliquotaEstado.estadoOrigem = estadoOrigemNome;
        aliquotaEstado.estadoDestino = estadoDestinoNome;
        aliquotaEstado.porcentagemIcms = porcentagemIcms;

        if (aliquotaEstado.estadoOrigem == "" || aliquotaEstado.estadoDestino == "") 
        {
            return 
        }

        datas.push(aliquotaEstado)
        console.log(datas)
    }

    useEffect(() => {
        async function Init() {
            let idEstadoDestino = estadoDestinoId.toString();
            const response = await GetId("RetornaEstadoPorId", idEstadoDestino);
            if (response.status == 200) {
                setEstadoDestinoNome(response.data.nome)
            }
        }
        Init()
    }, [estadoDestinoId])

    const data = {
        id: 0,
        nome: nome.trim(),
        sigla: sigla.trim(),
        aliquotaIcmsEstado: aliquotaIcmsEstado,
        aliquotaFcpEstado: aliquotaFcpEstado,
        difalComCalculoPorDentro: difalComCalculoPorDentro,
        difalComCalculoDeIsento: difalComCalculoDeIsento,
        checagemContribuinteIsento: checagemContribuinteIsento,
        paisId: paisId,
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
        const response = await postFormAll("AdicionarEstado", data);

        if (response.status === 200) {
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

    return (
        <>
            <HeaderMainContent title="ADICIONAR ESTADO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
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
                                onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setDicalComcalculoDeIsento(e.target.checked)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-4">
                            <FieldsetCustom legend="Aliquotas por Estado">
                                <div className="row">
                                    <div className="col-3">
                                        <CustomDropDown
                                            data={estados}
                                            title="Selecione o estado de origem"
                                            filter="nome"
                                            label="Estado origem"
                                            Select={(estadoOrigemId) =>
                                                setEstadoOrigemId(estadoOrigemId)}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <CustomDropDown
                                            data={estados}
                                            title="Selecione o estado de destino"
                                            filter="nome"
                                            label="Estado destino"
                                            Select={(estadoDestinoId) =>
                                                setEstadoDestinoId(estadoDestinoId)}
                                        />
                                    </div>
                                    <div className="col-1">
                                        <CustomInput
                                            label="% Icms"
                                            type="number"
                                            value={porcentagemIcms}
                                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                setPorcentagemIcms(parseFloat(e.target.value))
                                            }
                                        />
                                    </div>
                                    <div className="col-2 mt-3">
                                        <ButtonConfirm onCLick={submitAliquota} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <GenericTable
                                            data={datas} 
                                            header={["Estado de Origem", "Estado de Destino", "% Icms"]}
                                        />
                                    </div>
                                </div>
                            </FieldsetCustom>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mt-2">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="Estado" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Estado adicionado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}