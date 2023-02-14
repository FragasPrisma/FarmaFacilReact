import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { getAll, GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { IContasAPagar } from "../../Interfaces/ContasAPagar/IContasAPagar";
import { IDuplicatasContasAPagar } from "../../Interfaces/DuplicatasContasAPagar/IDuplicatasContasAPagar";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { IPlanoDeconta } from "../../Interfaces/PlanoDeContas/IPlanoDeConta";
import { IPortador } from "../../Interfaces/Portador/IPortador";
import { IBanco } from "../../Interfaces/Banco/IBanco";
import { InvertDateJSON } from "../../helper/InvertDateJSON";

export function ContasAPagarEdit() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [numeroFaturaDuplicata, setNumeroFaturaDuplicata] = useState("");
    const [planoDeContaId, setPlanoDeContaId] = useState(null);
    const [bancoId, setBancoId] = useState(null);
    const [portadorId, setPortadorId] = useState(null);
    const [planoDeContas, setPlanoDeContas] = useState([] as IPlanoDeconta[]);
    const [portadores, setPortadores] = useState([] as IPortador[])
    const [bancos, setBancos] = useState([] as IBanco[]);
    const [duplicata, setDuplicata] = useState({} as IDuplicatasContasAPagar)
    const [nomeFornecedor, setNomeFornecedor] = useState("")
    const [nomePlanoDeContas, setNomePlanoDeContas] = useState("")
    const [nomePortador, setNomePortador] = useState("")
    const [nomeBanco, setNomeBanco] = useState("");
    const [observacaoDuplicata, setObservacaoDuplicata] = useState("");
    const [vencimentoDuplicata, setVencimentoDuplicata] = useState("");
    const [valorDuplicata, setValorDuplicata] = useState(0)

    const [erroValor, setErroValor] = useState("")
    const [erroData, setErroData] = useState("")
    const [index, setIndex] = useState(0);

    const [contasAPagarModel, setContasAPagarModel] = useState({} as IContasAPagar)

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {
        const loadDataPlanoDeContas = async () => {
            const response = await getAll("ListaPlanoDeContas");
            setPlanoDeContas(response.data.filter((x: { nivelConta: number }) => x.nivelConta == 2));
        }
        const loadDatapostador = async () => {
            const response = await getAll("ListaPortador");
            setPortadores(response.data);
        }
        const loadDataBanco = async () => {
            const response = await getAll("ListaBanco");
            setBancos(response.data);
        }
        async function Init() {

            const response = await GetId("RetornaContasAPagarPorIdDuplicata", idParams);

            if (response.data.fornecedor) {
                setNomeFornecedor(response.data.fornecedor.nomeFornecedor)
            }
            if (response.data.duplicatasContasAPagar && id) {
                response.data.duplicatasContasAPagar.map((x: IDuplicatasContasAPagar,index:number) => {
                    if (x.id == parseInt(id)) {
                        setIndex(index)
                        setDuplicata(x)
                        setNumeroFaturaDuplicata(x.numeroFatura)
                        setObservacaoDuplicata(x.observacao)
                        setVencimentoDuplicata(x.dataVencimento.slice(0, 10))
                        setValorDuplicata(x.valor)
                    }
                })
            }
            if (response.data.planoDeContas) {
                setNomePlanoDeContas(response.data.planoDeContas.descricao)
                setPlanoDeContaId(response.data.planoDeContas.id)
                response.data.planoDeContas = null;
            }
            if (response.data.portador) {
                setNomePortador(response.data.portador.nome)
                setPortadorId(response.data.portador.id)
                response.data.portador = null;
            }
            if (response.data.banco) {
                setNomeBanco(response.data.banco.nome)
                setBancoId(response.data.banco.id)
                response.data.banco = null;
            }

            setContasAPagarModel(response.data)
        }

        Init();
        loadDataBanco();
        loadDatapostador();
        loadDataPlanoDeContas();
    }, []);

    async function submit() {

        setIsLoading(true);
        setErroValor("");
        setErroData("")

        if(valorDuplicata <= 0){
            setIsLoading(false);
            setErroValor("Valor inválido !")
            return;
        }

        let data = parseInt(vencimentoDuplicata.replaceAll("-",""));
        let dataAtual = new Date().toLocaleDateString();
        let dataAtualInt = parseInt(InvertDateJSON(dataAtual).replaceAll("-",""));
        
        if(data < dataAtualInt){
            setErroData("Data de vencimento inválida !")
            setIsLoading(false);
            return;
        }

        
        duplicata.valor = valorDuplicata;
        duplicata.dataVencimento = vencimentoDuplicata;
        duplicata.observacao = observacaoDuplicata;

        contasAPagarModel.duplicatasContasAPagar.splice(index,1)
        contasAPagarModel.duplicatasContasAPagar.push(duplicata)

        contasAPagarModel.portadorId = portadorId;
        contasAPagarModel.planoDeContasId = planoDeContaId;
        contasAPagarModel.bancoId = bancoId;

        const resp = await postFormAll("EditarContasAPagar", contasAPagarModel);

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
            <HeaderMainContent title="Editar Duplicata" IncludeButton={false} ReturnButton={false} />
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
                                    value={numeroFaturaDuplicata}
                                    readonly={true}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CustomDropDown
                                    data={planoDeContas}
                                    title={nomePlanoDeContas ? nomePlanoDeContas : "Selecione o plano de contas"}
                                    filter="descricao"
                                    label="Plano de Contas"
                                    Select={(idPlano) => setPlanoDeContaId(idPlano)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CustomDropDown
                                    data={portadores}
                                    title={nomePortador ? nomePortador : "Selecione o portador"}
                                    filter="nome"
                                    label="Portador"
                                    Select={(idPortador) => setPortadorId(idPortador)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CustomDropDown
                                    data={bancos}
                                    title={nomeBanco ? nomeBanco : "Selecione o banco"}
                                    filter="nome"
                                    label="Banco"
                                    Select={(idBanco) => setBancoId(idBanco)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CustomInput
                                    label="Observação"
                                    type="text"
                                    placeholder="Digite a observação"
                                    value={observacaoDuplicata}
                                    maxLength={50}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setObservacaoDuplicata(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-3">
                                <CustomInput
                                    label="Vencimento"
                                    type="date"
                                    value={vencimentoDuplicata}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setVencimentoDuplicata(e.target.value)
                                    }
                                    erro={erroData}
                                    required={true}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="Valor (R$)"
                                    type="number"
                                    value={valorDuplicata}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setValorDuplicata(parseFloat(e.target.value))
                                    }
                                    erro={erroValor}
                                    required={true}
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
                <SuccessModal show={isOpenSuccess} textCustom="Registro editado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
