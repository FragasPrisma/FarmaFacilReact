import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../../Services/Api";
import { useParams } from "react-router-dom";
import { Container } from "../styles";
import TabsPage from "../../../Components/Others/Tabs";
import { itemsHandlesFornecedor } from "../../../Enum/itensFornecedor";
import { IFornecedor } from "../../../Interfaces/Fornecedor/IFornecedor";
import { FornecedorDetailsGeral } from "./FornecedorDetailsGeral";
import { FornecedorDetailsComplemento } from "./FornecedorDetailsComplemento";

export function FornecedorDetails() {

    const { id } = useParams();
    const [fornecedorModel, setFornecedorModel] = useState({} as IFornecedor)
    const [dataEstado, setDataEstado] = useState("");
    const [dataCidade, setDataCidade] = useState("");
    const [dataBairro, setDataBairro] = useState("");
    const [dataPlanoConta, setDataPlanoConta] = useState("");
    const [dataBanco, setDataBanco] = useState("");

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        const loadData = async () => {
            const response = await GetId("RetornaFornecedorPorId", idParams);

            setFornecedorModel(response.data)

            setDataEstado(response.data.estado.sigla)
            if (response.data.cidade != null) {
                setDataCidade(response.data.cidade.nome)
            }
            if (response.data.bairro != null) {
                setDataBairro(response.data.bairro.nome)
            }
            if (response.data.planoDeConta != null) {
                setDataPlanoConta(response.data.planoDeConta.descricao)
            }
            if (response.data.banco != null) {
                setDataBanco(response.data.banco.nome)
            }
        }

        loadData()
    }, []);

    let arrayTab: any = [];

    const titles = itemsHandlesFornecedor;


    arrayTab.push(
        <FornecedorDetailsGeral fornecedorModel={fornecedorModel} nomeEstado={dataEstado} nomeCidade={dataCidade} nomeBairro={dataBairro} />,
        <FornecedorDetailsComplemento fornecedorModel={fornecedorModel} nomeBanco={dataBanco} nomePLanoDeConta={dataPlanoConta} />
    );

    return (
        <>
            <HeaderMainContent title="DETALHES DO FORNECEDOR" IncludeButton={false} ReturnButton={true} to={"fornecedor"} />
            <div className="form-group">
                {fornecedorModel.id > 0 &&
                    <TabsPage Childrens={arrayTab} TabsQtd={titles.length} titles={titles} />
                }
            </div>
        </>
    );
}