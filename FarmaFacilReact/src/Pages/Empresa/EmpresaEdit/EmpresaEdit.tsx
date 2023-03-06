import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { dataEdit, sigla, TabFarmacia } from "./TabFarmacia";
import "../ArquivoConfig";
import { itemsHandles, itemsHandlesChildrenAcabado, itemsHandlesChildrenGeral, itemsHandlesChildrenManipulacao } from "../../../Enum/ItemsParametro";
import TabsEmpresa from "../../../Components/Others/TabsEmpresa";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import { FailModal } from "../../../Components/Modals/FailModal";
import { LabelObrigatorio } from "../../../Components/Others/LabelMensagemObrigatorio";
import { Farmacia } from "../../../Interfaces/Empresa/IFarmacia";
import { IEmpresa } from "../../../Interfaces/Empresa/IEmpresa";
import { getAll, postFormAll } from "../../../Services/Api";
import { ValidCnpj } from "../../../helper/ValidCnpj";
import { validCPF } from "../../../helper/ValidCpf";
import { ValidIeDigitos } from "../../../helper/ValidIeDigitos";

export function EmpresaEdit() {
    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ erro: true, index: 0, erroNome: "" })
    const [errorRequest, setErrorRequest] = useState("");
    const [empresas ,setEmpresas] = useState([] as IEmpresa[]);
    const [textParam, setTextParam] = useState("");

    let componentsOfTabsGeral: any = [];
    let componentsOfTabsManipulacao: any = [];
    let componentsOfTabsAcabado: any = [];
    let componentsOfTabsMain: any[] = [];

    let titlesMainsOfTabs: string[] = [];
    titlesMainsOfTabs.push(...itemsHandles);
    let quantidadeItemsTabs = titlesMainsOfTabs.length;

    let tabChildrenGeral = itemsHandlesChildrenGeral;
    let quantidadeItemsChildGeral = tabChildrenGeral.length;
    let titlesGeralOfTabs: string[] = [];
    titlesGeralOfTabs.push(...itemsHandlesChildrenGeral);

    let tabChildrenManipulacao = itemsHandlesChildrenManipulacao;
    let quantidadeItemsChildManipulacao = tabChildrenManipulacao.length;
    let titlesGeralOfTabsManipulacao: string[] = [];
    titlesGeralOfTabsManipulacao.push(...itemsHandlesChildrenManipulacao);

    let tabChildrenAcabado = itemsHandlesChildrenAcabado;
    let quantidadeItensChildAcabado = tabChildrenAcabado.length;
    let titlesAcabadoOfTabs: string[] = [];
    titlesAcabadoOfTabs.push(...itemsHandlesChildrenAcabado);

    let titles: string[][] = [];

    titles.push(
        titlesGeralOfTabs,
        titlesGeralOfTabsManipulacao,
        titlesAcabadoOfTabs
    )

    componentsOfTabsGeral.push(
        <TabFarmacia erros={error} textParameter={textParam} />
        //<TabImpressao />,
        //<TabCuspomFiscal />,
        // <TabConvenios />,
        // <TabCartoes />,
        // <TabNfe />,
        // <TabNFSe />,
        // <TabGeral />,
        // <TabIntegracaoWeb />,
        // <TabPrisma5Loader />,
        // <TabPrismaSync />,
        // <TabSiproquim />,
        // <TabGestaoEntrega />
    );

    componentsOfTabsManipulacao.push(
        // <TabGeralManipulacao />,
        // <TabOpcaoManipulacao />,
        // <TabImpressaoManipulacao />
    )
    componentsOfTabsAcabado.push(
        // <TabAcabado />
    )

    componentsOfTabsMain.push(
        componentsOfTabsGeral
    )

    // componentsOfTabsMain.push(
    //     componentsOfTabsManipulacao
    // )

    // componentsOfTabsMain.push(
    //     componentsOfTabsAcabado
    // )

    useEffect(() => {
        const loadDataEmpresa = async () => {
            const request = await getAll("ListaEmpresa");
            setEmpresas(request.data)
        }
        loadDataEmpresa()
    }, [])

    function ValidString(text: string, index: number) {
        if (!text.trim()) {
            setError({ erro: true, erroNome: "Campo de preenchimento obrigatório.", index: index })
            return false
        }

        return true;
    }

     async function submit() {

        let erroCpfCnpj = false;
        setError({ erro: false, erroNome: "", index: 0 })
        setIsLoading(true);

        if (!ValidString(dataEdit.farmacia.razaoSocial.trim(), 1)
            || !ValidString(dataEdit.farmacia.nomeFantasia.trim(), 2)
            || !ValidString(dataEdit.farmacia.cnpj.trim(), 3)
            || !ValidString(dataEdit.farmacia.logradouro.trim(), 4)
            || !ValidString(dataEdit.farmacia.numero.trim(), 5)
            || !ValidString(dataEdit.farmacia.cep.trim(), 6)
            || !ValidString(dataEdit.farmacia.ddd.trim(), 7)
            || !ValidString(dataEdit.farmacia.telefone.trim(), 8)
            || !ValidString(dataEdit.farmacia.dddWhatsApp.trim(), 9)
            || !ValidString(dataEdit.farmacia.whatsApp.trim(), 10)
            || !ValidString(dataEdit.farmacia.email.trim(), 11)
            || !ValidString(dataEdit.farmacia.nomeFarmaceutico.trim(), 12)
            || !ValidString(dataEdit.farmacia.cpfRespSNGPC.trim(), 14)
            || !ValidString(dataEdit.farmacia.usuarioSNGPC.trim(), 15)
            || !ValidString(dataEdit.farmacia.senhaSNGPC.trim(), 16)
            || !ValidString(dataEdit.farmacia.licencaFunc.trim(), 17)
            || !ValidString(dataEdit.farmacia.autoridadeSanitaria.trim(), 18)
            || !ValidString(dataEdit.farmacia.licencaMapa.trim(), 19)
        ) {
            setIsLoading(false);
            return;
        }

        if (dataEdit.farmacia.crf == 0) {
            setError({ erro: true, erroNome: "Campo de preenchimento obrigatório", index: 13 });
            setIsLoading(false);
            return;
        }

        if (dataEdit.farmacia.estadoId <= 0) {
            setError({ erro: true, erroNome: "Campo de preenchimento obrigatório", index: 20 });
            setIsLoading(false);
            return;
        }

        if (dataEdit.farmacia.cidadeId <= 0) {
            setError({ erro: true, erroNome: "Campo de preenchimento obrigatório", index: 21 });
            setIsLoading(false);
            return;
        }

        if (dataEdit.farmacia.bairroId <= 0) {
            setError({ erro: true, erroNome: "Campo de preenchimento obrigatório", index: 22 });
            setIsLoading(false);
            return;
        }

        if (dataEdit.farmacia.fornecedorInternoId <= 0) {
            setError({ erro: true, erroNome: "Campo de preenchimento obrigatório", index: 23 });
            setIsLoading(false);
            return;
        }

        if (dataEdit.farmacia.inscricaoEstadual != ""){
            if (sigla.charAt(0).toUpperCase() != "P") {
                if (!ValidIeDigitos(sigla, dataEdit.farmacia.inscricaoEstadual)) {
                    setError({ erro: true, erroNome: "Inscrição estadual inválida.", index: 24 })
                    setIsLoading(false);
                    return;
                }
            }
        } 

        if (!validCPF(dataEdit.farmacia.cpfRespSNGPC)) {
            if (dataEdit.farmacia.cpfRespSNGPC && !validCPF(dataEdit.farmacia.cpfRespSNGPC)) {
                setError({ erro: true, erroNome: "Cpf inválido", index: 14 });
                setIsLoading(false);
                return;
            }
        }

        if (!ValidCnpj(dataEdit.farmacia.cnpj)) {
            if (dataEdit.farmacia.cnpj && !ValidCnpj(dataEdit.farmacia.cnpj)) {
                setError({ erro: true, erroNome: "Cnpj inválido", index: 3 });
                setIsLoading(false);
                return;
            }
        }

        empresas.map(x => {
            if (x.farmacia.cnpj == dataEdit.farmacia.cnpj && dataEdit.farmacia.cnpj && x.farmacia.id != dataEdit.farmaciaId) {
                setError({ erro: true, erroNome: "Cnpj já cadastrado!", index: 3 });
                setIsLoading(false);
                erroCpfCnpj = true;
            }
            if (x.farmacia.inscricaoEstadual == dataEdit.farmacia.inscricaoEstadual && dataEdit.farmacia.inscricaoEstadual && x.farmacia.id != dataEdit.farmacia.id) {
                setError({ erro: true, erroNome: "Inscrição Estadual já cadastrada!", index: 24 })
                setIsLoading(false);
                erroCpfCnpj = true;
            }
        })

        if (erroCpfCnpj) {
            return;
        }

        let data = dataEdit

        const resp = await postFormAll("EditarEmpresa", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/empresa");
            }, 2000)
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErrorRequest(resp.request.response)
            }, 2000)
        }
    }

    return (
        <>
            <HeaderMainContent title="Editar Empresa" IncludeButton={false} ReturnButton={true} to="empresa" />
            <div className="form-group">
                <TabsEmpresa
                    titlesMain={titlesMainsOfTabs}
                    Childrens={componentsOfTabsMain}
                    titles={titles}
                />
                <LabelObrigatorio />
                {errorRequest && <p className="text-danger">{errorRequest}</p>}
                <div className="row">
                    <div className="col-6 mt-2">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    )
}