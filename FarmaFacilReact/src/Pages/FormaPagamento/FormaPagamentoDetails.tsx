import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";

export function FormaPagamentoDetails() {

    const [descricao, setDescricao] = useState("");
    const [tipoPagamento, setTipoPagamento] = useState(0);
    const [autorizarDescontos, setAutorizarDescontos] = useState(0);
    const [conciliacao, setConciliacao] = useState(false);

    const [descricaoPLanoDeContas, setDescricaoPLanoDeContas] = useState("");

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaFormaDePagamentoPorId", idParams);

            setDescricao(response.data.descricao);
            setTipoPagamento(response.data.tipoPagamento)
            setAutorizarDescontos(response.data.autorizarDescontos)
            setConciliacao(response.data.conciliacao)

            if (response.data.planoDeConta) {
                setDescricaoPLanoDeContas(response.data.planoDeConta.descricao)
            }
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES FORMA DE PAGAMENTO" IncludeButton={false} ReturnButton={true} to="formadepagamento" />
            <div className="form-group">

                <Container>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                value={descricao}
                                readonly={true}
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
                                readonly={true}
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
                                readonly={true}
                                onClickOptions={(value, label) => setAutorizarDescontos(value)}
                                value={autorizarDescontos}
                            />
                            <div className="col-12 mt-4">
                                <CheckboxCustom
                                    options={["Conciliação"]}
                                    check={conciliacao}
                                    readOnly={true}
                                />
                                <div className="col-12">
                                    <CustomInput
                                        label="Plano de Contas"
                                        type="text"
                                        value={descricaoPLanoDeContas}
                                        readonly={true}
                                        required={true}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </Container>

            </div>
        </>
    );
}
