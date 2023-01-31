import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { postFormAll, getAll } from "../../../Services/Api";
import { useNavigate } from "react-router-dom";
import { Container } from "../styles";
import TabsPage from "../../../Components/Tabs";
import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import { FailModal } from "../../../Components/Modals/FailModal";
import { itemsHandlesFornecedor } from "../../../Enum/itensFornecedor";
import { PrescritorCreateGeral, PrescritorGeral } from "./PrescritorCreateGeral";
import { PrescritorComplemento, PrescritorCreateComplemento } from "./PrescritorCreateComplemento";

export function PrescritorCreate() {

    var geral = PrescritorGeral;
    var complemento = PrescritorComplemento;

    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);

    const [frete, setFrete] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [bancoId, setBancoId] = useState();
    const [planoDeContaId, setPlanoDeContaId] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [homePage, setHomePage] = useState("");
    const [bancos, setBancos] = useState([]);
    const [contas, setContas] = useState([]);

    const [errorRequest, setErrorRequest] = useState("");

    useEffect(() => {
        const loadDataBancos = async () => {
            const response = await getAll("ListaBanco");
            setBancos(response.data);
        }

        loadDataBancos()
    }, []);

    useEffect(() => {
        const loadDataContas = async () => {
            const response = await getAll("ListaPlanoDeContas");
            setContas(response.data);
        }

        loadDataContas()
    }, []);

    let data = {
        id: 0,
        bairroId: 0,
        cidadeId: 0,
        estadoId: 0,
        nome: "",
        cep: "",
        data_Nascimento: "",
        endereco: "",
        numero: "",
        complemento: "",
        cpfCnpj: "",
        ddd: "",
        dddCelular: "",
        telefone: "",
        celular: "",
        secretaria: "",
        nomeRotulo: "",
        ativo: true,
        genero: 0,
        tipoCr: 0,
        crmNumero: "",
        crmEstado: "",
        crmTipo: "",
        email: "",
        aniversario: "",
        enderecoRes: "",
        numeroRes: "",
        cepRes: "",
        dddRes: "",
        telefoneRes: "",
        proximidade: "",
        visitadorId: 0,
        observacaoVenda: "",
        cedh: true,
        registroMapa: "",
        especialidadePrescritores: []
    };

    let arrayTab: any = [];
    const titles = itemsHandlesFornecedor;

    arrayTab.unshift(
        PrescritorCreateGeral()
    );
    arrayTab.push(

        PrescritorCreateComplemento()

    );

    async function submit() {

        const resp = await postFormAll("AdicionarPrescritor", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/prescritor");
            }, 2000)
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErrorRequest(resp.request.response)
            }, 2000)
        }
    }

    return (
        <>
            <HeaderMainContent title="ADICIONAR PRESCRITOR" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">

                <TabsPage Childrens={arrayTab} TabsQtd={titles.length} titles={titles} />

                {errorRequest && <p className="text-danger">{errorRequest}</p>}
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="prescritor" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} textCustom="Médico adicionado com " />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    );
}