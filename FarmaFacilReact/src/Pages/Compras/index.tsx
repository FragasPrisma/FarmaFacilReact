import { ChangeEvent, useEffect, useState } from "react";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
//import { CustomDropDownMultiple } from "../../Components/Inputs/CustomDropDownMultiple";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { SelectInput } from "../../Components/Inputs/SelectInput";
import { FailModal } from "../../Components/Modals/FailModal";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { GenericTable } from "../../Components/Others/GenericTable";
import { IBairro } from "../../Interfaces/Bairro/IBairro";
import { IManutencaoCompras } from "../../Interfaces/Compras/IManutencaoCompras";
import { IFornecedor } from "../../Interfaces/Fornecedor/IFornecedor";
import { IGrupo } from "../../Interfaces/Grupo/IGrupo";
import { ILaboratorio } from "../../Interfaces/Laboratorio/ILaboratorio";
import { getAll, postFormAll } from "../../Services/Api";
import { Container } from "./styles";

export function ManutencaoCompras() {
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [tipo, setTipo] = useState("");
    const [tipoDemanda, setTipoDemanda] = useState(0);
    const [vendaDe, setVendaDe] = useState("");
    const [vendaDeHora, setVendaDeHora] = useState("");
    const [vendaAte, setVendaAte] = useState("");
    const [vendaAteHora, setVendaAteHora] = useState("");
    const [curvaAbc, setCurvaAbc] = useState("Geral");
    const [consideraEncomendaFaltas, setConsideraEncomendaFaltas] = useState(true);
    const [tempoDeRep, setTempoDeRep] = useState(0);
    const [quantidadeDias, setQuantidadeDias] = useState(0);
    const [tipoValor, setTipoValor] = useState(0);
    const [aPartirDe, setAPartirDe] = useState("");
    const [fornecedoresIds, setFornecedoresIds] = useState([] as number[]);
    const [saldoQuantidadeComprometida, setSaldoQuantidadeComprometida] = useState(false);
    const [gruposIds, setGruposIds] = useState([] as number[]);
    const [produtoId, setProdutosIds] = useState([] as number[]);
    const [laboratorioId, setLaboratorioId] = useState(0);

    const [readonlyVendaDe, setReadonlyVendaDe] = useState(false);
    const [readonlyVendaDeHora, setReadonlyVendaDeHora] = useState(false);
    const [readonlyVendaAte, setReadonlyVendaAte] = useState(false);
    const [readonlyVendaAteHora, setReadonlyVendaAteHora] = useState(false);
    const [readonlyTempoDeRep, setReadonlyTempoDeRep] = useState(false);
    const [readonlyQuantidadeDias, setReadonlyQuantidadeDias] = useState(false);
    const [readonlyAPartirDe, setReadonlyAPartirDe] = useState(false);

    const [fornecedores, setFornecedores] = useState([] as IFornecedor[]);
    const [laboratorios, setLaboratorios] = useState([] as ILaboratorio[]);
    const [grupos, setGrupos] = useState([] as IGrupo[]);
    //const [produtos, setProdutos] = useState([] as IProduto[]);

    const [bairros, setBairros] = useState([] as IBairro[]);

    const data : IManutencaoCompras = {
        tipo: "",
        tipoDemanda: null,
        vendaDe: "",
        vendaDeHora: "",
        vendaAte: "",
        vendaAteHora: "",
        curvaAbc: "",
        consideraEncomentaFaltas: true,
        tempoDeRep: 0,
        quantidadeDias: 0,
        tipoValor: 0,
        aPartirDe: "",
        saldoQuantidadeComprometida: false,
        laboratorioId: 0,
        fornecedoresIds: [],
        gruposIds: [],
        produtosIds: [],
    }

    console.log("Fornecedores:",fornecedores); // Para verificar os ids existentes
    console.log("Grupos:",grupos); // Para verificar os ids existentes
    //console.log("Produtos:",produtos); // Não temos cadastro ainda

    useEffect(() => {
        const loadDataFornecedores = async () => {
            const response = await getAll("ListaFornecedor");
            setFornecedores(response.data);
        }

        const loadDataLaboratorios = async () => {
            const response = await getAll("ListaLaboratorio");
            setLaboratorios(response.data);
        }

        const loadDataGrupos = async () => {
            const response = await getAll("ListaGrupo");
            setGrupos(response.data);
        }

        // const loadDataProdutos = async () => {
        //     const response = await getAll("ListaProduto");
        //     setProdutos(response.data);
        // }

        loadDataFornecedores();
        loadDataLaboratorios();
        loadDataGrupos();
        //loadDataProdutos();
    }, [])

    useEffect(() => {
        if (tipo == "Venda") {
            setReadonlyVendaDe(false);
            setReadonlyVendaDeHora(false);
            setReadonlyVendaAte(false);
            setReadonlyVendaAteHora(false);
            setReadonlyTempoDeRep(true);
            setReadonlyQuantidadeDias(true);
        } else if (tipo == "Demanda") {
            setReadonlyVendaDe(false);
            setReadonlyVendaDeHora(false);
            setReadonlyVendaAte(false);
            setReadonlyVendaAteHora(false);
            setReadonlyTempoDeRep(false);
            setReadonlyQuantidadeDias(true);
        } else if (tipo == "Estoque Mínimo") {
            setReadonlyVendaDe(true);
            setReadonlyVendaDeHora(false);
            setReadonlyVendaAte(true);
            setReadonlyVendaAteHora(false);
            setReadonlyTempoDeRep(true);
            setReadonlyQuantidadeDias(true);
        } else if (tipo == "Estoque Máximo") {
            setReadonlyVendaDe(true);
            setReadonlyVendaDeHora(true);
            setReadonlyVendaAte(true);
            setReadonlyVendaAteHora(true);
            setReadonlyTempoDeRep(true);
            setReadonlyQuantidadeDias(true);
        } else if (tipo == "Consumo") {
            setReadonlyVendaDe(false);
            setReadonlyVendaDeHora(true);
            setReadonlyVendaAte(false);
            setReadonlyVendaAteHora(true);
            setReadonlyTempoDeRep(true);
            setReadonlyQuantidadeDias(false);
        } else if (tipo == "Encomendas/Faltas"){
            setReadonlyVendaDe(true);
            setReadonlyVendaDeHora(true);
            setReadonlyVendaAte(true);
            setReadonlyVendaAteHora(true);
            setReadonlyTempoDeRep(true);
            setReadonlyQuantidadeDias(true);
        } else {
            setReadonlyVendaDe(false);
            setReadonlyVendaDeHora(false);
            setReadonlyVendaAte(false);
            setReadonlyVendaAteHora(false);
            setReadonlyTempoDeRep(false);
            setReadonlyQuantidadeDias(false);
        }
    }, [tipo])

    useEffect (() => {
        if (tipoValor == 2) {
            setReadonlyAPartirDe(false);
        } else {
            setReadonlyAPartirDe(true);
        }
    }, [tipoValor])

    async function submit() {
        setIsLoading(true);

        data.tipo = tipo;
        data.tipoDemanda = tipo == "Demanda" ? tipoDemanda : null;
        data.vendaDe = readonlyVendaDe == false ? vendaAte : "";
        data.vendaDeHora = readonlyVendaDeHora == false ? vendaDeHora : "";
        data.vendaAte = readonlyVendaAte == false ? vendaAte : "";
        data.vendaAteHora = readonlyVendaAteHora == false ? vendaAteHora : "";
        data.curvaAbc = curvaAbc;
        data.consideraEncomentaFaltas = consideraEncomendaFaltas;
        data.tempoDeRep = readonlyTempoDeRep == false ? tempoDeRep : 0;
        data.quantidadeDias = readonlyQuantidadeDias == false ? quantidadeDias : 0;
        data.tipoValor = tipoValor;
        data.aPartirDe = readonlyAPartirDe == false ? aPartirDe : "";
        data.saldoQuantidadeComprometida = saldoQuantidadeComprometida;
        data.laboratorioId = laboratorioId;
        data.fornecedoresIds = [], //Preencher com dados mocados, ainda não temos componente
        data.gruposIds = [], //Preencher com dados mocados, ainda não temos componente
        data.produtosIds = [] //Preencher com dados mocados, ainda não temos componente

        console.log("Data:", data);

        //const response = await postFormAll("", data);

        const response2 = await getAll("ListaBairro");

        if (response2.status === 200) {
            console.log(response2.data);
            setBairros(response2.data);
            setIsLoading(false);
        }

        // if (response.status === 200) {
        //     setIsLoading(false);
        //     console.log(response.data);
        // } else {
        //     setIsOpenFail(true);
        //     setIsLoading(false);
        //     setTimeout(() => {
        //         setIsOpenFail(false);
        //     }, 2000)
        // }
    }

    return (
        <>
            <HeaderMainContent title="Manutenção de Compras" IncludeButton={false} ReturnButton={false} />
            <Container>
                <div className="row">
                    <div className="col-2 mt-4">
                        <SelectInput 
                            options={["","Venda", "Demanda", "Estoque Mínimo", "Estoque Máximo", "Consumo", "Encomendas/Faltas"]}
                            label="Tipo"
                            Select={(select) => setTipo(select)}
                        />
                    </div>
                    <div className="col-2">
                        { tipo == "Demanda" &&
                            <RadioCustom
                                name="Tipo Demanda"
                                options={["Estoque Mínimo", "Estoque Máximo"]}
                                titleComponet="Tipo Demanda"
                                onClickOptions={(tipoDemanda) => setTipoDemanda(tipoDemanda)}
                                value={tipoDemanda}
                            />
                        }
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Venda de"
                            type="date"
                            value={vendaDe}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setVendaDe(e.target.value)
                            }
                            readonly={readonlyVendaDe}
                        />
                    </div>
                    <div className="col-1 mt-4">
                        <CustomInput
                            label="Hora"
                            type="time"
                            placeholder="00:00"
                            value={vendaDeHora}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setVendaDeHora(e.target.value)
                            }
                            readonly={readonlyVendaDeHora}
                        />
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Venda até"
                            type="date"
                            value={vendaAte}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setVendaAte(e.target.value)
                            }
                            readonly={readonlyVendaAte}
                        />
                    </div>
                    <div className="col-1 mt-4">
                        <CustomInput
                            label="Hora"
                            type="time"
                            placeholder="00:00"
                            value={vendaAteHora}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setVendaAteHora(e.target.value)
                            }
                            readonly={readonlyVendaAteHora}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <SelectInput 
                            options={["Geral", "A", "B", "C"]}
                            label="Curva Abc"
                            Select={(select) => setCurvaAbc(select)}
                        />
                    </div>
                    <div className="col-2 mt-3">
                        <CheckboxCustom
                            options={["Considerar Encomenda/Faltas"]}
                            check={consideraEncomendaFaltas}
                            onClickOptions={(e) => setConsideraEncomendaFaltas(e.target.checked)}
                        />
                    </div>
                    <div className="col-1">
                        <CustomInput 
                            label="Tempo de Rep"
                            type="number"
                            value={tempoDeRep}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setTempoDeRep(parseInt(e.target.value))
                            }
                            readonly={readonlyTempoDeRep}
                        />
                    </div>
                    <div className="col-1">
                        <CustomInput 
                            label="Quantidade de dias"
                            type="number"
                            value={quantidadeDias}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setQuantidadeDias(parseInt(e.target.value))
                            }
                            readonly={readonlyQuantidadeDias}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <RadioCustom
                            name="Tipo Valor"
                            options={["Custo Referência", "Última Compra", "Melhor Compra"]}
                            titleComponet="Tipo Valor"
                            onClickOptions={(tipoValor) => setTipoValor(tipoValor)}
                            value={tipoValor}
                        />
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="A Partir de"
                            type="date"
                            value={aPartirDe}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setAPartirDe(e.target.value)
                            }
                            readonly={readonlyAPartirDe}
                        />
                    </div>
                    <div className="col-2 mt-4">
                        {/* <CustomDropDown
                            data={fornecedores}
                            title="Selecione o Fornecedor"
                            filter="nomeFornecedor"
                            label="Fornecedor"
                            Select={(fornecedorId) => setFornecedorId(fornecedorId)}
                        /> */}
                    </div>
                    <div className="col-3 mt-4">
                        <CheckboxCustom
                            options={["Saldo com Quantidade Comprometida"]}
                            check={saldoQuantidadeComprometida}
                            onClickOptions={(e) => setSaldoQuantidadeComprometida(e.target.checked)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        {/* <CustomDropDown
                            data={grupos}
                            title="Selecione os grupos"
                            filter="descricao"
                            label="Grupos"
                            Select={(grupoId) => setGrupoId(grupoId)}
                        /> */}
                    </div>
                    <div className="col-4">
                        {/* <CustomDropDown
                            data={produtos}
                            title="Selecione os produtos"
                            filter="descricao"
                            label="Produtos"
                            Select={(produtoId) => setProdutoId(produtoId)}
                        /> */}
                    </div>
                    <div className="col-4">
                        {/* <CustomDropDownMultiple
                            data={laboratorios}
                            title=""
                            filter="descricao"
                            label="Laboratório"
                            Select={(laboratorioIds) => setLaboratorioIds(laboratorioIds)}
                        /> */}
                        <CustomDropDown
                            data={laboratorios}
                            title="Selecione os Laboratorios"
                            filter="descricao"
                            label="Laboratório"
                            Select={(laboratorioId) => setLaboratorioId(laboratorioId)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 mt-2">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                    </div>
                </div>
            </Container>
            <div className="row">
                <div className="col-12 mt-4">
                    <FieldsetCustom legend="Itens Compra">
                        <GenericTable
                            deleteButton={false}
                            data={bairros}
                            header={["id", "nome"]}
                        />
                    </FieldsetCustom>
                </div>
            </div>
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    )
}