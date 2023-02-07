import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { IBanco } from "../../Interfaces/Banco/IBanco";

export function BancoDetails() {
    
    const [bancoModel, setBancoModel] = useState({} as IBanco);
    
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString()

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaBancoPorId", idParams);
            if (response.status == 200) {
                setBancoModel(response.data);
            }
        }

        Init()
    }, [])


    return (
        <>
            <HeaderMainContent title="DETALHES BANCO" IncludeButton={false} ReturnButton={true} to="banco" />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-4">
                            <CustomInput
                                label="Nome"
                                type="text"
                                value={bancoModel.nome}
                                required={true}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="CodigoBanco"
                                type="text"
                                value={bancoModel.codigoBanco}
                                required={true}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Carteira"
                                type="text"
                                value={bancoModel.carteira}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Modalidade"
                                type="text"
                                value={bancoModel.modalidade}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Forma Cobrança"
                                type="text"
                                value={bancoModel.formaCobranca == "B" ? "B - Boleto" : "D - Desconto Escritural"}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Layout"
                                type="text"
                                value={bancoModel.layout}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Sequência de Remessa"
                                type="number"
                                value={bancoModel.sequenciaRemessa}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Nome Cedente"
                                type="text"
                                value={bancoModel.nomeCedente}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Cnpj Cedente"
                                type="text"
                                value={bancoModel.cnpjCedente}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Código do Cedente"
                                type="text"
                                value={bancoModel.codigoCedente}
                                readonly={true}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Código Transmissão"
                                type="text"
                                value={bancoModel.codigoTransmissao}
                                readonly={true}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Complemento Transmissão"
                                type="text"
                                value={bancoModel.complementoTransmissao}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Agência"
                                type="text"
                                value={bancoModel.agencia}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Digito da Agencia"
                                type="text"
                                value={bancoModel.agenciaDigito}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Dias Protesto"
                                type="number"
                                value={bancoModel.diasProtesto}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Juros%"
                                type="number"
                                value={bancoModel.juros}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Multa%"
                                type="number"
                                value={bancoModel.multa}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Conta Corrente"
                                type="text"
                                value={bancoModel.contaCorrente}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Digito Conta Corrente"
                                type="text"
                                value={bancoModel.contaCorrenteDigito}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Convenio"
                                type="text"
                                value={bancoModel.convenio}
                                readonly={true}
                            />
                        </div>
                        <div className="col-1 mt-3">
                            <CheckboxCustom
                                options={["Produção"]}
                                check={bancoModel.producao}
                                readOnly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <CustomInput
                                label="Local Pagamento"
                                type="text"
                                value={bancoModel.localPagamento}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <FieldsetCustom legend="Mensagens de instrução">
                            <div className="row">
                                <div className="col-8">
                                    <CustomInput
                                        label="Mensagem de Instrucao 1"
                                        type="text"
                                        value={bancoModel.mensagemInstrucao1}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <CustomInput
                                        label="Mensagem de Instrucao 2"
                                        type="text"
                                        value={bancoModel.mensagemInstrucao2}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <CustomInput
                                        label="Mensagem de Instrucao 3"
                                        type="text"
                                        value={bancoModel.mensagemInstrucao3}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <CustomInput
                                        label="Mensagem de Instrucao 4"
                                        type="text"
                                        value={bancoModel.mensagemInstrucao4}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <CustomInput
                                        label="Mensagem de Instrucao 5"
                                        type="text"
                                        value={bancoModel.mensagemInstrucao5}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                        </FieldsetCustom>
                    </div>
                </Container>
            </div>
        </>
    );
}