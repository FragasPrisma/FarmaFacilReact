import { useNavigate } from "react-router-dom";
import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { FailModal } from "../../../Components/Modals/FailModal";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import { useState } from "react"
import TabsPage from "../../../Components/Tabs";
import { itemsHandlesFormaFarmaceutica } from "../../../Enum/itensFormaFarmaceutica";
import { IFormaFarmaceutica } from "../IFormaFarmaceutica";
import { IFormaFarmaceuticaMargens } from "../IFormaFarmaceuticaMargens";
import { IFormaFarmaceuticaEnsaios } from "../IFormaFarmaceuticaEnsaios";
import { postFormAll } from "../../../Services/Api";
import { FormaFarmaceuticaCreateGeral, FormaFarmaceuticaGeralModel } from "./FormaFarmaceuticaCreateGeral";
import { FormaFarmaceuticaCreateEnsaios, FormaFarmaceuticaEnsaiosModel } from "./FormaFarmaceuticaCreateEnsaios";
import { FormaFarmaceuticaCreateValores, FormaFarmaceuticaValoresModel } from "./FormaFarmaceuticaCreateValores";
import { FormaFarmaceuticaCreateImagem, FormaFarmaceuticaImagemModel } from "./FormaFarmaceuticaCreateImagem";

export function FormaFarmaceuticaCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [erroNome, setErroNome] = useState("")
    const navigate = useNavigate();

    let data: IFormaFarmaceutica = {
        id: 0,
        descricao: "",
        inativo: false,
        tipo: 0,
        selecionaQuantidadeSugerida: false,
        multiplicaComposicao: false,
        homeopatiaLiquida: false,
        deduzirQuantidadeVeiculo: false,
        calculoEmbalagemForma: 0,
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
        valorMinimo: 0,
        custoAdicional: 0,
        ncmId: null,
        codigoLaboratorioLp: "",
        codigoFuncionarioManipulacao: 0,
        codigoFormaReceituario: 0,
        codigoFilialProducao: 0,
        aliquotaIva: 0,
        imagem: "",
        imagemByte: "",
        formaFarmaceuticaMargens: [] as IFormaFarmaceuticaMargens[],
        formaFarmaceuticaEnsaios: [] as IFormaFarmaceuticaEnsaios[]
    }

    let arrayTab: any = [];

    arrayTab.push(<FormaFarmaceuticaCreateGeral erros={erroNome} />)
    arrayTab.push(<FormaFarmaceuticaCreateEnsaios />)
    arrayTab.push(<FormaFarmaceuticaCreateValores />)
    arrayTab.push(<FormaFarmaceuticaCreateImagem />)

    async function submit() {

        setIsLoading(true);
        setErroNome("");

        if (!FormaFarmaceuticaGeralModel.descricao.trim()) {
            setIsLoading(false);
            setErroNome("Campo descrição é obrigatório !");
            return
        }

        data.id = FormaFarmaceuticaGeralModel.id;
        data.descricao = FormaFarmaceuticaGeralModel.descricao.trim();
        data.inativo = FormaFarmaceuticaGeralModel.inativo;
        data.tipo = FormaFarmaceuticaGeralModel.tipo;
        data.selecionaQuantidadeSugerida = FormaFarmaceuticaGeralModel.selecionaQuantidadeSugerida;
        data.multiplicaComposicao = FormaFarmaceuticaGeralModel.multiplicaComposicao;
        data.homeopatiaLiquida = FormaFarmaceuticaGeralModel.homeopatiaLiquida;
        data.deduzirQuantidadeVeiculo = FormaFarmaceuticaGeralModel.deduzirQuantidadeVeiculo;
        data.calculoEmbalagemForma = FormaFarmaceuticaGeralModel.calculoEmbalagemForma;
        data.converteVolumeEmbalagem = FormaFarmaceuticaGeralModel.converteVolumeEmbalagem;
        data.uso = FormaFarmaceuticaGeralModel.uso.trim();
        data.tipoUso = FormaFarmaceuticaGeralModel.tipoUso;
        data.popForma = FormaFarmaceuticaGeralModel.popForma.trim();
        data.imprimirCamposAnalise = FormaFarmaceuticaGeralModel.imprimirCamposAnalise;
        data.selecionarVolumeAutomatico = FormaFarmaceuticaGeralModel.selecionarVolumeAutomatico;
        data.validade = FormaFarmaceuticaGeralModel.validade;
        data.mlGotas = FormaFarmaceuticaGeralModel.mlGotas;
        data.imprimirUnidadeMedidaNoRotulo = FormaFarmaceuticaGeralModel.imprimirUnidadeMedidaNoRotulo;
        data.fatorPerdaProduto = FormaFarmaceuticaGeralModel.fatorPerdaProduto;
        data.ativaFatorPerdaQsp = FormaFarmaceuticaGeralModel.ativaFatorPerdaQsp;
        data.manipuladorId = FormaFarmaceuticaGeralModel.manipuladorId;
        data.quantidadeFormulasHora = FormaFarmaceuticaGeralModel.quantidadeFormulasHora;
        data.descricaoRotulo = FormaFarmaceuticaGeralModel.descricaoRotulo.trim();
        data.quantidadeQspMinimo = FormaFarmaceuticaGeralModel.quantidadeQspMinimo;
        data.produtoVeiculoId = FormaFarmaceuticaGeralModel.produtoVeiculoId;
        data.grupoVeiculoId = FormaFarmaceuticaGeralModel.grupoVeiculoId;
        data.ativaPesagemMonitorada = FormaFarmaceuticaGeralModel.ativaPesagemMonitorada;
        data.calcularDensidade = FormaFarmaceuticaGeralModel.calcularDensidade;
        data.valorMinimo = FormaFarmaceuticaValoresModel.valorMinimo;
        data.custoAdicional = FormaFarmaceuticaValoresModel.custoAdicional;
        data.ncmId = FormaFarmaceuticaValoresModel.ncmId;
        data.codigoLaboratorioLp = FormaFarmaceuticaGeralModel.codigoLaboratorioLp.trim();
        data.codigoFuncionarioManipulacao = FormaFarmaceuticaGeralModel.codigoFuncionarioManipulacao;
        data.codigoFormaReceituario = FormaFarmaceuticaGeralModel.codigoFormaReceituario;
        data.codigoFilialProducao = FormaFarmaceuticaGeralModel.codigoFilialProducao;
        data.aliquotaIva = FormaFarmaceuticaGeralModel.aliquotaIva;
        data.imagem = FormaFarmaceuticaImagemModel.imagem;
        data.imagemByte = "";
        data.formaFarmaceuticaMargens = FormaFarmaceuticaValoresModel.formaFarmaceuticaMargens.filter(x => x.margem > 0 && x.valorFinal > 0 && x.valorInicial > 0);
        data.formaFarmaceuticaEnsaios = FormaFarmaceuticaEnsaiosModel.filter(x => x.descricao.trim().length > 0)

        const resp = await postFormAll("AdicionarFormaFarmaceutica", data);

        if (resp.status == 200) {
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
            <HeaderMainContent title="ADICIONAR FORMA FARMACÊUTICA" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">

                <TabsPage Childrens={arrayTab} TabsQtd={itemsHandlesFormaFarmaceutica.length} titles={itemsHandlesFormaFarmaceutica} />

                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="formafarmaceutica" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} textCustom="Forma Farmacêutica adicionada com " />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    )
}