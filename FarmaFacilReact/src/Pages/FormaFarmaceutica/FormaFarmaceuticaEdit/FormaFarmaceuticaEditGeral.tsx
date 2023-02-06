import { IFormaFarmaceuticaGeral } from "../IFormaFarmaceuticaGeral";
import { useState, useEffect, ChangeEvent } from "react"
import { Container } from "../styles";
import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../../Components/Others/CheckboxCustom";
import { RadioCustom } from "../../../Components/Inputs/RadioCustom";
import { getAll } from "../../../Services/Api";
import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown";
import { IFormaFarmaceutica } from "../IFormaFarmaceutica";

export let FormaFarmaceuticaGeralModel: IFormaFarmaceuticaGeral = {
    id: 0,
    descricao: "",
    inativo: false,
    tipo: 0,
    selecionaQuantidadeSugerida: false,
    multiplicaComposicao: false,
    homeopatiaLiquida: false,
    deduzirQuantidadeVeiculo: false,
    calculoEmbalagemForma: null,
    converteVolumeEmbalagem: false,
    uso: "",
    tipoUso: 0,
    popForma: "",
    imprimirCamposAnalise: false,
    selecionarVolumeAutomatico: false,
    validade: 0,
    mlGotas: 0,
    imprimirUnidadeMedidaNoRotulo: false,
    fatorPerdaProduto: 0,
    ativaFatorPerdaQsp: false,
    manipuladorId: null,
    quantidadeFormulasHora: 0,
    descricaoRotulo: "",
    quantidadeQspMinimo: 0,
    produtoVeiculoId: null,
    grupoVeiculoId: null,
    ativaPesagemMonitorada: false,
    calcularDensidade: false,
    codigoLaboratorioLp: "",
    codigoFuncionarioManipulacao: 0,
    codigoFormaReceituario: 0,
    codigoFilialProducao: 0,
    aliquotaIva: 0
};

interface IData {
    erros: string;
    model:IFormaFarmaceutica;
    nomeFuncionario:string;
}

