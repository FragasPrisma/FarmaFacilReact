import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { Container } from "../styles";
import { sigla, TabFarmacia } from "./TabFarmacia";
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
import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ValidIeDigitos } from "../../../helper/ValidIeDigitos";
import { ValidCnpj } from "../../../helper/ValidCnpj";
import { validCPF } from "../../../helper/ValidCpf";

export function EmpresaCreate() {
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

        if (!ValidString(Farmacia.razaoSocial.trim(), 1)
            || !ValidString(Farmacia.nomeFantasia.trim(), 2)
            || !ValidString(Farmacia.cnpj.trim(), 3)
            || !ValidString(Farmacia.logradouro.trim(), 4)
            || !ValidString(Farmacia.numero.trim(), 5)
            || !ValidString(Farmacia.cep.trim(), 6)
            || !ValidString(Farmacia.ddd.trim(), 7)
            || !ValidString(Farmacia.telefone.trim(), 8)
            || !ValidString(Farmacia.dddWhatsApp.trim(), 9)
            || !ValidString(Farmacia.whatsApp.trim(), 10)
            || !ValidString(Farmacia.email.trim(), 11)
            || !ValidString(Farmacia.nomeFarmaceutico.trim(), 12)
            || !ValidString(Farmacia.cpfRespSNGPC.trim(), 14)
            || !ValidString(Farmacia.usuarioSNGPC.trim(), 15)
            || !ValidString(Farmacia.senhaSNGPC.trim(), 16)
            || !ValidString(Farmacia.licencaFunc.trim(), 17)
            || !ValidString(Farmacia.autoridadeSanitaria.trim(), 18)
            || !ValidString(Farmacia.licencaMapa.trim(), 19)
        ) {
            setIsLoading(false);
            return;
        }

        if (Farmacia.crf == 0) {
            setError({ erro: true, erroNome: "Campo de preenchimento obrigatório", index: 13 });
            setIsLoading(false);
            return;
        }

        if (Farmacia.estadoId <= 0) {
            setError({ erro: true, erroNome: "Campo de preenchimento obrigatório", index: 20 });
            setIsLoading(false);
            return;
        }

        if (Farmacia.cidadeId <= 0) {
            setError({ erro: true, erroNome: "Campo de preenchimento obrigatório", index: 21 });
            setIsLoading(false);
            return;
        }

        if (Farmacia.bairroId <= 0) {
            setError({ erro: true, erroNome: "Campo de preenchimento obrigatório", index: 22 });
            setIsLoading(false);
            return;
        }

        if (Farmacia.fornecedorInternoId <= 0) {
            setError({ erro: true, erroNome: "Campo de preenchimento obrigatório", index: 23 });
            setIsLoading(false);
            return;
        }

        if (Farmacia.inscricaoEstadual != ""){
            if (sigla.charAt(0).toUpperCase() != "P") {
                if (!ValidIeDigitos(sigla, Farmacia.inscricaoEstadual)) {
                    setError({ erro: true, erroNome: "Inscrição estadual inválida.", index: 24 })
                    setIsLoading(false);
                    return;
                }
            }
        } 

        if (!validCPF(Farmacia.cpfRespSNGPC)) {
            if (Farmacia.cpfRespSNGPC && !validCPF(Farmacia.cpfRespSNGPC)) {
                setError({ erro: true, erroNome: "Cpf inválido", index: 14 });
                setIsLoading(false);
                return;
            }
        }

        if (!ValidCnpj(Farmacia.cnpj)) {
            if (Farmacia.cnpj && !ValidCnpj(Farmacia.cnpj)) {
                setError({ erro: true, erroNome: "Cnpj inválido", index: 3 });
                setIsLoading(false);
                return;
            }
        }

        empresas.map(x => {
            if (x.farmacia.cnpj == Farmacia.cnpj && Farmacia.cnpj) {
                setError({ erro: true, erroNome: "Cnpj já cadastrado!", index: 3 });
                setIsLoading(false);
                erroCpfCnpj = true;
            }
            if (x.farmacia.inscricaoEstadual == Farmacia.inscricaoEstadual) {
                setError({ erro: true, erroNome: "Inscrição Estadual já cadastrada!", index: 24 })
                setIsLoading(false);
                erroCpfCnpj = true;
            }
        })

        if (erroCpfCnpj) {
            return;
        }

        let data: IEmpresa = {
            farmacia: Farmacia
        }

        const resp = await postFormAll("AdicionarEmpresa", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                setIsOpenSuccess(false);
                setIsLoading(false);
                setTextParam(" ")
            }, 2000)
            setTextParam("")
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
            <HeaderMainContent title="Incluir Empresa" IncludeButton={false} ReturnButton={true} to="empresa" />
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
                        <ButtonCancel to="empresa" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    )
}