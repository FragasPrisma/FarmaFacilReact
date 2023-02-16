import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { MultiSelect } from "../../Components/Inputs/MultiSelect";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { SelectInput } from "../../Components/Inputs/SelectInput";
import { FailModal } from "../../Components/Modals/FailModal";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { SetDataMultiSelect } from "../../helper/GerarDataMultiSelect";
import { IManutencaoCompras } from "../../Interfaces/Compras/IManutencaoCompras";
import { IFornecedor } from "../../Interfaces/Fornecedor/IFornecedor";
import { IGrupo } from "../../Interfaces/Grupo/IGrupo";
import { ILaboratorio } from "../../Interfaces/Laboratorio/ILaboratorio";
import { getAll, GetId } from "../../Services/Api";
import { Container } from "./styles";

export function ManutencaoComprasEdit() {
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [filtro, setFiltro] = useState({} as IManutencaoCompras);
    const [data, setData] = useState({} as IManutencaoCompras);

    const [tipo, setTipo] = useState(filtro.tipo);
    const [tipoDemanda, setTipoDemanda] = useState(filtro.tipoDemanda);
    const [vendaDe, setVendaDe] = useState(filtro.vendaDe);
    const [vendaDeHora, setVendaDeHora] = useState(filtro.vendaDeHora);
    const [vendaAte, setVendaAte] = useState(filtro.vendaAte);
    const [vendaAteHora, setVendaAteHora] = useState(filtro.vendaAteHora);
    const [curvaAbc, setCurvaAbc] = useState(filtro.curvaAbc);
    const [consideraEncomendaFaltas, setConsideraEncomendaFaltas] = useState(filtro.consideraEncomendaFaltas);
    const [tempoDeRep, setTempoDeRep] = useState(filtro.tempoDeRep);
    const [quantidadeDias, setQuantidadeDias] = useState(filtro.quantidadeDias);
    const [tipoValor, setTipoValor] = useState(filtro.tipoValor);
    const [aPartirDe, setAPartirDe] = useState(filtro.aPartirDe);
    const [fornecedoresIds, setFornecedoresIds] = useState(filtro.fornecedoresIds);
    const [saldoQuantidadeComprometida, setSaldoQuantidadeComprometida] = useState(filtro.saldoQuantidadeComprometida);
    const [gruposIds, setGruposIds] = useState(filtro.gruposIds);
    const [produtosIds, setProdutosIds] = useState(filtro.produtosIds);
    const [laboratorioId, setLaboratorioId] = useState(filtro.laboratorioId);

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
    //const [produtos, setProdutos] = useState([] as IProduto[])

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaCompraPorId", idParams);

            if (response.status === 200) {
                setFiltro(response.data);
            }
        }

        const loadDataFornecedores = async () => {
            const response = await getAll("ListaFornecedor");
            setFornecedores(SetDataMultiSelect(response.data, "nomeFornecedor"));
        }

        const loadDataLaboratorios = async () => {
            const response = await getAll("ListaLaboratorio");
            setLaboratorios(response.data);
        }

        const loadDataGrupos = async () => {
            const response = await getAll("ListaGrupo");
            setGrupos(SetDataMultiSelect(response.data, "descricao"));
        }

        // const loadDataProdutos = async () => {
        //     const response = await getAll("ListaProduto");
        //     setProdutos(response.data);
        // }
        
        Init();
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
        data.consideraEncomendaFaltas = consideraEncomendaFaltas;
        data.tempoDeRep = readonlyTempoDeRep == false ? tempoDeRep : 0;
        data.quantidadeDias = readonlyQuantidadeDias == false ? quantidadeDias : 0;
        data.tipoValor = tipoValor;
        data.aPartirDe = readonlyAPartirDe == false ? aPartirDe : "";
        data.saldoQuantidadeComprometida = saldoQuantidadeComprometida;
        data.laboratorioId = laboratorioId;
        data.fornecedoresIds = fornecedoresIds;
        data.gruposIds = gruposIds;
        data.produtosIds = [] //Preencher com dados mocados, ainda não temos componente

        console.log("Data:", data);

        //const response = await postFormAll("", data);

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
            <HeaderMainContent title="Editar Manutenção de Compra" IncludeButton={false} ReturnButton={true} to="compras" />
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
                    <div className="col-1 mt-4">
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
                    <div className="col-1 mt-4">
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
                        <SelectInput 
                            options={["Geral", "A", "B", "C"]}
                            label="Curva Abc"
                            Select={(select) => setCurvaAbc(select)}
                        />
                    </div>
                    <div className="col-2">

                    </div>
                    <div className="col-2">
                        <CustomDropDown
                            data={laboratorios}
                            title="Selecione os Laboratorios"
                            filter="descricao"
                            label="Laboratório"
                            Select={(laboratorioId) => setLaboratorioId(laboratorioId)}
                        />
                    </div>
                    <div className="col-2 mt-3">
                        <CheckboxCustom
                            options={["Considerar Encomenda/Faltas"]}
                            check={consideraEncomendaFaltas}
                            onClickOptions={(e) => setConsideraEncomendaFaltas(e.target.checked)}
                        />
                    </div>
                    <div className="col-3 mt-3">
                        <CheckboxCustom
                            options={["Saldo com Quantidade Comprometida"]}
                            check={saldoQuantidadeComprometida}
                            onClickOptions={(e) => setSaldoQuantidadeComprometida(e.target.checked)}
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
                    <div className="col-4 mt-4">
                        <MultiSelect
                            label="Grupos"
                            title="Grupos" 
                            data={grupos}
                            isMultiple={true}
                            Select={(gruposIds) => setGruposIds(gruposIds)}
                            placeholder="Selecione o(s) grupo(s)"
                        />
                    </div>
                    <div className="col-4 mt-4">
                        <MultiSelect 
                            label="Fornecedores"
                            title="Fornecedores" 
                            data={fornecedores}
                            isMultiple={true}
                            Select={(fornecedoresIds) => setFornecedoresIds(fornecedoresIds)}
                            placeholder="Selecione o(s) fornecedor(es)"
                        />
                    </div>
                </div>
                <div className="row">
                    
                    <div className="col-4">
                        {/* <MultiSelect 
                            label="Produtos"
                            title="Produtos"
                            data={produtos}
                            isMultiple={true}
                            Select={(produtosIds) => SetProdutosIds)}
                            placeholder="Selecione o(s) produto(s)"
                        /> */}
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
                        {/* <GenericTable
                            deleteButton={false}
                            data={bairros}
                            header={["id", "nome"]}
                        /> */}
                    </FieldsetCustom>
                </div>
            </div>
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    )
}