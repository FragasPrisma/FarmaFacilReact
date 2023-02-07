import { CustomInput } from "../../../Components/Inputs/CustomInput"
import { Container } from "../styles"
import { useState, ChangeEvent, useEffect } from "react"
import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown"
import { getAll } from "../../../Services/Api"
import { RadioCustom } from "../../../Components/Inputs/RadioCustom"
import { IConvenioGeral } from '../../../Interfaces/Convenio/IConvenioGeral'

interface IData {
    erroNome: string
}

export let ConvenioGeralModel: IConvenioGeral = {
    id: 0,
    nome: "",
    desconto: 0,
    acrescimo: 0,
    manifesto: 0,
    diaRecebimento: 0,
    endereco: "",
    cep: "",
    complemento: "",
    numeroEndereco: "",
    bairroId: 0,
    cidadeId: 0,
    estadoId: 0,
    identificadorConvenio: 0,
    ddd: "",
    telefone: "",
    cadastroFarmacia: "",
    codigoPerdigao: "",
    cnpj: "",
    diasPrimeiroVencimento: 0,
    ie: ""
}

export function ConvenioCreateGeral({ erroNome }: IData) {

    const [nome, setNome] = useState("");
    const [desconto, setDesconto] = useState(0);
    const [acrescimo, setAcrescimo] = useState(0);
    const [manifesto, setManifesto] = useState(0);
    const [diaRecebimento, setDiaRecebimento] = useState(0);
    const [cep, setCep] = useState("");
    const [numeroEndereco, setNumeroEndereco] = useState("");
    const [endereco, setEndereco] = useState("");
    const [complemento, setComplemento] = useState("");
    const [estadoId, setEstadoId] = useState(null);
    const [cidadeId, setCidadeId] = useState(null);
    const [bairroId, setBairroId] = useState(null);
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [bairros, setBairros] = useState([]);
    const [identificadorConvenio, setIdentificadorConvenio] = useState(0);
    const [ddd, setDdd] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cadastroFarmacia, setCadastroFarmacia] = useState("");
    const [codigoPerdigao, setCodigoPerdigao] = useState("");
    const [diasPrimeiroVencimento, setDiasPrimeiroVencimento] = useState(0);
    const [cnpj, setCnpj] = useState("");
    const [ie, setIe] = useState("");

    ConvenioGeralModel.id = 0;
    ConvenioGeralModel.nome = nome;
    ConvenioGeralModel.desconto = desconto;
    ConvenioGeralModel.acrescimo = acrescimo;
    ConvenioGeralModel.manifesto = manifesto;
    ConvenioGeralModel.diaRecebimento = diaRecebimento;
    ConvenioGeralModel.endereco = endereco;
    ConvenioGeralModel.cep = cep;
    ConvenioGeralModel.complemento = complemento;
    ConvenioGeralModel.numeroEndereco = numeroEndereco;
    ConvenioGeralModel.bairroId = bairroId;
    ConvenioGeralModel.cidadeId = cidadeId;
    ConvenioGeralModel.estadoId = estadoId;
    ConvenioGeralModel.identificadorConvenio = identificadorConvenio;
    ConvenioGeralModel.ddd = ddd;
    ConvenioGeralModel.telefone = telefone;
    ConvenioGeralModel.cadastroFarmacia = cadastroFarmacia;
    ConvenioGeralModel.codigoPerdigao = codigoPerdigao;
    ConvenioGeralModel.cnpj = cnpj;
    ConvenioGeralModel.diasPrimeiroVencimento = diaRecebimento;
    ConvenioGeralModel.ie = ie;

    useEffect(() => {
        const loadDataBairro = async () => {
            const response = await getAll("ListaBairro");
            setBairros(response.data);
        }
        const loadDataEstado = async () => {
            const response = await getAll("ListaEstado");
            setEstados(response.data);
        }
        const loadDataCidade = async () => {
            const response = await getAll("ListaCidade");
            setCidades(response.data);
        }

        loadDataCidade()
        loadDataEstado()
        loadDataBairro()
    }, []);

    return (
        <Container>
            <div className="row">
                <div className="col-8">
                    <CustomInput
                        label="Nome"
                        type="text"
                        placeholder="Digite o nome"
                        value={nome}
                        erro={erroNome}
                        maxLength={50}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNome(e.target.value)
                        }
                        required={true}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="Desconto (%)"
                        type="number"
                        placeholder="Digite o desconto"
                        value={desconto}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setDesconto(parseFloat(e.target.value))
                        }
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Acréscimo (%)"
                        type="number"
                        placeholder="Digite o acréscimo"
                        value={acrescimo}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setAcrescimo(parseFloat(e.target.value))
                        }
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Manifesto (%)"
                        type="number"
                        placeholder="Digite o manifesto"
                        value={manifesto}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setManifesto(parseFloat(e.target.value))
                        }
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Dia Recebimento"
                        type="number"
                        placeholder="Digite o dia recebimento"
                        value={diaRecebimento}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setDiaRecebimento(parseInt(e.target.value))
                        }
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="CEP"
                        type="text"
                        placeholder="Digite o cep"
                        value={cep}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setCep(e.target.value)
                        }
                    />
                </div>
                <div className="col-6">
                    <CustomInput
                        label="Endereço"
                        type="text"
                        placeholder="Digite o endereço"
                        value={endereco}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEndereco(e.target.value)
                        }
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="Número"
                        type="text"
                        placeholder="Digite o número"
                        value={numeroEndereco}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNumeroEndereco(e.target.value)
                        }
                    />
                </div>
                <div className="col-6">
                    <CustomInput
                        label="Complemento"
                        type="text"
                        placeholder="Digite o complemento"
                        value={complemento}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setComplemento(e.target.value)
                        }
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-2">
                    <CustomDropDown
                        data={estados}
                        title="Selecione o Estado"
                        filter="sigla"
                        label="Estado"
                        Select={(estadoId) => setEstadoId(estadoId)} />
                </div>
                <div className="col-4">
                    <CustomDropDown
                        data={cidades}
                        title="Selecione a Cidade"
                        filter="nome"
                        label="Cidade"
                        Select={(cidadeId) => setCidadeId(cidadeId)} />
                </div>
                <div className="col-2">
                    <CustomDropDown
                        data={bairros}
                        title="Selecione o Bairro"
                        filter="nome"
                        label="Bairro"
                        Select={(bairroId) => setBairroId(bairroId)} />
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <RadioCustom
                        name="convenio"
                        options={["Outros", "Pertech", "Tekla", "Celos", "Perdigão", "Brandili"]}
                        value={identificadorConvenio}
                        titleComponet="Indentificador Convênio"
                        onClickOptions={(check) => setIdentificadorConvenio(check)}
                    />
                </div>
                <div className="col-4 mt-4">
                    <div className="row">
                        {identificadorConvenio == 4 &&

                            <CustomInput
                                label="Código Perdigão"
                                type="text"
                                placeholder="Digite o código perdigão"
                                value={codigoPerdigao}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCodigoPerdigao(e.target.value)
                                }
                            />
                        }
                        <CustomInput
                            label="DDD"
                            type="text"
                            placeholder="(99)"
                            value={ddd}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setDdd(e.target.value)
                            }
                        />
                        <CustomInput
                            label="Telefone"
                            type="text"
                            placeholder="9999-9999"
                            value={telefone}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setTelefone(e.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-2">
                    <CustomInput
                        label="Cad. Farmácia"
                        type="text"
                        placeholder="Digite o cad. Farmácia"
                        value={cadastroFarmacia}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setCadastroFarmacia(e.target.value)
                        }
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Dias Primeiro Vcto"
                        type="number"
                        placeholder="Digite o Vcto"
                        value={diasPrimeiroVencimento}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setDiasPrimeiroVencimento(parseInt(e.target.value))
                        }
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="CNPJ"
                        type="text"
                        placeholder="Digite o CNPJ"
                        value={cnpj}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setCnpj(e.target.value)
                        }
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Inscrição Estadual"
                        type="text"
                        placeholder="Digite a IE"
                        value={ie}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setIe(e.target.value)
                        }
                    />
                </div>
            </div>

        </Container>
    )
}