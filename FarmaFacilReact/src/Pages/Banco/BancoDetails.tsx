import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";

export function BancoDetails() {
    const [nomeBanco, setNomeBanco] = useState("");
    const [codigoBanco, setCodigoBanco] = useState("");
    const [carteira, setCarteira] = useState("");
    const [modalidade, setModalidade] = useState("");
    const [formaCobranca, setFormaCobranca] = useState("");
    const [layout, setLayout] = useState("");
    const [sequenciaRemessa, setSequenciaRemessa] = useState(0);
    const [nomeCedente, setNomeCedente] = useState("");
    const [cnpjCedente, setCnpjCedente] = useState("");
    const [codigoCedente, setCodigoCedente] = useState("");
    const [codigoTransmissao, setCodigoTransmissao] = useState("");
    const [complementoTransmissao, setComplementoTransmissao] = useState("");
    const [agencia, setAgencia] = useState("");
    const [agenciaDigito, setAgenciaDigito] = useState("");
    const [diasProtesto, setDiasProtesto] = useState(0);
    const [juros, setJuros] = useState(0);
    const [multa, setMulta] = useState(0);
    const [contaCorrente, setContaCorrente] = useState("");
    const [contaCorrenteDigito, setContaCorrenteDigito] = useState("");
    const [convenio, setConvenio] = useState("");
    const [producao, setProducao] = useState(false);
    const [localPagamento, setLocalPagamento] = useState("");
    const [mensagemInstrucao1, setMensagemInstrucao1] = useState("");
    const [mensagemInstrucao2, setMensagemInstrucao2] = useState("");
    const [mensagemInstrucao3, setMensagemInstrucao3] = useState("");
    const [mensagemInstrucao4, setMensagemInstrucao4] = useState("");
    const [mensagemInstrucao5, setMensagemInstrucao5] = useState("");
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString()

    useEffect(() => {
        if (formaCobranca == "B") {
            setFormaCobranca("B - Boleto")
        } else if (formaCobranca == "D") {
            setFormaCobranca("D - Desconto Escritural") 
        }
    }, [formaCobranca])

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaBancoPorId", idParams);
            if (response.status == 200) {
                setNomeBanco(response.data.nome);
                setCodigoBanco(response.data.codigoBanco);
                setCarteira(response.data.carteira);
                setModalidade(response.data.modalidade);
                setFormaCobranca(response.data.formaCobranca);
                setLayout(response.data.layout);
                setSequenciaRemessa(response.data.sequenciaRemessa);
                setNomeCedente(response.data.nomeCedente);
                setCnpjCedente(response.data.cnpjCedente);
                setCodigoCedente(response.data.codigoCedente);
                setCodigoTransmissao(response.data.codigoTransmissao);
                setComplementoTransmissao(response.data.complementoTransmissao);
                setAgencia(response.data.agencia);
                setAgenciaDigito(response.data.agenciaDigito);
                setDiasProtesto(response.data.diasProtesto);
                setJuros(response.data.juros);
                setMulta(response.data.multa);
                setContaCorrente(response.data.contaCorrente);
                setContaCorrenteDigito(response.data.contaCorrenteDigito);
                setConvenio(response.data.convenio);
                setProducao(response.data.producao);
                setLocalPagamento(response.data.localPagamento);
                setMensagemInstrucao1(response.data.mensagemInstrucao1);
                setMensagemInstrucao2(response.data.mensagemInstrucao2);
                setMensagemInstrucao3(response.data.mensagemInstrucao3);
                setMensagemInstrucao4(response.data.mensagemInstrucao4);
                setMensagemInstrucao5(response.data.mensagemInstrucao5);
            }
        }

        Init()
    }, [])


    return (
        <>
            <HeaderMainContent title="DETALHES BANCO" IncludeButton={false} ReturnButton={true} to="banco"/>
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-4">
                            <CustomInput
                                label="Nome"
                                type="text"
                                value={nomeBanco}
                                required={true}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="CodigoBanco"
                                type="text"
                                value={codigoBanco}
                                required={true}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Carteira"
                                type="text"
                                value={carteira}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Modalidade"
                                type="text"
                                value={modalidade}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Forma Cobrança"
                                type="text"
                                value={formaCobranca}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Layout"
                                type="text"
                                value={layout}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Sequência de Remessa"
                                type="number"
                                value={sequenciaRemessa}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Nome Cedente"
                                type="text"
                                value={nomeCedente}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Cnpj Cedente"
                                type="text"
                                value={cnpjCedente}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Código do Cedente"
                                type="text"
                                value={codigoCedente}
                                readonly={true}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Código Transmissão"
                                type="text"
                                value={codigoTransmissao}
                                readonly={true}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Complemento Transmissão"
                                type="text"
                                value={complementoTransmissao}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Agência"
                                type="text"
                                value={agencia}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Digito da Agencia"
                                type="text"
                                value={agenciaDigito}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Dias Protesto"
                                type="number"
                                value={diasProtesto}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Juros%"
                                type="number"
                                value={juros}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Multa%"
                                type="number"
                                value={multa}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Conta Corrente"
                                type="text"
                                value={contaCorrente}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Digito Conta Corrente"
                                type="text"
                                value={contaCorrenteDigito}
                                readonly={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Convenio"
                                type="text"
                                value={convenio}
                                readonly={true}
                            />
                        </div>
                        <div className="col-1 mt-3">
                            <CheckboxCustom
                                options={["Produção"]}
                                check={producao}
                                readOnly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <CustomInput
                                label="Local Pagamento"
                                type="text"
                                value={localPagamento}
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
                                        value={mensagemInstrucao1}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <CustomInput
                                        label="Mensagem de Instrucao 2"
                                        type="text"
                                        value={mensagemInstrucao2}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <CustomInput
                                        label="Mensagem de Instrucao 3"
                                        type="text"
                                        value={mensagemInstrucao3}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <CustomInput
                                        label="Mensagem de Instrucao 4"
                                        type="text"
                                        value={mensagemInstrucao4}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <CustomInput
                                        label="Mensagem de Instrucao 5"
                                        type="text"
                                        value={mensagemInstrucao5}
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