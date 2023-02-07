import { useNavigate, useParams } from "react-router-dom";
import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { FailModal } from "../../../Components/Modals/FailModal";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import { useState, useEffect } from "react"
import TabsPage from "../../../Components/Others/Tabs";
import { itemsHandlesFormaFarmaceutica } from "../../../Enum/itensFormaFarmaceutica";
import { IFormaFarmaceutica } from "../../../Interfaces/FormaFarmaceutica/IFormaFarmaceutica";
import { GetId, postFormAll } from "../../../Services/Api";
import { FormaFarmaceuticaEditGeral, FormaFarmaceuticaGeralModel } from "./FormaFarmaceuticaEditGeral";
import { FormaFarmaceuticaEditEnsaios, FormaFarmaceuticaEnsaiosModel, FormaFarmaceuticaEnsaiosModelExcluir } from "./FormaFarmaceuticaEditEnsaios";
import { FormaFarmaceuticaEditValores, FormaFarmaceuticaValoresModel } from "./FormaFarmaceuticaEditValores";
import { FormaFarmaceuticaEditImagem, FormaFarmaceuticaImagemModel } from "./FormaFarmaceuticaEditImagem";

export function FormaFarmaceuticaEdit() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [erroNome, setErroNome] = useState("")
    const [nomeFuncionario, setNomeFuncionario] = useState("")
    const [nomeNcm, setNomeNcm] = useState("")
    const navigate = useNavigate();

    const [formaFarmaceuticaModel, setFormaFarmaceuticaModel] = useState({} as IFormaFarmaceutica);

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {

            const response = await GetId("RetornaFormaFarmaceuticaPorId", idParams);

            if (response.data.manipulador) {
                setNomeFuncionario(response.data.manipulador.nome)
                response.data.manipulador = null;
            }

            if (response.data.ncm) {
                setNomeNcm(response.data.ncm.descricao)
                response.data.ncm = null;
            }

            setFormaFarmaceuticaModel(response.data)
        }

        Init()
    }, [])

    let arrayTab: any = [];

    {
        formaFarmaceuticaModel.id > 0 &&
            arrayTab.push(<FormaFarmaceuticaEditGeral model={formaFarmaceuticaModel} nomeFuncionario={nomeFuncionario} erros={erroNome} />);
        arrayTab.push(<FormaFarmaceuticaEditEnsaios model={formaFarmaceuticaModel} />);
        arrayTab.push(<FormaFarmaceuticaEditValores model={formaFarmaceuticaModel} nomeNcm={nomeNcm} />);
        arrayTab.push(<FormaFarmaceuticaEditImagem model={formaFarmaceuticaModel} />);
    }

    async function submit() {

        setIsLoading(true);
        setErroNome("");

        if (!FormaFarmaceuticaGeralModel.descricao.trim()) {
            setIsLoading(false);
            setErroNome("Campo descrição é obrigatório !");
            return
        }

        formaFarmaceuticaModel.id = FormaFarmaceuticaGeralModel.id;
        formaFarmaceuticaModel.descricao = FormaFarmaceuticaGeralModel.descricao.trim();
        formaFarmaceuticaModel.inativo = FormaFarmaceuticaGeralModel.inativo;
        formaFarmaceuticaModel.tipo = FormaFarmaceuticaGeralModel.tipo;
        formaFarmaceuticaModel.selecionaQuantidadeSugerida = FormaFarmaceuticaGeralModel.selecionaQuantidadeSugerida;
        formaFarmaceuticaModel.multiplicaComposicao = FormaFarmaceuticaGeralModel.multiplicaComposicao;
        formaFarmaceuticaModel.homeopatiaLiquida = FormaFarmaceuticaGeralModel.homeopatiaLiquida;
        formaFarmaceuticaModel.deduzirQuantidadeVeiculo = FormaFarmaceuticaGeralModel.deduzirQuantidadeVeiculo;
        formaFarmaceuticaModel.calculoEmbalagemForma = FormaFarmaceuticaGeralModel.calculoEmbalagemForma;
        formaFarmaceuticaModel.converteVolumeEmbalagem = FormaFarmaceuticaGeralModel.converteVolumeEmbalagem;
        if (FormaFarmaceuticaGeralModel.uso) { formaFarmaceuticaModel.uso = FormaFarmaceuticaGeralModel.uso.trim() }
        formaFarmaceuticaModel.tipoUso = FormaFarmaceuticaGeralModel.tipoUso;
        if (FormaFarmaceuticaGeralModel.popForma) { formaFarmaceuticaModel.popForma = FormaFarmaceuticaGeralModel.popForma.trim() }
        formaFarmaceuticaModel.imprimirCamposAnalise = FormaFarmaceuticaGeralModel.imprimirCamposAnalise;
        formaFarmaceuticaModel.selecionarVolumeAutomatico = FormaFarmaceuticaGeralModel.selecionarVolumeAutomatico;
        formaFarmaceuticaModel.validade = FormaFarmaceuticaGeralModel.validade;
        formaFarmaceuticaModel.mlGotas = FormaFarmaceuticaGeralModel.mlGotas;
        formaFarmaceuticaModel.imprimirUnidadeMedidaNoRotulo = FormaFarmaceuticaGeralModel.imprimirUnidadeMedidaNoRotulo;
        formaFarmaceuticaModel.fatorPerdaProduto = FormaFarmaceuticaGeralModel.fatorPerdaProduto;
        formaFarmaceuticaModel.ativaFatorPerdaQsp = FormaFarmaceuticaGeralModel.ativaFatorPerdaQsp;
        formaFarmaceuticaModel.manipuladorId = FormaFarmaceuticaGeralModel.manipuladorId;
        formaFarmaceuticaModel.quantidadeFormulasHora = FormaFarmaceuticaGeralModel.quantidadeFormulasHora;
        if (FormaFarmaceuticaGeralModel.descricaoRotulo) { formaFarmaceuticaModel.descricaoRotulo = FormaFarmaceuticaGeralModel.descricaoRotulo.trim() }
        formaFarmaceuticaModel.quantidadeQspMinimo = FormaFarmaceuticaGeralModel.quantidadeQspMinimo;
        formaFarmaceuticaModel.produtoVeiculoId = FormaFarmaceuticaGeralModel.produtoVeiculoId;
        formaFarmaceuticaModel.grupoVeiculoId = FormaFarmaceuticaGeralModel.grupoVeiculoId;
        formaFarmaceuticaModel.ativaPesagemMonitorada = FormaFarmaceuticaGeralModel.ativaPesagemMonitorada;
        formaFarmaceuticaModel.calcularDensidade = FormaFarmaceuticaGeralModel.calcularDensidade;
        formaFarmaceuticaModel.valorMinimo = FormaFarmaceuticaValoresModel.valorMinimo;
        formaFarmaceuticaModel.custoAdicional = FormaFarmaceuticaValoresModel.custoAdicional;
        formaFarmaceuticaModel.ncmId = FormaFarmaceuticaValoresModel.ncmId;
        if (FormaFarmaceuticaGeralModel.codigoLaboratorioLp) { formaFarmaceuticaModel.codigoLaboratorioLp = FormaFarmaceuticaGeralModel.codigoLaboratorioLp.trim() }
        formaFarmaceuticaModel.codigoFuncionarioManipulacao = FormaFarmaceuticaGeralModel.codigoFuncionarioManipulacao;
        formaFarmaceuticaModel.codigoFormaReceituario = FormaFarmaceuticaGeralModel.codigoFormaReceituario;
        formaFarmaceuticaModel.codigoFilialProducao = FormaFarmaceuticaGeralModel.codigoFilialProducao;
        formaFarmaceuticaModel.aliquotaIva = FormaFarmaceuticaGeralModel.aliquotaIva;
        formaFarmaceuticaModel.imagem = "";
        formaFarmaceuticaModel.imagemByte = "";
        formaFarmaceuticaModel.formaFarmaceuticaMargens = FormaFarmaceuticaValoresModel.formaFarmaceuticaMargens.filter(x => x.margem > 0 && x.valorFinal > 0
            && x.valorInicial > 0 && x.valorFinal >= x.valorInicial);
        formaFarmaceuticaModel.formaFarmaceuticaEnsaios = FormaFarmaceuticaEnsaiosModel.filter(x => x.descricao.trim().length > 0)
        if (typeof FormaFarmaceuticaImagemModel.imagem == "string") {
            let index = FormaFarmaceuticaImagemModel.imagem.indexOf(',') + 1;
            formaFarmaceuticaModel.imagem = FormaFarmaceuticaImagemModel.imagem.slice(index);
        }
        const resp = await postFormAll("EditarFormaFarmaceutica", formaFarmaceuticaModel);

        if (resp.status == 200) {

            if (FormaFarmaceuticaEnsaiosModelExcluir.length > 0) {
                const response = await postFormAll("ExcluirListaFormaFarmaceuticaEnsaio", FormaFarmaceuticaEnsaiosModelExcluir);
            }

            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/formafarmaceutica");
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
            <HeaderMainContent title="EDITAR FORMA FARMACÊUTICA" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">

                <TabsPage Childrens={arrayTab} TabsQtd={itemsHandlesFormaFarmaceutica.length} titles={itemsHandlesFormaFarmaceutica} />

                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="formafarmaceutica" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} textCustom="Forma Farmacêutica editada com " />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    )
}