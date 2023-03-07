import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { IContasAPagar } from "../../Interfaces/ContasAPagar/IContasAPagar";
import { IDuplicatasContasAPagar } from "../../Interfaces/DuplicatasContasAPagar/IDuplicatasContasAPagar";
import { InverterDate } from "../../helper/InverterDate";

export function ContasAPagarDetails() {

    const [duplicata, setDuplicata] = useState({} as IDuplicatasContasAPagar)
    const [nomeFornecedor, setNomeFornecedor] = useState("")
    const [nomePlanoDeContas, setNomePlanoDeContas] = useState("")
    const [nomePortador, setNomePortador] = useState("")
    const [nomeBanco, setNomeBanco] = useState("");


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
                response.data.duplicatasContasAPagar.map((x: IDuplicatasContasAPagar) => {
                    if (x.id == parseInt(id)) {
                        setDuplicata(x)
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

    return (
        <>
            <HeaderMainContent title="Visualizar Duplicata" IncludeButton={false} ReturnButton={true} to="contasapagar" />
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
                                    textAlign={true}
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
                                    value={duplicata.observacao}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label="Vencimento"
                                    type="texte"
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
                                    textAlign={true}
                                />
                            </div>
                        </div>
                        {duplicata.valorPago > 0 && duplicata.dataPagamento &&
                            <div className="row">
                                <div className="col-3">
                                    <CustomInput
                                        label="Data de Pagamento"
                                        type="text"
                                        value={InverterDate(duplicata.dataPagamento)}
                                        required={true}
                                        readonly={true}
                                    />
                                </div>
                                <div className="col-3">
                                    <CustomInput
                                        label="Valor Pago (R$)"
                                        type="text"
                                        value={duplicata.valorPago}
                                        required={true}
                                        readonly={true}
                                        textAlign={true}
                                    />
                                </div>
                            </div>

                        }
                    </Container>
                }
            </div>
        </>
    );
}
