import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { getAll, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { IContabilista } from "../../Interfaces/Contabilista/IContabilista";
import { IBairro } from "../../Interfaces/Bairro/IBairro";
import { ICidade } from "../../Interfaces/Cidade/ICidade";
import { IEstado } from "../../Interfaces/Estado/IEstado";

export function ContabilistaCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();

    const [bairroId, setBairroId] = useState(null);
    const [cidadeId, setCidadeId] = useState(null);
    const [estadoId, setEstadoId] = useState(null);

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [crc, setCrc] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [telefone, setTelefone] = useState("");
    const [fax, setFax] = useState("");
    const [email, setEmail] = useState("");
    const [complemento, setComplemento] = useState("");

    const [error, setErros] = useState({ erro: true, index: 0, erroNome: "" })

    const [isLoading, setIsLoading] = useState(false);

    const [estados, setEstados] = useState([] as IEstado[]);
    const [cidades, setCidades] = useState([] as ICidade[]);
    const [bairros, setBairros] = useState([] as IBairro[]);

    useEffect(() => {
        const loadDataBairro = async () => {
            const response = await getAll("ListaBairro");
            setBairros(response.data);
        }
        const loadDataCidade = async () => {
            const response = await getAll("ListaCidade");
            setCidades(response.data);
        }
        const loadDataEstado = async () => {
            const response = await getAll("ListaEstado");
            setEstados(response.data);
        }

        loadDataEstado()
        loadDataCidade()
        loadDataBairro()
    }, []);

    function ValidString(texto: string, index: number) {
        if (!texto.trim()) {
            setErros({ erro: true, index: index, erroNome: "Campo obrigatório !", })
            return false;
        } else {
            return true;
        }
    }

    const data: IContabilista = {
        id: 0,
        bairroId: bairroId,
        cidadeId: cidadeId,
        estadoId: estadoId,
        nome: nome,
        cnpj: cnpj,
        cpf: cpf,
        crc: crc,
        endereco: endereco,
        numero: numero,
        complemento: complemento,
        cep: cep,
        telefone: telefone,
        fax: fax,
        email: email
    };

    async function submit() {

        setErros({ erro: false, erroNome: "", index: 0 })
        setIsLoading(true);

        if(!ValidString(nome,1)
            || !ValidString(cnpj,2)
            || !ValidString(cpf,3)
            || !ValidString(crc,4)
        ){
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("AdicionarContabilista", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/contabilista");
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
            <HeaderMainContent title="ADICIONAR CONTABILISTA" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-9">
                            <CustomInput
                                label="Nome"
                                type="text"
                                placeholder="Digite o nome"
                                value={nome}
                                maxLength={100}
                                erros={error}
                                index={1}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setNome(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="CNPJ"
                                type="text"
                                placeholder="Digite o CNPJ"
                                value={cnpj}
                                erros={error}
                                index={2}
                                maxLength={14}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCnpj(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="CPF"
                                type="text"
                                placeholder="Digite o CPF"
                                value={cpf}
                                erros={error}
                                index={3}
                                maxLength={11}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCpf(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="CRC"
                                type="text"
                                placeholder="Digite o CRC"
                                value={crc}
                                erros={error}
                                index={4}
                                maxLength={15}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCrc(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="CEP"
                                type="text"
                                placeholder="Digite o CEP"
                                value={cep}
                                maxLength={8}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCep(e.target.value)
                                }
                                required={false}
                            />
                        </div>
                        <div className="col-6">
                            <CustomInput
                                label="Endereço"
                                type="text"
                                placeholder="Digite o Endereço"
                                value={endereco}
                                maxLength={60}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setEndereco(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Número"
                                type="text"
                                placeholder="Digite o número"
                                value={numero}
                                maxLength={10}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setNumero(e.target.value)
                                }
                                required={false}
                            />
                        </div>
                        <div className="col-6">
                            <CustomInput
                                label="Complemento"
                                type="text"
                                placeholder="Digite o complemento"
                                value={complemento}
                                maxLength={100}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setComplemento(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            <CustomDropDown
                                data={estados}
                                title="Selecione o Estado"
                                filter="sigla"
                                label="Estado"
                                Select={(estadoId) =>
                                    setEstadoId(estadoId)} />
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
                        <div className="col-9">
                            <CustomInput
                                label="E-mail"
                                type="email"
                                placeholder="Digite o e-mail"
                                value={email}
                                maxLength={60}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setEmail(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <CustomInput
                                label="Fax"
                                type="text"
                                placeholder="Digite o fax"
                                value={fax}
                                maxLength={10}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setFax(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-4">
                            <CustomInput
                                label="Telefone"
                                type="text"
                                placeholder="Digite o telefone"
                                value={telefone}
                                maxLength={20}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setTelefone(e.target.value)
                                }
                            />
                        </div>
                    </div>

                </Container>
                <div className="row mt-3">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="contabilista" />
                    </div>
                </div>
                <SuccessModal show={isOpenSuccess} textCustom="Contabilista adicionado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
