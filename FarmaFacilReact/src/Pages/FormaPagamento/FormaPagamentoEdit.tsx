import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { getAll, GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";

export function FormaPagamentoEdit() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [idFormaPagamento, setId] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [tipoPagamento, setTipoPagamento] = useState(0);
    const [autorizarDescontos, setAutorizarDescontos] = useState(0);
    const [conciliacao, setConciliacao] = useState(false);
    const [planoDeContaId, setPlanoDeContaId] = useState();

    const [erroDescricao, setErroDescricao] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [planoDeContas, setPlanoDeContas] = useState([]);
    const [descricaoPLanoDeContas, setDescricaoPLanoDeContas] = useState("");

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaFormaDePagamentoPorId", idParams);

            setId(response.data.id);
            setDescricao(response.data.descricao);
            setTipoPagamento(response.data.tipoPagamento)
            setAutorizarDescontos(response.data.autorizarDescontos)
            setConciliacao(response.data.conciliacao)

            if (response.data.planoDeConta) {
                setDescricaoPLanoDeContas(response.data.planoDeConta.descricao)
                setPlanoDeContaId(response.data.planoDeConta.id)
            }
        }

        Init()
    }, [])

    useEffect(() => {
        const loadDataPlanoDeContas = async () => {
            const response = await getAll("ListaPlanoDeContas");
            setPlanoDeContas(response.data);
        }
        loadDataPlanoDeContas()
    }, []);

    const data = {
        id: idFormaPagamento,
        descricao: descricao,
        tipoPagamento: tipoPagamento,
        autorizarDescontos: autorizarDescontos,
        conciliacao: conciliacao,
        planoDeContaId: planoDeContaId
    };

    async function submit() {

        setErroDescricao("")
        setIsLoading(true);

        if (!descricao.trim()) {
            setErroDescricao("Campo descrição é obrigatório !")
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("EditarFormaPagamento", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/formadepagamento");
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
            <HeaderMainContent title="EDITAR FORMA DE PAGAMENTO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                {idFormaPagamento > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-5">
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
                            <div className="col-5">
                                <RadioCustom
                                    options={["Moeda",
                                        "Cheque",
                                        "Cartão",
                                        "Prazo - Ficha",
                                        "Convênio",
                                        "Prazo Parcelamento",
                                        "Convênio Parcelamento",
                                        "Boleto",
                                        "Depósito",
                                        "PIX",
                                        "Transferência Bancária",
                                        "Programa de Fidelidade",
                                        "CashBack"
                                    ]}
                                    name="tipo"
                                    onClickOptions={(value, label) => setTipoPagamento(value)}
                                    titleComponet="Tipo"
                                    value={tipoPagamento}
                                />
                            </div>
                            <div className="col-5">

                                <RadioCustom
                                    titleComponet="Descontos(Promoção e Venda)"
                                    options={["Autorizado",
                                        "Autorizado Através de Senha",
                                        "Não Autorizado"]}
                                    name="descontos"
                                    onClickOptions={(value, label) => setAutorizarDescontos(value)}
                                    value={autorizarDescontos}
                                />
                                <div className="col-12 mt-4">
                                    <CheckboxCustom
                                        options={["Conciliação"]}
                                        check={conciliacao}
                                        onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setConciliacao(e.target.checked)}
                                    />
                                    <div className="col-12">
                                        {descricaoPLanoDeContas ?
                                            <CustomDropDown data={planoDeContas} title={descricaoPLanoDeContas} filter="descricao" label="PLano de Contas" Select={(Id) => setPlanoDeContaId(Id)} />
                                            :
                                            <CustomDropDown data={planoDeContas} title="Selecione o Plano de Conta" filter="descricao" label="PLano de Contas" Select={(Id) => setPlanoDeContaId(Id)} />
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Container>
                }
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="formadepagamento" />
                    </div>
                </div>
                <SuccessModal show={isOpenSuccess} />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
