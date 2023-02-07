import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { IFormaPagamento } from "../../Interfaces/FormaPagamento/IFormaPagamento";

export function FormaPagamentoDetails() {

    const [formaPagamentoModel, setFormaPagamentoModel] = useState({} as IFormaPagamento);

    const [descricaoPLanoDeContas, setDescricaoPLanoDeContas] = useState("");

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {

            const response = await GetId("RetornaFormaDePagamentoPorId", idParams);
            setFormaPagamentoModel(response.data);

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
                                value={formaPagamentoModel.descricao}
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
                                titleComponet="Tipo"
                                value={formaPagamentoModel.tipoPagamento}
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
                                value={formaPagamentoModel.autorizarDescontos}
                            />
                            <div className="col-12 mt-4">
                                <CheckboxCustom
                                    options={["Conciliação"]}
                                    check={formaPagamentoModel.conciliacao}
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
