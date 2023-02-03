import { IConvenioComplemento } from "../IConvenioComplemento"
import { Container } from "../styles"
import { useState, useEffect, ChangeEvent } from "react"
import { getAll } from "../../../Services/Api"
import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown"
import { CheckboxCustom } from "../../../Components/Others/CheckboxCustom"
import { IGrupo } from "../../Grupo/IGrupo"
import { IConvenioGrupos } from "../IConvenio"
import { FieldsetCustom } from "../../../Components/Others/FieldsetCustom"
import { CustomInput } from "../../../Components/Inputs/CustomInput"

export let ConvenioComplementoModel: IConvenioComplemento = {
    bloqueado: false,
    permitirParcelamento: false,
    enviarEcommerce: false,
    permitirRateio: false,
    visitadorId: 0,
    etiquetaId: 0,
    enderecoComprovanteVenda: false,
    convenioGrupos: [] as IConvenioGrupos[]
}

export function ConvenioCreateComplemento() {

    const [bloqueado, setBloqueado] = useState(false);
    const [permitirParcelamento, setPermitirParcelamento] = useState(false);
    const [enviarEcommerce, setEnviarEcommerce] = useState(false);
    const [permitirRateio, setPermitirRateio] = useState(false);
    const [visitadorId, setVisitadorId] = useState(null);
    const [etiquetaId, setEtiquetaId] = useState(null);
    const [enderecoComprovanteVenda, setEnderecoComprovanteVenda] = useState(false);
    const [visitadores, setVisitadores] = useState([])
    const [conveniosGrupos, setConveniosGrupos] = useState([] as IConvenioGrupos[])
    const [grupos, setGrupos] = useState([] as IGrupo[]);
    const [erroCustoReferencia, setErroCustoReferencia] = useState("")

    ConvenioComplementoModel.bloqueado = bloqueado;
    ConvenioComplementoModel.permitirParcelamento = permitirParcelamento;
    ConvenioComplementoModel.enviarEcommerce = enviarEcommerce;
    ConvenioComplementoModel.permitirRateio = permitirRateio;
    ConvenioComplementoModel.visitadorId = visitadorId;
    ConvenioComplementoModel.etiquetaId = etiquetaId;
    ConvenioComplementoModel.enderecoComprovanteVenda = enderecoComprovanteVenda;
    ConvenioComplementoModel.convenioGrupos = conveniosGrupos;

    useEffect(() => {
        const loadDataVisitador = async () => {
            const response = await getAll("ListaVisitador");
            setVisitadores(response.data);
        }
        const loadDataGrupo = async () => {
            const response = await getAll("ListaGrupo");
            setGrupos(response.data);
        }

        loadDataGrupo()
        loadDataVisitador()
    }, []);

    function AdicionarGrupo(grupoId: number) {

        let gruposFilter = conveniosGrupos.filter(x => x.grupoId == grupoId);

        if (gruposFilter.length == 0) {
            conveniosGrupos.push({ id: 0, grupoId: grupoId, convenioId: 0, aplicaCustoReferencia: false, aplicaDescontoProduto: false, desconto: 0 })
            setConveniosGrupos([...conveniosGrupos])
        }

    }

    function ExcluirGrupo(index: number) {
        conveniosGrupos.splice(index, 1)
        setConveniosGrupos([...conveniosGrupos])
    }

    function AdicionarDesconto(desconto: number, index: number) {

        conveniosGrupos[index].desconto = desconto;
        setConveniosGrupos([...conveniosGrupos])
        ValidErroCustoReferencia(index);

    }

    function ValidErroCustoReferencia(index : number){
        if (conveniosGrupos[index].desconto > 0 && conveniosGrupos[index].aplicaCustoReferencia == true) {
            conveniosGrupos[index].desconto = 0
            setErroCustoReferencia("Custo Referência como Preço de Venda, desconto não é permitido !")
        } else {
            setErroCustoReferencia("")
        }
    }

    function AdicionarBoll(checked: boolean, index: number, opcao: number) {
        if (opcao == 1) {
            conveniosGrupos[index].aplicaDescontoProduto = checked;
            
        } else {
            conveniosGrupos[index].aplicaCustoReferencia = checked;
        }
        setConveniosGrupos([...conveniosGrupos])
        ValidErroCustoReferencia(index);
    }

    return (
        <Container>
            <div className="row">
                <div className="col-4">
                    <CustomDropDown
                        data={visitadores}
                        title="Selecione o Visitador"
                        filter="nome"
                        label="Visitador"
                        Select={(visitadorId) => setVisitadorId(visitadorId)} />
                </div>
                <div className="col-4">
                    <CustomDropDown
                        data={[]}
                        title="Selecione a Eitqueta"
                        filter=""
                        label="Etiqueta"
                        Select={(cidadeId) => setVisitadorId(cidadeId)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <CheckboxCustom
                        options={["Bloqueado"]}
                        check={bloqueado}
                        onClickOptions={(e) => setBloqueado(e.target.checked)}
                    />
                </div>
                <div className="col-5">
                    <CheckboxCustom
                        options={["Utilizar endereço do Convênio no comprovante de venda"]}
                        check={enderecoComprovanteVenda}
                        onClickOptions={(e) => setEnderecoComprovanteVenda(e.target.checked)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <CheckboxCustom
                        options={["Enviar E-Cmmerce"]}
                        check={enviarEcommerce}
                        onClickOptions={(e) => setEnviarEcommerce(e.target.checked)}
                    />
                </div>
                <div className="col-3">
                    <CheckboxCustom
                        options={["Permitir Parcelamento"]}
                        check={permitirParcelamento}
                        onClickOptions={(e) => setPermitirParcelamento(e.target.checked)}
                    />
                </div>
            </div>
            <div className="col-3 mb-5">
                <CheckboxCustom
                    options={["Permitir Rateio (Funcionário/Empresa)"]}
                    check={permitirRateio}
                    onClickOptions={(e) => setPermitirRateio(e.target.checked)}
                />
            </div>
            <div className="row">
                <FieldsetCustom legend="Selecione os Grupos" numberCols={8}>
                    <div className="col-10 mt-3">
                        <CustomDropDown
                            data={grupos}
                            title="Selecione o Grupo"
                            filter="descricao"
                            label="Grupo"
                            Select={(grupoId) => AdicionarGrupo(grupoId)}
                        />
                    </div>
                </FieldsetCustom>
            </div>
            <p className="text-danger">{ erroCustoReferencia }</p>
            {conveniosGrupos.map((item, index) => (

                <div key={item.id} className="row mt-2">
                    <div className="col-2">
                        <CustomInput
                            label="Grupo Id"
                            type="text"
                            value={item.grupoId}
                            readonly={true}
                        />
                    </div>
                    <div className="col-2">
                        <CustomInput
                            label="Desconto"
                            type="number"
                            placeholder="Digite o desconto"
                            value={item.desconto}
                            required={true}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                AdicionarDesconto(parseFloat(e.target.value), index)
                            }
                        />
                    </div>
                    <div className="col-4">
                        <div className="row">
                            <div className="col-12">
                                <CheckboxCustom
                                    options={["Aplica Desconto Produto"]}
                                    check={item.aplicaDescontoProduto}
                                    onClickOptions={(e) => AdicionarBoll(e.target.checked, index, 1)}
                                />
                            </div>
                            <div className="col-12">
                                <CheckboxCustom
                                    options={["Custo Referência como Preço de Venda"]}
                                    check={item.aplicaCustoReferencia}
                                    onClickOptions={(e) => AdicionarBoll(e.target.checked, index, 2)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-2 mt-3">
                        <button
                            className="btn btn-danger"
                            onClick={() => ExcluirGrupo(index)}
                        >Excluir</button>
                    </div>
                </div>
            ))
            }
        </Container>
    )
}