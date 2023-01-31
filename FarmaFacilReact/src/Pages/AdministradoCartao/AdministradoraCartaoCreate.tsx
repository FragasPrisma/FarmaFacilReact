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
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";

export function AdministradoraCartaoCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [prazoDeRecebimento, setPrazoDeRecebimento] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [gerenciador, setGerenciador] = useState(-1);
    const [cieloPremia, setCieloPremia] = useState(-1);
    const [modalidade, setmodalidade] = useState(0);
    const [ativo, setAtivo] = useState(false);
    const [fornecedorId, setFornecedorId] = useState();
    const [planoDeContaId, setPlanoDeConta] = useState();
    const [erroNome, setErroNome] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [erro,setErro] = useState("");

    const [fornecedores, setFornecedores] = useState([]);
    const [planoDeContas, setPlanoDeContas] = useState([]);

    useEffect(() => {
        const loadDataFornecedor = async () => {
            const response = await getAll("ListaFornecedor");
            setFornecedores(response.data);
        }
        loadDataFornecedor()
    }, []);

    useEffect(() => {
        const loadDataPlanoDeContas = async () => {
            const response = await getAll("ListaPlanoDeContas");
            setPlanoDeContas(response.data);
        }
        loadDataPlanoDeContas()
    }, []);
    
    const data = {
        id: 0,
        nome: nome,
        prazoRecebimento: prazoDeRecebimento,
        desconto: desconto,
        gerenciador: gerenciador,
        cieloPremia: cieloPremia,
        modalidade: modalidade,
        ativo: ativo,
        fornecedorId: fornecedorId,
        planoDeContaId: planoDeContaId
    };

    async function submit() {

        setErroNome("")
        setIsLoading(true);

        if (!nome.trim()) {
            setErroNome("Campo nome é obrigatório !")
            setIsLoading(false);
            return;
        }

        if(gerenciador < 0){
            setErro("Gerenciador TEF é obrigatório !")
            setIsLoading(false);
            return;
        }

        if(modalidade < 0){
            setErro("Modalidade é obrigatório !")
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("AdicionarAdministradoraCartao", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/administradoradecartao");
            }, 2000)
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroNome(resp.request.response)
            }, 2000)
        }
    }

    return (
        <>
            <HeaderMainContent title="ADICIONAR ADMINISTRADORA DE CARTÃO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Nome"
                                type="text"
                                placeholder="Digite o nome"
                                value={nome}
                                maxLength={50}
                                erro={erroNome}
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
                                label="Recebimento (Dias)"
                                type="number"
                                placeholder="Digite o recebimento"
                                value={prazoDeRecebimento}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setPrazoDeRecebimento(parseInt(e.target.value))
                                }
                                required={false}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Desconto Administradora (%)"
                                type="number"
                                placeholder="Digite o desconto"
                                value={desconto}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDesconto(parseFloat(e.target.value))
                                }
                                required={false}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-5">
                            <RadioCustom
                                options={["Visa/Master/Amex",
                                    "BanriCompras",
                                    "ConvCard",
                                    "EDMCard",
                                    "HiperCard",
                                    "Integracao4S"]}
                                name="gerenciador"
                                onClickOptions={(value, label) => setGerenciador(value)}
                                titleComponet="Gerenciador TEF"
                                value={gerenciador}
                            />
                        </div>
                        <div className="col-5">
                            {gerenciador == 0 &&
                                <RadioCustom
                                    titleComponet="Cielo Premia"
                                    options={["Troco",
                                        "Desconto",
                                        "ViasDiferenciadas",
                                        "CupomReduzido"]}
                                    name="cieloPremia"
                                    onClickOptions={(value, label) => setCieloPremia(value)}
                                    value={cieloPremia}
                                />
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <RadioCustom
                                options={["Débito",
                                    "Crédito"]}
                                name="modalidade"
                                onClickOptions={(value, label) => setmodalidade(value)}
                                titleComponet="Modadilade"
                                value={modalidade}
                            />
                        </div>
                        <div className="col-2 mt-4">
                            <CheckboxCustom
                                options={["Administradora Ativa"]}
                                check={ativo}
                                onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setAtivo(e.target.checked)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-5">
                            <CustomDropDown data={fornecedores} title="Selecione o Fornecedor" filter="nomeFornecedor" label="Fornecedor" Select={(Id) => setFornecedorId(Id)} />
                        </div>
                        <div className="col-5">
                            <CustomDropDown data={planoDeContas} title="Selecione o Plano de Conta" filter="descricao" label="PLano de Contas" Select={(Id) => setPlanoDeConta(Id)} />
                        </div>
                    </div>
                    <p className="text-danger">{erro}</p>
                </Container>
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="administradoradecartao" />
                    </div>
                </div>
                <SuccessModal show={isOpenSuccess} textCustom="Administrado de Cartão adiciona com "/>
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
