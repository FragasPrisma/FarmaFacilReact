import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect, ChangeEvent } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { IContasAPagar } from "../../Interfaces/ContasAPagar/IContasAPagar";
import { IDuplicatasContasAPagar } from "../../Interfaces/DuplicatasContasAPagar/IDuplicatasContasAPagar";
import { InverterDate } from "../../helper/InverterDate";
import { FailModal } from "../../Components/Modals/FailModal";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";

export function ContasAPagarPagar() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [duplicata, setDuplicata] = useState({} as IDuplicatasContasAPagar)
    const [nomeFornecedor, setNomeFornecedor] = useState("")
    const [nomePlanoDeContas, setNomePlanoDeContas] = useState("")
    const [nomePortador, setNomePortador] = useState("")
    const [nomeBanco, setNomeBanco] = useState("");
    const [dataPagamento, setDataPagamento] = useState("");
    const [valorPago, setValorPago] = useState(0);
    const [observacao, setObservacao] = useState("")

    const [erroValor, setErroValor] = useState("")
    const [erroData, setErroData] = useState("")

    const [contasAPagarModel, setContasAPagarModel] = useState({} as IContasAPagar)

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {

            const response = await GetId("RetornaContasAPagarPorIdDuplicata", idParams);

            if (response.data.fornecedor) {
                setNomeFornecedor(response.data.fornecedor.nomeFornecedor)
            }
            if (response.data.duplicatasContasAPagar && id) {
                response.data.duplicatasContasAPagar.map((x: IDuplicatasContasAPagar, index: number) => {
                    if (x.id == parseInt(id)) {
                        setDuplicata(x)
                        setObservacao(x.observacao)
                    }
                })
            }
            if (response.data.planoDeContas) {
                setNomePlanoDeContas(response.data.planoDeContas.descricao)
                response.data.planoDeContas = null;
            }
            if (response.data.portador) {
                setNomePortador(response.data.portador.nome)
                response.data.portador = null;
            }
            if (response.data.banco) {
                setNomeBanco(response.data.banco.nome)
                response.data.banco = null;
            }

            setContasAPagarModel(response.data)
        }

        Init();
    }, []);

    async function submit() {

        setIsLoading(true);
        setErroData("");
        setErroValor("");

        if (!dataPagamento) {
            setErroData("Campo de preenchimento obrigatório.")
            setIsLoading(false);
            return;
        }

        if (valorPago <= 0 || !valorPago) {
            setErroValor("Campo de preenchimento obrigatório.")
            setIsLoading(false);
            return;
        }

        duplicata.valorPago = valorPago;
        duplicata.dataPagamento = dataPagamento;
        duplicata.observacao = observacao;

        const resp = await postFormAll("EditarDuplicataContasAPagar", duplicata);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/contasapagar");
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
            <HeaderMainContent title="Pagar Duplicata" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                {contasAPagarModel.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-6">
                                <CustomInput
                                    label="Fornecedor"
                                    type="text"
                                    value={nomeFornecedor}
                                    readonly={true}
                                    required={true}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="Documento"
                                    type="text"
                                    placeholder="Digite o documento"
                                    value={duplicata.numeroFatura}
                                    readonly={true}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CustomInput
                                    label="Plano de Contas"
                                    type="text"
                                    value={nomePlanoDeContas}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CustomInput
                                    label="Portador"
                                    type="text"
                                    value={nomePortador}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CustomInput
                                    label="Banco"
                                    type="text"
                                    value={nomeBanco}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CustomInput
                                    label="Observação"
                                    type="text"
                                    value={observacao}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setObservacao(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label="Vencimento"
                                    type="text"
                                    value={InverterDate(duplicata.dataVencimento)}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="Valor (R$)"
                                    type="number"
                                    value={duplicata.valor}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-3">
                                <CustomInput
                                    label="Data de Pagamento"
                                    type="date"
                                    value={dataPagamento}
                                    required={true}
                                    erro={erroData}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setDataPagamento(e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="Valor Pago (R$)"
                                    type="number"
                                    value={valorPago}
                                    required={true}
                                    erro={erroValor}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setValorPago(parseFloat(e.target.value))
                                    }
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                                <ButtonCancel to="contasapagar" />
                            </div>
                        </div>
                    </Container>
                }
            </div>
            <SuccessModal show={isOpenSuccess} textCustom="Duplicata paga com " />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    );
}
