import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId, postFormAll } from "../../../Services/Api";
import { useNavigate, useParams } from "react-router-dom";
import TabsPage from "../../../Components/Tabs";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import { FailModal } from "../../../Components/Modals/FailModal";
import { itemsHandlesFornecedor } from "../../../Enum/itensFornecedor";
import { PrescritorEditGeral , EspecialidadesExcluir, EspecialidadesAdd } from "./PrescritorEditGeral";
import { PrescritorEditComplemento } from "./PrescritorEditComplemento";
import { PrescritorGeral } from "../PrescritorGeral";
import { prescritor } from "../Prescritor";
import { PrescritorComplemento } from "../PrescritorComplemento";

export function PrescritorEdit() {

    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [nomeEstado, setNomeEstado] = useState("");
    const [nomeCidade, setNomeCidade] = useState("");
    const [nomeBairro, setNomeBairro] = useState("");
    const [nomeVisitador, setNomeVisitador] = useState("");

    const [idPrescritor, setId] = useState(0)

    const [error, setErros] = useState({ erro: true, index: 0, erroNome: "" })

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    let especialidadesExcluir = EspecialidadesExcluir;
    let especialidadesAdd = EspecialidadesAdd;

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
            <PrescritorEditGeral
                error={error}
                PrescritorGeralModel={PrescritorGeral}
                nomes={{ nomeBairro: nomeBairro, nomeCidade: nomeCidade, nomeEstado: nomeEstado }}
            />
        );

        arrayTab.push(
            <PrescritorEditComplemento
                PrescritorComplemento={PrescritorComplemento}
                NomeVisitador={nomeVisitador}
            />
        );
    }


    async function submit() {

        if (!PrescritorGeral.data_Nascimento) { PrescritorGeral.data_Nascimento = null }

        if (!ValidString(PrescritorGeral.nome, 1)
            || (PrescritorGeral.tipoCr == 3 && !ValidString(PrescritorGeral.crmTipo, 3)
                || !ValidString(PrescritorGeral.crmEstado, 4)
                || !ValidString(PrescritorGeral.crmNumero, 5))
        ) {
            setIsLoading(false);
            return;
        }

        if (!ValidNumber(PrescritorGeral.tipoCr, 1)) {
            setIsLoading(false);
            return;
        }

        prescritor.id = PrescritorGeral.id
        prescritor.bairroId = PrescritorGeral.bairroId
        prescritor.cidadeId = PrescritorGeral.cidadeId
        prescritor.estadoId = PrescritorGeral.estadoId
        prescritor.nome = PrescritorGeral.nome
        prescritor.cep = PrescritorGeral.cep
        prescritor.data_Nascimento = PrescritorGeral.data_Nascimento
        prescritor.endereco = PrescritorGeral.endereco
        prescritor.numero = PrescritorGeral.numero
        prescritor.complemento = PrescritorGeral.complemento
        prescritor.cpfCnpj = PrescritorGeral.cpfCnpj
        prescritor.ddd = PrescritorGeral.ddd
        prescritor.dddCelular = PrescritorGeral.dddCelular
        prescritor.telefone = PrescritorGeral.telefone
        prescritor.celular = PrescritorGeral.celular
        prescritor.ativo = PrescritorGeral.ativo
        prescritor.genero = PrescritorGeral.genero
        prescritor.tipoCr = PrescritorGeral.tipoCr
        prescritor.crmNumero = PrescritorGeral.crmNumero
        prescritor.crmEstado = PrescritorGeral.crmEstado
        prescritor.crmTipo = PrescritorGeral.crmTipo
        prescritor.email = PrescritorComplemento.email
        prescritor.secretaria = PrescritorComplemento.secretaria
        prescritor.nomeRotulo = PrescritorComplemento.nomeRotulo
        prescritor.aniversario = PrescritorComplemento.aniversario
        prescritor.enderecoRes = PrescritorComplemento.enderecoRes
        prescritor.numeroRes = PrescritorComplemento.numeroRes
        prescritor.cepRes = PrescritorComplemento.cepRes
        prescritor.dddRes = PrescritorComplemento.dddRes
        prescritor.telefoneRes = PrescritorComplemento.telefoneRes
        prescritor.proximidade = PrescritorComplemento.proximidade
        prescritor.visitadorId = PrescritorComplemento.visitadorId
        prescritor.observacaoVenda = PrescritorComplemento.observacaoVenda
        prescritor.cedh = PrescritorComplemento.cedh
        prescritor.registroMapa = PrescritorComplemento.registroMapa
        prescritor.especialidadePrescritores = PrescritorGeral.especialidadePrescritores

        const resp = await postFormAll("EditarPrescritor", prescritor);

        if (resp.status == 200) {

            especialidadesExcluir.map(async (item) => {
                const resp = await postFormAll("ExcluirEspecialidadePrescritor", item);
            })

            especialidadesAdd.map(async (item) => {
                const resp = await postFormAll("AdicionarEspecialidadePrescritor", item);
            })

            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/prescritor");
            }, 2000)
            
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000)
        }
    }

    function ValidString(texto: string, index: number) {
        if (!texto.trim()) {
            setErros({ erro: true, index: index, erroNome: "Campo obrigatório !", })
            return false;
        } else {
            return true;
        }
    }

    function ValidNumber(numero: number, index: number) {
        if (numero < 0) {
            setErros({ erro: true, index: index, erroNome: "Campo Tipo CR obrigatório !", })
            return false;
        } else {
            return true;
        }
    }

    return (
        <>
            <HeaderMainContent title="EDITAR PRESCRITOR" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">

                {PrescritorGeral.id > 0 &&
                    <TabsPage Childrens={arrayTab} TabsQtd={titles.length} titles={titles} />
                }
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="prescritor" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} textCustom="Prescritor editado com " />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    );
}