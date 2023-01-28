import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useParams,useNavigate } from 'react-router-dom';
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { SelectInput } from "../../Components/Inputs/SelectInput";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";

export function BancoEdit() {
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false);
    const [BancoId, setBancoId] = useState(0);
    const { id } = useParams();
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
    const [erroNomeBanco, setErroNomeBanco] = useState("");
    const [erroCodigoBanco, setErroCodigoBanco] = useState("");

    const [data] = useState({
        id: 0,
        nome: "",
        codigoBanco: "",
        carteira: "",
        modalidade: "",
        formaCobranca: "",
        layout: "",
        sequenciaRemessa: 0,
        nomeCedente: "",
        cnpjCedente: "",
        codigoCedente: "",
        codigoTransmissao: "",
        complementoTransmissao: "",
        agencia: "",
        agenciaDigito: "",
        diasProtesto: 0,
        juros: 0,
        multa: 0,
        contaCorrente: "",
        contaCorrenteDigito: "",
        convenio: "",
        producao: false,
        localPagamento: "",
        mensagemInstrucao1: "",
        mensagemInstrucao2: "",
        mensagemInstrucao3: "",
        mensagemInstrucao4: "",
        mensagemInstrucao5: ""
    });


    let idParams = !id ? "0" : id.toString();

    useEffect(() => {
        async function Init() {
            const response = await GetId("RetornaBancoPorId", idParams);
            if (response.status == 200) {
                setBancoId(response.data.id);
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

    async function submit() {
        setErroNomeBanco("")
        setErroCodigoBanco("")
        setIsLoading(true)

        if (!nomeBanco.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroNomeBanco("Campo nome é obrigatório !")
            }, 2000)
            return;
        }

        if (!codigoBanco.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroCodigoBanco("Campo código banco é obrigatório !")
            }, 2000)
            return;
        }

        data.id = BancoId;
        data.nome = nomeBanco.trim();
        data.codigoBanco = codigoBanco.trim();
        data.carteira = carteira.trim();
        data.modalidade = modalidade.trim();
        data.formaCobranca = formaCobranca.trim();
        data.layout = layout.trim();
        data.sequenciaRemessa = sequenciaRemessa;
        data.nomeCedente = nomeCedente.trim();
        data.cnpjCedente = cnpjCedente.trim();
        data.codigoCedente = codigoCedente.trim();
        data.codigoTransmissao = codigoTransmissao.trim();
        data.complementoTransmissao = complementoTransmissao.trim();
        data.agencia = agencia.trim();
        data.agenciaDigito = agenciaDigito.trim();
        data.diasProtesto = diasProtesto;
        data.juros = juros;
        data.multa = multa;
        data.contaCorrente = contaCorrente.trim();
        data.contaCorrenteDigito = contaCorrenteDigito.trim();
        data.convenio = convenio.trim();
        data.producao = producao;
        data.localPagamento = localPagamento.trim();
        data.mensagemInstrucao1 = mensagemInstrucao1.trim();
        data.mensagemInstrucao2 = mensagemInstrucao2.trim();
        data.mensagemInstrucao3 = mensagemInstrucao3.trim();
        data.mensagemInstrucao4 = mensagemInstrucao4.trim();
        data.mensagemInstrucao5 = mensagemInstrucao5.trim();

        const response = await postFormAll("EditarBanco", data);

        if (response.status === 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/banco");
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
            <HeaderMainContent title="EDITAR BANCO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-4">
                            <CustomInput
                                label="Nome"
                                type="text"
                                placeholder="Digite o nome do banco"
                                value={nomeBanco}
                                maxLength={50}
                                erro={erroNomeBanco}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setNomeBanco(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="CodigoBanco"
                                type="text"
                                placeholder="Digite o código para o banco"
                                value={codigoBanco}
                                erro={erroCodigoBanco}
                                maxLength={3}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCodigoBanco(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Carteira"
                                type="text"
                                placeholder="Digite a carteira do banco"
                                value={carteira}
                                maxLength={10}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCarteira(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Modalidade"
                                type="text"
                                placeholder="Digite a modalidade do banco"
                                value={modalidade}
                                maxLength={5}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setModalidade(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <SelectInput
                                options={["", "B - Boleto", "D - Desconto Escritural"]}
                                label="Forma Cobrança"
                                Select={(select) => setFormaCobranca(select.slice(0, 1))}
                            />
                        </div>
                        <div className="col-2">
                            <SelectInput
                                options={["", "240", "400"]}
                                label="Layout"
                                Select={(select) => setLayout(select)}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Sequência de Remessa"
                                type="number"
                                placeholder="Digite um valor numérico"
                                value={sequenciaRemessa}
                                maxLength={5}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setSequenciaRemessa(parseInt(e.target.value))
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Nome Cedente"
                                type="text"
                                placeholder="Digite o nome do cedente"
                                value={nomeCedente}
                                maxLength={70}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setNomeCedente(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Cnpj Cedente"
                                type="text"
                                placeholder="Digite o cnpj do cedente"
                                value={cnpjCedente}
                                maxLength={14}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCnpjCedente(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Código do Cedente"
                                type="text"
                                placeholder="Digite o código do cedente"
                                value={codigoCedente}
                                maxLength={20}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCodigoCedente(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Código Transmissão"
                                type="text"
                                placeholder="Digite o código da transmissão"
                                value={codigoTransmissao}
                                maxLength={20}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCodigoTransmissao(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Complemento Transmissão"
                                type="text"
                                placeholder="Digite o complemento da transmissão"
                                value={complementoTransmissao}
                                maxLength={10}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setComplementoTransmissao(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Agência"
                                type="text"
                                placeholder="Digite a agência do banco"
                                value={agencia}
                                maxLength={4}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setAgencia(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Digito da Agencia"
                                type="text"
                                placeholder="Digite o digito da agencia"
                                value={agenciaDigito}
                                maxLength={1}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setAgenciaDigito(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Dias Protesto"
                                type="number"
                                placeholder="Digite os dias de protesto"
                                value={diasProtesto}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDiasProtesto(parseInt(e.target.value))
                                }
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Juros%"
                                type="number"
                                placeholder="Digite o valor de juros"
                                value={juros}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setJuros(parseFloat(e.target.value))
                                }
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Multa%"
                                type="number"
                                placeholder="Digite o valor da multa"
                                value={multa}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setMulta(parseFloat(e.target.value))
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Conta Corrente"
                                type="text"
                                placeholder="Digite a conta corrente do banco"
                                maxLength={20}
                                value={contaCorrente}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setContaCorrente(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Digito Conta Corrente"
                                type="text"
                                placeholder="Digite o digito da conta corrente"
                                maxLength={1}
                                value={contaCorrenteDigito}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setContaCorrenteDigito(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Convenio"
                                type="text"
                                placeholder="Digite o convenio do banco"
                                maxLength={10}
                                value={convenio}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setConvenio(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-1 mt-3">
                            <CheckboxCustom
                                options={["Produção"]}
                                check={producao}
                                onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setProducao(e.target.checked)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <CustomInput
                                label="Local Pagamento"
                                type="text"
                                placeholder="Digite o local de pagamento"
                                maxLength={70}
                                value={localPagamento}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setLocalPagamento(e.target.value)
                                }
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
                                        placeholder="Digite a mensagem de instrução"
                                        maxLength={70}
                                        value={mensagemInstrucao1}
                                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setMensagemInstrucao1(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <CustomInput
                                        label="Mensagem de Instrucao 2"
                                        type="text"
                                        placeholder="Digite a mensagem de instrução"
                                        maxLength={70}
                                        value={mensagemInstrucao2}
                                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setMensagemInstrucao2(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <CustomInput
                                        label="Mensagem de Instrucao 3"
                                        type="text"
                                        placeholder="Digite a mensagem de instrução"
                                        maxLength={70}
                                        value={mensagemInstrucao3}
                                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setMensagemInstrucao3(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <CustomInput
                                        label="Mensagem de Instrucao 4"
                                        type="text"
                                        placeholder="Digite a mensagem de instrução"
                                        maxLength={70}
                                        value={mensagemInstrucao4}
                                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setMensagemInstrucao4(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <CustomInput
                                        label="Mensagem de Instrucao 5"
                                        type="text"
                                        placeholder="Digite a mensagem de instrução"
                                        maxLength={70}
                                        value={mensagemInstrucao5}
                                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setMensagemInstrucao5(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </FieldsetCustom>
                    </div>
                    <div className="row">
                        <div className="col-6 mt-2">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="banco" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Dado editado com"/>
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}