export function FormaFarmaceuticaEditGeral({ erros , model , nomeFuncionario}: IData) {

    const [descricao, setDescricao] = useState(model.descricao);
    const [selecionarVolumeAutomatico, setSelecionarVolumeAutomatico] = useState(model.selecionarVolumeAutomatico);
    const [aliquotaIva, setAliquotaIva] = useState(model.aliquotaIva);
    const [codigoFuncionarioManipulacao, setCodigoFuncionarioManipulacao] = useState(model.codigoFuncionarioManipulacao);
    const [codigoFilialProducao, setCodigoFilialProducao] = useState(model.codigoFilialProducao);
    const [codigoFormaReceituario, setCodigoFormaReceituario] = useState(model.codigoFormaReceituario);
    const [produtoVeiculoId, setProdutoVeiculoId] = useState(model.produtoVeiculoId);
    const [codigoLaboratorioLp, setCodigoLaboratorioLp] = useState(model.codigoLaboratorioLp);
    const [ativaPesagemMonitorada, setAtivaPesagemMonitorada] = useState(model.ativaPesagemMonitorada);
    const [calcularDensidade, setCalcularDensidade] = useState(model.calcularDensidade);
    const [grupoVeiculoId, setGrupoVeiculoId] = useState(model.grupoVeiculoId);
    const [quantidadeQspMinimo, setQuantidadeQspMinimo] = useState(model.quantidadeQspMinimo);
    const [descricaoRotulo, setDescricaoRotulo] = useState(model.descricaoRotulo);
    const [fatorPerdaProduto, setFatorPerdaProduto] = useState(model.fatorPerdaProduto);
    const [manipuladorId, setManipuladorId] = useState(model.manipuladorId);
    const [quantidadeFormulasHora, setQuantidadeFormulasHora] = useState(model.quantidadeFormulasHora)
    const [ativaFatorPerdaQsp, setAtivaFatorPerdaQsp] = useState(model.ativaFatorPerdaQsp);
    const [imprimirUnidadeMedidaNoRotulo, setImprimirUnidadeMedidaNoRotulo] = useState(model.imprimirUnidadeMedidaNoRotulo);
    const [validade, setValidade] = useState(model.validade);
    const [mlGotas, setMlGotas] = useState(model.mlGotas);
    const [inativo, setInativo] = useState(model.inativo);
    const [tipo, setTipo] = useState(model.tipo);
    const [selecionaQuantidadeSugerida, setSelecionaQuantidadeSugerida] = useState(model.selecionaQuantidadeSugerida);
    const [multiplicaComposicao, setMultiplicaComposicao] = useState(model.multiplicaComposicao);
    const [homeopatiaLiquida, setHomeopatiaLiquida] = useState(model.homeopatiaLiquida);
    const [deduzirQuantidadeVeiculo, setDeduzirQuantidadeVeiculo] = useState(model.deduzirQuantidadeVeiculo);
    const [calculoEmbalagemForma, setCalculoEmbalagemForma] = useState(model.calculoEmbalagemForma);
    const [converteVolumeEmbalagem, setConverteVolumeEmbalagem] = useState(model.converteVolumeEmbalagem);
    const [uso, setUso] = useState(model.uso);
    const [tipoUso, setTipoUso] = useState(model.tipoUso);
    const [popForma, setPopForma] = useState(model.popForma);
    const [imprimirCamposAnalise, setImprimirCamposAnalise] = useState(model.imprimirCamposAnalise);

    const [funcionariosLaboratorios, setFuncionariosLaboratorios] = useState([]);

    FormaFarmaceuticaGeralModel.id= model.id;
    FormaFarmaceuticaGeralModel.descricao= descricao;
    FormaFarmaceuticaGeralModel.inativo= inativo;
    FormaFarmaceuticaGeralModel.tipo= tipo;
    FormaFarmaceuticaGeralModel.selecionaQuantidadeSugerida= selecionaQuantidadeSugerida;
    FormaFarmaceuticaGeralModel.multiplicaComposicao= multiplicaComposicao;
    FormaFarmaceuticaGeralModel.homeopatiaLiquida= homeopatiaLiquida;
    FormaFarmaceuticaGeralModel.deduzirQuantidadeVeiculo= deduzirQuantidadeVeiculo;
    FormaFarmaceuticaGeralModel.calculoEmbalagemForma= calculoEmbalagemForma;
    FormaFarmaceuticaGeralModel.converteVolumeEmbalagem= converteVolumeEmbalagem;
    FormaFarmaceuticaGeralModel.uso= uso;
    FormaFarmaceuticaGeralModel.tipoUso= tipoUso;
    FormaFarmaceuticaGeralModel.popForma= popForma;
    FormaFarmaceuticaGeralModel.imprimirCamposAnalise= imprimirCamposAnalise;
    FormaFarmaceuticaGeralModel.selecionarVolumeAutomatico= selecionarVolumeAutomatico;
    FormaFarmaceuticaGeralModel.validade= validade;
    FormaFarmaceuticaGeralModel.mlGotas= mlGotas;
    FormaFarmaceuticaGeralModel.imprimirUnidadeMedidaNoRotulo= imprimirUnidadeMedidaNoRotulo;
    FormaFarmaceuticaGeralModel.fatorPerdaProduto= fatorPerdaProduto;
    FormaFarmaceuticaGeralModel.ativaFatorPerdaQsp= ativaFatorPerdaQsp;
    FormaFarmaceuticaGeralModel.manipuladorId= manipuladorId;
    FormaFarmaceuticaGeralModel.quantidadeFormulasHora= quantidadeFormulasHora;
    FormaFarmaceuticaGeralModel.descricaoRotulo= descricaoRotulo;
    FormaFarmaceuticaGeralModel.quantidadeQspMinimo= quantidadeQspMinimo;
    FormaFarmaceuticaGeralModel.produtoVeiculoId= produtoVeiculoId;
    FormaFarmaceuticaGeralModel.grupoVeiculoId= grupoVeiculoId;
    FormaFarmaceuticaGeralModel.ativaPesagemMonitorada= ativaPesagemMonitorada;
    FormaFarmaceuticaGeralModel.calcularDensidade= calcularDensidade;
    FormaFarmaceuticaGeralModel.codigoLaboratorioLp= codigoLaboratorioLp;
    FormaFarmaceuticaGeralModel.codigoFuncionarioManipulacao= codigoFuncionarioManipulacao;
    FormaFarmaceuticaGeralModel.codigoFormaReceituario= codigoFormaReceituario;
    FormaFarmaceuticaGeralModel.codigoFilialProducao= codigoFilialProducao;
    FormaFarmaceuticaGeralModel.aliquotaIva= aliquotaIva;

    useEffect(() => {
        const loadDataFuncionario = async () => {
            const response = await getAll("ListaFuncionarioLaboratorio");
            setFuncionariosLaboratorios(response.data);
        }
        loadDataFuncionario()
    }, []);

    return (
        <>
            <Container>
                <div className="row">
                    <div className="col-7">
                        <CustomInput
                            label="Descrição"
                            type="text"
                            placeholder="Digite a descrição"
                            value={descricao}
                            maxLength={50}
                            erro={erros}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setDescricao(e.target.value)
                            }
                            required={true}
                        />
                    </div>
                    <div className="col-3 mt-1">
                        <CheckboxCustom
                            options={["Inativar Forma"]}
                            check={inativo}
                            onClickOptions={(e) => setInativo(e.target.checked)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <RadioCustom
                            name="tipo"
                            options={["Cápsula",
                                "Volume",
                                "Homeopatia",
                                "Floral",
                                "Unitário",
                                "Volume X Qtd (%)",
                                "Volume X Qtd (mg)",
                                "Papel",
                                "Implante",
                                "Comprimidos"]}
                            titleComponet="Tipo"
                            value={tipo}
                            onClickOptions={(check) => setTipo(check)}
                        />
                    </div>
                    <div className="col-5 mt-4">
                        <CheckboxCustom
                            options={["Selecionar quantidade sugerida"]}
                            check={selecionaQuantidadeSugerida}
                            onClickOptions={(e) => setSelecionaQuantidadeSugerida(e.target.checked)}
                        />
                        {tipo > 4 && tipo < 7 &&
                            < CheckboxCustom
                                options={["Multiplicar composição"]}
                                check={multiplicaComposicao}
                                onClickOptions={(e) => setMultiplicaComposicao(e.target.checked)}
                            />
                        }
                        {tipo == 2 &&
                            <div className="row">

                                <div className="col-6">
                                    <CheckboxCustom
                                        options={["Homeopatia líquida"]}
                                        check={homeopatiaLiquida}
                                        onClickOptions={(e) => setHomeopatiaLiquida(e.target.checked)}
                                    />
                                </div>
                                <div className="col-6">
                                    <CheckboxCustom
                                        options={["Não deduzir do Veículo"]}
                                        check={deduzirQuantidadeVeiculo}
                                        onClickOptions={(e) => setDeduzirQuantidadeVeiculo(e.target.checked)}
                                    />
                                </div>

                            </div>
                        }
                        {tipo > 4 && tipo < 7 &&
                            <RadioCustom
                                name="multiplicarComposicao"
                                options={["Volume unitário",
                                    "Volume Total"]}
                                titleComponet="Cálculo embalagem"
                                value={calculoEmbalagemForma ? calculoEmbalagemForma : 0}
                                onClickOptions={(check) => setCalculoEmbalagemForma(check)}
                            />
                        }
                        <CheckboxCustom
                            options={["Converte volume embalagem"]}
                            check={converteVolumeEmbalagem}
                            onClickOptions={(e) => setConverteVolumeEmbalagem(e.target.checked)}
                        />
                        {tipo == 3 &&
                            <CheckboxCustom
                                options={["Imprimir unidade no rótulo"]}
                                check={imprimirUnidadeMedidaNoRotulo}
                                onClickOptions={(e) => setImprimirUnidadeMedidaNoRotulo(e.target.checked)}
                            />
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 mt-4">
                        <CustomInput
                            label="Uso"
                            type="text"
                            placeholder="Digite o uso"
                            value={uso}
                            maxLength={20}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setUso(e.target.value)
                            }
                        />
                    </div>
                    <div className="col-3">
                        <RadioCustom
                            name="tipoUso"
                            options={["Sistêmico",
                                "Tópico"]}
                            titleComponet="Tipo de Uso"
                            value={tipoUso}
                            onClickOptions={(check) => setTipoUso(check)}
                        />
                    </div>
                    <div className="col-4 mt-4">
                        <CustomDropDown
                            data={funcionariosLaboratorios}
                            filter="nome"
                            label="Manipulador"
                            title={nomeFuncionario ? nomeFuncionario : "Selecione o manipulador"}
                            Select={(idManipulador) => setManipuladorId(idManipulador)}
                        />
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Fórmulas/Hora"
                            type="number"
                            placeholder="Digite a fórmula/hora"
                            value={quantidadeFormulasHora}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setQuantidadeFormulasHora(parseInt(e.target.value))
                            }
                        />
                    </div>

                </div>
                <div className="row">
                    <div className="col-3">
                        <CustomInput
                            label="P.O.P"
                            type="text"
                            placeholder="Digite o p.o.p"
                            value={popForma}
                            maxLength={15}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPopForma(e.target.value)
                            }
                        />
                    </div>
                    <div className="col-3 mt-1">
                        <CheckboxCustom
                            options={["Imprimir campos análise produto"]}
                            check={imprimirCamposAnalise}
                            onClickOptions={(e) => setImprimirCamposAnalise(e.target.checked)}
                        />
                        {tipo > 4 && tipo < 7 &&
                            <CheckboxCustom
                                options={["Selecionar volume automático"]}
                                check={selecionarVolumeAutomatico}
                                onClickOptions={(e) => setSelecionarVolumeAutomatico(e.target.checked)}
                            />
                        }
                    </div>

                    {tipo != 2 && tipo != 3 && tipo != 4 && tipo != 7 &&

                        <>
                            <div className="col-4">
                                <CustomInput
                                    label="Descrição Rótulo"
                                    type="text"
                                    placeholder="Digite a descrição rótulo"
                                    value={descricaoRotulo}
                                    maxLength={50}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) => setDescricaoRotulo(e.target.value)} />
                            </div>
                            <div className="col-2">
                                <CustomInput
                                    label="QSP Mínimo (%)"
                                    type="number"
                                    placeholder="Digite a fórmula/hora"
                                    value={quantidadeQspMinimo}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) => setQuantidadeQspMinimo(parseFloat(e.target.value))} />
                            </div>
                        </>

                    }
                </div>
                <div className="row">
                    <div className="col-3">
                        <CustomInput
                            label="Validade (dias)"
                            type="number"
                            placeholder="Digite a validade"
                            value={validade}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setValidade(parseInt(e.target.value))
                            }
                        />
                    </div>
                    {tipo != 2 && tipo != 3 && tipo != 4 && tipo != 7 &&
                        <>
                            <div className="col-3 mt-2">
                                <CheckboxCustom
                                    options={["Aplica fator perda QSP"]}
                                    check={ativaFatorPerdaQsp}
                                    onClickOptions={(e) => setAtivaFatorPerdaQsp(e.target.checked)} />
                            </div>
                            <div className="col-4">
                                <CustomInput
                                    label="Fator Perda"
                                    type="number"
                                    placeholder="Digite o fator perda"
                                    value={fatorPerdaProduto}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) => setFatorPerdaProduto(parseFloat(e.target.value))} />
                            </div>
                        </>
                    }
                    <div className="col-2">
                        <CustomInput
                            label="ML / Gotas"
                            type="number"
                            placeholder="Digite o ML"
                            value={mlGotas}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setMlGotas(parseFloat(e.target.value))
                            }
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 mt-1 mb-2">
                        <CheckboxCustom
                            options={["Pesagem Monitorada Forma"]}
                            check={ativaPesagemMonitorada}
                            onClickOptions={(e) => setAtivaPesagemMonitorada(e.target.checked)}
                        />
                        <CheckboxCustom
                            options={["Calcular Densidade"]}
                            check={calcularDensidade}
                            onClickOptions={(e) => setCalcularDensidade(e.target.checked)}
                        />
                    </div>  
                    <div className="col-4">
                        {tipo != 0 && tipo != 1 && tipo != 5 && tipo != 6 && tipo != 9 && tipo != 8 &&
                            <CustomDropDown
                                data={[]}
                                filter="nome"
                                label="Veículo"
                                title="Veículo"
                                Select={(idManipulador) => 1 + idManipulador} //Ajustar com o cadastro de produto
                            />
                        }
                    </div>

                </div>
            </Container>
        </>
    )
}