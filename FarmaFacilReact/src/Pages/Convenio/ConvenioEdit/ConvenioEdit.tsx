import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId, postFormAll } from "../../../Services/Api";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import { FailModal } from "../../../Components/Modals/FailModal";
import TabsPage from "../../../Components/Tabs";
import { IConvenio } from "../IConvenio";
import { itemsHandlesConvenio } from "../../../Enum/itensConvenio";
import { ConvenioEditGeral, ConvenioGeralModel } from "./ConvenioEditGeral";
import { ConvenioComplementoModel, ConvenioEditComplemento, conveniosGruposModelExcluir } from "./ConvenioEditComplemento";

export function ConvenioEdit() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [erro, setErro] = useState("")
    const [nomeEstado, setNomeEstado] = useState("")
    const [nomeCidade, setNomeCidade] = useState("")
    const [nomeBairro, setNomeBairro] = useState("")
    const [nomeVisitador, setNomeVisitador] = useState("")
    const [idConvenio, setId] = useState(-1)
    const [convenio, setConvenio] = useState({} as IConvenio)
    const navigate = useNavigate();
    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaConvenioPorId", idParams);

            if (response.data.estado) {
                setNomeEstado(response.data.estado.sigla)
                response.data.estado = null
            }
            if (response.data.cidade) {
                setNomeCidade(response.data.cidade.nome)
                response.data.cidade = null
            }
            if (response.data.bairro) {
                setNomeBairro(response.data.bairro.nome)
                response.data.bairro = null
            }
            if (response.data.visitador) {
                setNomeVisitador(response.data.visitador.nome)
                response.data.visitador = null
            }

            setConvenio(response.data)

        }

        Init()
    }, [])

    let arrayTab: any = [];

    {
        convenio.id > 0 &&
            
        arrayTab.push(<ConvenioEditGeral
            erroNome={erro}
            convenioModel={convenio}
            nomeEndereco={{ nomeEstado: nomeEstado, nomeCidade: nomeCidade, nomeBairro: nomeBairro }}
        />)

        arrayTab.push(<ConvenioEditComplemento
            convenioModel={convenio}
            nomeVisitador={nomeVisitador}
        />)
    }


    async function submit() {

        setIsLoading(true);

        convenio.id = ConvenioGeralModel.id;
        convenio.nome = ConvenioGeralModel.nome;
        convenio.desconto = ConvenioGeralModel.desconto;
        convenio.acrescimo = ConvenioGeralModel.acrescimo;
        convenio.manifesto = ConvenioGeralModel.manifesto;
        convenio.diaRecebimento = ConvenioGeralModel.diaRecebimento;
        convenio.endereco = ConvenioGeralModel.endereco;
        convenio.cep = ConvenioGeralModel.cep;
        convenio.complemento = ConvenioGeralModel.complemento;
        convenio.numeroEndereco = ConvenioGeralModel.numeroEndereco;
        convenio.bairroId = ConvenioGeralModel.bairroId == 0 ? null :  ConvenioGeralModel.bairroId;
        convenio.cidadeId = ConvenioGeralModel.cidadeId;
        convenio.estadoId = ConvenioGeralModel.estadoId;
        convenio.identificadorConvenio = ConvenioGeralModel.identificadorConvenio;
        convenio.ddd = ConvenioGeralModel.ddd;
        convenio.telefone = ConvenioGeralModel.telefone;
        convenio.cadastroFarmacia = ConvenioGeralModel.cadastroFarmacia;
        convenio.codigoPerdigao = ConvenioGeralModel.codigoPerdigao;
        convenio.cnpj = ConvenioGeralModel.cnpj;
        convenio.diasPrimeiroVencimento = ConvenioGeralModel.diaRecebimento;
        convenio.ie = ConvenioGeralModel.ie;
        convenio.bloqueado = ConvenioComplementoModel.bloqueado;
        convenio.permitirParcelamento = ConvenioComplementoModel.permitirParcelamento;
        convenio.enviarEcommerce = ConvenioComplementoModel.enviarEcommerce;
        convenio.permitirRateio = ConvenioComplementoModel.permitirRateio;
        convenio.visitadorId = ConvenioComplementoModel.visitadorId;
        convenio.etiquetaId = ConvenioComplementoModel.etiquetaId;
        convenio.enderecoComprovanteVenda = ConvenioComplementoModel.enderecoComprovanteVenda;
        convenio.convenioGrupos = ConvenioComplementoModel.convenioGrupos;

        if (!convenio.nome) {
            setErro("Campo nome é obrigatório !")
            setIsLoading(false);
            return;
        }
        
        const resp = await postFormAll("EditarConvenio", convenio);

        if (resp.status == 200) {

            if(conveniosGruposModelExcluir.length > 0){
                const response = await postFormAll("ExcluirListaConvenioGrupo", conveniosGruposModelExcluir);
            }

            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/convenio");
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
            <HeaderMainContent title="EDITAR CONVÊNIO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                {convenio.id > 0 &&

                    < TabsPage Childrens={arrayTab} TabsQtd={itemsHandlesConvenio.length} titles={itemsHandlesConvenio} />
                }
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="convenio" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} textCustom="Convênio editado com " />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    );
}
