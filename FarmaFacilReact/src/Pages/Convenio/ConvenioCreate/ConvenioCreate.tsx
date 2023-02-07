import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { useState } from "react";
import { postFormAll } from "../../../Services/Api";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import { FailModal } from "../../../Components/Modals/FailModal";
import TabsPage from "../../../Components/Others/Tabs";
import { IConvenio } from "../../../Interfaces/Convenio/IConvenio";
import { itemsHandlesConvenio } from "../../../Enum/itensConvenio";
import { ConvenioCreateGeral, ConvenioGeralModel } from "./ConvenioCreateGeral";
import { ConvenioComplementoModel, ConvenioCreateComplemento } from "./ConvenioCreateComplemento";

export function ConvenioCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [erro, setErro] = useState("")
    const [convenio] = useState({} as IConvenio)
    const navigate = useNavigate();

    let arrayTab: any = [];

    arrayTab.push(<ConvenioCreateGeral erroNome={erro} />)
    arrayTab.push(<ConvenioCreateComplemento />)

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
        convenio.bairroId = ConvenioGeralModel.bairroId;
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

        const resp = await postFormAll("AdicionarConvenio", convenio);

        if (resp.status == 200) {
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
            <HeaderMainContent title="ADICIONAR CONVÊNIO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">

                <TabsPage Childrens={arrayTab} TabsQtd={itemsHandlesConvenio.length} titles={itemsHandlesConvenio} />

                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="convenio" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} textCustom="Convênio adicionado com " />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    );
}
