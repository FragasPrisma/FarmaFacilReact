import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { Container } from "./styles";
import { ChangeEvent, useEffect, useState } from "react";
import { getAll, GetId, postFormAll } from "../../Services/Api";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { useNavigate, useParams } from "react-router-dom";
import { RadioCustom } from "../../Components/Inputs/RadioCustom/index";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";

interface IUnidadeConversao {
    id: 0,
    sigla: "",
    descricao: "",
    fator: Number,
    unidadeId: 0
}

export function UnidadeEdit() {

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaUnidadePorId", idParams);
            if (response.status == 200) {
                setId(response.data.id);
                setSigla(response.data.sigla);
                setDescricao(response.data.descricao);
                setTipo(response.data.tipo);
                setFator(response.data.fator);
                if (response.data.unidadesConversao) {
                    setUnidadesConversaoModel([...response.data.unidadesConversao])
                }
            }
        }

        Init()
    }, [])

    const navigate = useNavigate();

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [erroSigla, setErroSigla] = useState("");
    const [erroDescricao, setErroDescricao] = useState("");

    const [idUnidade, setId] = useState(0);
    const [sigla, setSigla] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState(0);
    const [fator, setFator] = useState(Number);

    const [unidadesConversaoModel, setUnidadesConversaoModel] = useState([] as IUnidadeConversao[]);
    const [unidadesConversaoModelExcluir, setUnidadesConversaoModelExcluir] = useState([] as IUnidadeConversao[]);
    const [unidades, setUnidades] = useState([]);

    const [unidadeId, setUnidadeId] = useState(0);
    const [erroFatorArray, setErroFatorArray] = useState("");

    useEffect(() => {
        const loadDataUnidade = async () => {
            const response = await getAll("ListaUnidade");
            if(response.data){
                setUnidades(response.data.filter((item : any) => item.id != idParams ));
            }
        }

        loadDataUnidade()
    }, []);

    const data = {
        id: idUnidade,
        sigla: sigla,
        descricao: descricao,
        tipo: tipo,
        fator: fator,
        unidadesConversao: unidadesConversaoModel
    };

    async function submit() {

        setErroSigla("");
        setErroDescricao("");
        setIsLoading(true);

        if (fator > 0) {
            data.unidadesConversao = [];
        }

        if (!sigla) {
            setErroSigla("Campo sigla é obrigatório !")
            setIsLoading(false);
            return;
        }

        if (!descricao) {
            setErroDescricao("Campo descrição é obrigatório !")
            setIsLoading(false);
            return;
        }

        let dataFilter = data.unidadesConversao.filter((item) => item.fator <= 0);

        if(dataFilter.length > 0){
            setIsLoading(false);
            setErroFatorArray("Fator de conversão não pode ser igual a zero !")
            return;
        }

        const response = await postFormAll("EditarUnidade", data);

        if (response.status === 200) {

            if(unidadesConversaoModelExcluir.length > 0){
                unidadesConversaoModelExcluir.map(async (item) => {
                    const resp = await postFormAll("ExcluirUnidadeConversao",item);
                })
            }

            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/unidade");
            }, 2000);

        } else {

            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000);

        }
    }

    useEffect(() => {

        if (unidadeId > 0) {

            function Init() {

                unidades.map((item: IUnidadeConversao) => {

                    if (item.id == unidadeId) {

                        var unidadesFiltrarExistente = unidadesConversaoModel.filter((x) => x.unidadeId == unidadeId);

                        if (unidadesFiltrarExistente.length == 0) {

                            unidadesConversaoModel.push({ id: 0, sigla: item.sigla, descricao: item.descricao, fator: 0, unidadeId: item.id });
                            setUnidadesConversaoModel([...unidadesConversaoModel]);

                        }
                    }

                })
            }
            Init();
        }

    }, [unidadeId])

    function AdicionarFatorConversao(fator: any, index: any) {

        unidadesConversaoModel[index].fator = fator
        setUnidadesConversaoModel([...unidadesConversaoModel])

    }

    function ExcluirUnidadeConversao(index: any, item: any) {
        unidadesConversaoModel.splice(index, 1)
        setUnidadesConversaoModel([...unidadesConversaoModel])
        unidadesConversaoModelExcluir.push(item);
        setUnidadesConversaoModelExcluir([...unidadesConversaoModelExcluir])
    }

    return (
        <>
            <HeaderMainContent
                title="EDITAR UNIDADE"
                IncludeButton={false}
                ReturnButton={false}
            />
            <div className="form-group">
                {idUnidade > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label="Sigla"
                                    type="text"
                                    placeholder="Digite a sigla"
                                    value={sigla}
                                    maxLength={2}
                                    erro={erroSigla}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setSigla(e.target.value)
                                    }
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <CustomInput
                                    label="Descrição"
                                    type="text"
                                    placeholder="Digite a descrição"
                                    value={descricao}
                                    maxLength={50}
                                    erro={erroDescricao}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setDescricao(e.target.value)
                                    }
                                    required={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                <RadioCustom
                                    titleComponet="Tipo"
                                    options={[
                                        "Massa",
                                        "Volume"
                                    ]}
                                    name="tipo"
                                    onClickOptions={(value, label) => setTipo(value)}
                                    value={tipo}
                                />
                            </div>
                            <div className="col-3 mt-4">
                                <CustomInput
                                    label="Fator Lactobacilos"
                                    type="number"
                                    placeholder="Digite o fator"
                                    value={fator}
                                    maxLength={16}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setFator(parseFloat(e.target.value))
                                    }
                                />
                            </div>
                        </div>

                        {fator <= 0 &&
                            <div className="row">
                                <div className="col-7">
                                    <CustomDropDown
                                        data={unidades}
                                        title="Selecione a Unidade de Conversão"
                                        filter="descricao"
                                        label="Unidade de Conversão"
                                        Select={(unidadeId) => setUnidadeId(unidadeId)}
                                    />
                                </div>
                            </div>
                        }



                        {unidadesConversaoModel.length > 0 && fator <= 0 &&

                            unidadesConversaoModel.map((item, index) => (

                                <div key={item.id} className="row">
                                    <div className="col-1">
                                        <CustomInput
                                            label="Sigla"
                                            type="text"
                                            value={item.sigla}
                                            readonly={true}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <CustomInput
                                            label="Descrição"
                                            type="text"
                                            value={item.descricao}
                                            readonly={true}
                                        />
                                    </div>
                                    <div className="col-2">
                                        <CustomInput
                                            label="Fator de Conversão"
                                            type="number"
                                            value={item.fator}
                                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                AdicionarFatorConversao(e.target.value, index)
                                            }

                                        />
                                    </div>
                                    <div className="col-2 mt-3">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => ExcluirUnidadeConversao(index, item)}
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                        <p className="text-danger">{erroFatorArray}</p>
                        <div className="row">
                            <div className="col-6 mt-2">
                                <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                                <ButtonCancel to="unidade" />
                            </div>
                        </div>
                    </Container>
                }
                <SuccessModal show={isOpenSuccess} textCustom="Unidade editada com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div >
        </>
    );
}
