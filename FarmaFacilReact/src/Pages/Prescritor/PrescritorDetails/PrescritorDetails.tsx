import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../../Services/Api";
import { useParams } from "react-router-dom";
import TabsPage from "../../../Components/Tabs";
import { itemsHandlesFornecedor } from "../../../Enum/itensFornecedor";
import { PrescritorDetailsGeral } from "./PrescritorDetailsGeral";
import { PrescritorDetailsComplemento } from "./PrescritorDetailsComplemento";
import { PrescritorGeral } from "../PrescritorGeral";
import { PrescritorComplemento } from "../PrescritorComplemento";

export function PrescritorDetails() {

    const [nomeEstado, setNomeEstado] = useState("");
    const [nomeCidade, setNomeCidade] = useState("");
    const [nomeBairro, setNomeBairro] = useState("");
    const [nomeVisitador, setNomeVisitador] = useState("");

    const [idPrescritor, setId] = useState(0)

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaPrescritorPorId", idParams);
            if (response.status == 200) {

                setId(response.data.id)
                PrescritorGeral.id = response.data.id;
                PrescritorGeral.nome = response.data.nome;
                PrescritorGeral.cep = response.data.cep;
                if (response.data.data_Nascimento) PrescritorGeral.data_Nascimento = response.data.data_Nascimento.slice(0, 10);
                PrescritorGeral.endereco = response.data.endereco;
                PrescritorGeral.numero = response.data.numero;
                PrescritorGeral.complemento = response.data.complemento;
                PrescritorGeral.cpfCnpj = response.data.cpfCnpj;
                PrescritorGeral.ddd = response.data.ddd;
                PrescritorGeral.dddCelular = response.data.dddCelular;
                PrescritorGeral.telefone = response.data.telefone;
                PrescritorGeral.celular = response.data.celular;
                PrescritorGeral.ativo = response.data.ativo;
                PrescritorGeral.bairroId = response.data.bairroId;
                PrescritorGeral.cidadeId = response.data.cidadeId;
                PrescritorGeral.estadoId = response.data.estadoId;
                PrescritorGeral.genero = response.data.genero;
                PrescritorGeral.crmNumero = response.data.crmNumero;
                PrescritorGeral.crmEstado = response.data.crmEstado;
                PrescritorGeral.crmTipo = response.data.crmTipo;
                PrescritorGeral.tipoCr = response.data.tipoCr;
                PrescritorGeral.especialidadePrescritores = response.data.especialidadePrescritores;
                PrescritorComplemento.email = response.data.email;
                PrescritorComplemento.secretaria = response.data.secretaria;
                PrescritorComplemento.nomeRotulo = response.data.nomeRotulo;
                PrescritorComplemento.aniversario = response.data.aniversario;
                PrescritorComplemento.enderecoRes = response.data.enderecoRes;
                PrescritorComplemento.numeroRes = response.data.numeroRes;
                PrescritorComplemento.cepRes = response.data.cepRes;
                PrescritorComplemento.dddRes = response.data.dddRes;
                PrescritorComplemento.telefoneRes = response.data.telefoneRes;
                PrescritorComplemento.proximidade = response.data.proximidade;
                PrescritorComplemento.visitadorId = response.data.visitadoId;
                PrescritorComplemento.observacaoVenda = response.data.observacaoVenda;
                PrescritorComplemento.cedh = response.data.cedh;
                PrescritorComplemento.registroMapa = response.data.registroMapa;

                if (response.data.estado) {
                    setNomeEstado(response.data.estado.sigla)
                }
                if (response.data.cidade) {
                    setNomeCidade(response.data.cidade.nome)
                }
                if (response.data.bairro) {
                    setNomeBairro(response.data.bairro.nome)
                }
                if (response.data.visitador) {
                    setNomeVisitador(response.data.visitador.nome)
                }

            }
        }

        Init()
    }, [])

    let arrayTab: any = [];
    const titles = itemsHandlesFornecedor;

    {
        idPrescritor > 0 &&

        arrayTab.unshift(
            <PrescritorDetailsGeral
                PrescritorGeralModel={PrescritorGeral}
                nomes={{ nomeBairro: nomeBairro, nomeCidade: nomeCidade, nomeEstado: nomeEstado }}
            />
        );

        arrayTab.push(
            <PrescritorDetailsComplemento
                PrescritorComplemento={PrescritorComplemento}
                NomeVisitador={nomeVisitador}
            />
        );
    }

    return (
        <>
            <HeaderMainContent title="DETALHES PRESCRITOR" IncludeButton={false} ReturnButton={true} to="prescritor" />
            <div className="form-group">

                {PrescritorGeral.id > 0 &&
                    <TabsPage Childrens={arrayTab} TabsQtd={titles.length} titles={titles} />
                }
            </div>
        </>
    );
}