import { useState, ChangeEvent, useEffect } from 'react'
import { CustomDropDown } from '../../../Components/Inputs/CustomDropDown';
import { CustomInput } from '../../../Components/Inputs/CustomInput';
import { FailModal } from '../../../Components/Modals/FailModal';
import { FieldsetCustom } from '../../../Components/Others/FieldsetCustom';
import { getAll } from '../../../Services/Api';
import { INcmPorEstado, NcmPorEstado } from '../../../Interfaces/Ncm/INcmPorEstado';
import { Container } from '../styles';

interface IFields {
    [field: string]: keyof INcmPorEstado;
}

export let ncmPorEstado = [] as INcmPorEstado[];

export function NcmCreatePorEstado() {
    const [estados, setEstados] = useState([]);
    const [tributosCst, setTributosCst] = useState([]);
    const [tributosCsosn, setTributosCsosn] = useState([]);

    const [ncmPorEstadoModel, setNcmPorEstadoModel] = useState([] as INcmPorEstado[]);

    const [exibirErro, setExibirErro] = useState(false);
    const [erroJaInserido, setErroJaInserido] = useState("");
    const [erroJaInseridoMensagem, setErroJaInseridoMensagem] = useState("");
    const [isOpenFail, setIsOpenFail] = useState(false)

    const [estadoOrigemId, setEstadoOrigemId] = useState(0);
    const [estadoDestinoId, setEstadoDestinoId] = useState(0);
    const [tributoCstId, setTributoCstId] = useState(0);
    const [tributoCsosnId, setTributoCsosnId] = useState(0);
    const [aliquotaIcms, setAliquotaIcms] = useState(0);
    const [aliquotaIcmsInterna, setAliquotaIcmsInterna] = useState(0);
    const [percentualMva, setPercentualMva] = useState(0);
    const [percentualFcp, setPercentualFcp] = useState(0);

    NcmPorEstado.estadoOrigemId = estadoOrigemId;
    NcmPorEstado.estadoDestinoId = estadoDestinoId;
    NcmPorEstado.tributoCstId = tributoCstId;
    NcmPorEstado.tributoCsosnId = tributoCsosnId;
    NcmPorEstado.aliquotaIcms = aliquotaIcms;
    NcmPorEstado.aliquotaIcmsInterna = aliquotaIcmsInterna;
    NcmPorEstado.percentualMva = percentualMva;
    NcmPorEstado.percentualFcp = percentualFcp;
    NcmPorEstado.ncmId = 0;

    ncmPorEstado = ncmPorEstadoModel;

    useEffect(() => {
        const loadDataEstado = async () => {
            const response = await getAll("ListaEstado");
            setEstados(response.data);
        }

        const loadDataTributos = async () => {
            const response = await getAll("ListaTributo");
            setTributosCst(response.data.filter((x: { tipoTributo: number }) => x.tipoTributo == 0))
            setTributosCsosn(response.data.filter((x: { tipoTributo: number }) => x.tipoTributo == 1))
        }

        insereNovoDado();
        loadDataEstado();
        loadDataTributos();
    }, [])

    function insereNovoDado() {
        ncmPorEstadoModel.push({
            id: 0,
            estadoOrigemId: 0,
            estadoDestinoId: 0,
            tributoCstId: 0,
            tributoCsosnId: 0,
            aliquotaIcms: 0,
            aliquotaIcmsInterna: 0,
            percentualMva: 0,
            percentualFcp: 0,
            ncmId: 0
        })
    }

    function validation(index: number) {
        let origemId = ncmPorEstadoModel[index].estadoOrigemId;
        let destinoId = ncmPorEstadoModel[index].estadoDestinoId;
        let ncmPorEstadoModelFilter = ncmPorEstadoModel.filter((item, i) => {
            return (item.estadoOrigemId == origemId && item.estadoDestinoId == destinoId) && i !== index;
        });

        if (ncmPorEstadoModelFilter.length > 0) {
            setErroJaInserido("Já cadastrado");
            setErroJaInseridoMensagem("Estado de origem e destino já cadastrados")
            setIsOpenFail(true);
            setExibirErro(true);
        }

        return (
            ncmPorEstadoModel[index].estadoOrigemId > 0 &&
            ncmPorEstadoModel[index].estadoDestinoId > 0 &&
            ncmPorEstadoModel[index].aliquotaIcms >= 0 &&
            ncmPorEstadoModel[index].aliquotaIcmsInterna >= 0 &&
            ncmPorEstadoModel[index].percentualMva >= 0 &&
            ncmPorEstadoModel[index].percentualFcp >= 0 &&
            ncmPorEstadoModelFilter.length == 0
        ) ? true : false;
    }

    function adicionaNovaAliquota(index: number) {
        if (validation(index) && ncmPorEstadoModel.length == 1) {
            setExibirErro(false);
            insereNovoDado();
            setNcmPorEstadoModel([...ncmPorEstadoModel])
        } else if (validation(index) && ncmPorEstadoModel.length == index + 1) {
            setExibirErro(false);
            insereNovoDado();
            setNcmPorEstadoModel([...ncmPorEstadoModel])
        }
    }

    function ExcluirAliquotaEstado(index: number) {
        ncmPorEstadoModel.splice(index, 1);
        setNcmPorEstadoModel([...ncmPorEstadoModel]);
        setExibirErro(false);
    }

    const fields: IFields = {
        estadoOrigemId: 'estadoOrigemId',
        estadoDestinoId: 'estadoDestinoId',
        tributoCstId: 'tributoCstId',
        tributoCsosnId: 'tributoCsosnId',
        aliquotaIcms: 'aliquotaIcms',
        aliquotaIcmsInterna: 'aliquotaIcmsInterna',
        percentualMva: 'percentualMva',
        percentualFcp: 'percentualFcp'
    };

    function setDataItem(index: number, field: keyof IFields, value: string | number | boolean | null | undefined) {
        setNcmPorEstadoModel(prev => {
            const newModel = [...prev];
            (newModel[index] as any)[fields[field]] = value;
            return newModel;
        });

        if (field == 'percentualFcp') {
            adicionaNovaAliquota(index)
        }
    }

    return (
        <>
            <Container>
                <div className="row">
                    <div className="col-12 mt-4">
                        <FieldsetCustom legend="Aliquota por Estado">
                            {ncmPorEstadoModel.length > 0 &&
                                ncmPorEstadoModel.map((item, index) => (
                                    <div key={index} className="row">
                                        <div className="col-2">
                                            <CustomDropDown
                                                data={estados}
                                                title="Seleciona o estado de origem"
                                                filter="nome"
                                                label="Estado Origem"
                                                required={true}
                                                Select={(estadoOrigemId) => setDataItem(index, 'estadoOrigemId', estadoOrigemId)}
                                            />
                                        </div>
                                        <div className="col-2">
                                            <CustomDropDown
                                                data={estados}
                                                title="Seleciona o estado de destino"
                                                filter="nome"
                                                label="Estado Destino"
                                                required={true}
                                                Select={(estadoDestinoId) => setDataItem(index, 'estadoDestinoId', estadoDestinoId)}
                                            />
                                        </div>
                                        <div className="col-1">
                                            <CustomDropDown
                                                data={tributosCst}
                                                title="Cst"
                                                filter="descricao"
                                                label="Cst"
                                                Select={(tributoCstId) => setDataItem(index, 'tributoCstId', tributoCstId)}
                                            />
                                        </div>
                                        <div className="col-1">
                                            <CustomDropDown
                                                data={tributosCsosn}
                                                title="Csosn"
                                                filter="descricao"
                                                label="Csosn"
                                                Select={(tributoCsosnId) => setDataItem(index, 'tributoCsosnId', tributoCsosnId)}
                                            />
                                        </div>
                                        <div className="col-1">
                                            <CustomInput
                                                label="% Icms"
                                                type="number"
                                                required={true}
                                                value={item.aliquotaIcms}
                                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                    setDataItem(index, 'aliquotaIcms', parseFloat(e.target.value))
                                                }
                                            />
                                        </div>
                                        <div className="col-1">
                                            <CustomInput
                                                label="% Icms Int"
                                                type="number"
                                                value={item.aliquotaIcmsInterna}
                                                required={true}
                                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                    setDataItem(index, 'aliquotaIcmsInterna', parseFloat(e.target.value))
                                                }
                                            />
                                        </div>
                                        <div className="col-1">
                                            <CustomInput
                                                label="% MVA"
                                                type="number"
                                                value={item.percentualMva}
                                                required={true}
                                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                    setDataItem(index, 'percentualMva', parseFloat(e.target.value))
                                                }
                                            />
                                        </div>
                                        <div className="col-1">
                                            <CustomInput
                                                label="% FCP"
                                                type="number"
                                                value={item.percentualFcp}
                                                required={true}
                                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                    setDataItem(index, 'percentualFcp', parseFloat(e.target.value))
                                                }
                                            />
                                        </div>
                                        {ncmPorEstadoModel.length != 1 &&
                                            <div className="col-1 mt-3">
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => ExcluirAliquotaEstado(index)}
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        }
                                    </div>
                                ))
                            }
                            {exibirErro &&
                                <p className="text-danger">{erroJaInseridoMensagem}</p>
                            }
                            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} text={erroJaInserido} />
                        </FieldsetCustom>

                    </div>
                </div>
            </Container>
        </>
    )
}