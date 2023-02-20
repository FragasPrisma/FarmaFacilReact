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
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { IAdministradoCartao } from "../../Interfaces/AdministradoCartao/IAdministradoCartao";
import { useTranslation } from "react-i18next";
import { LabelObrigatorio } from "../../Components/Others/LabelMensagemObrigatorio";
import { MaxLengthNumber } from "../../helper/MaxLengthNumber";
import { IFornecedor } from "../../Interfaces/Fornecedor/IFornecedor";
import { IPlanoDeconta } from "../../Interfaces/PlanoDeContas/IPlanoDeConta";

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
    const [fornecedorId, setFornecedorId] = useState(null);
    const [planoDeContaId, setPlanoDeConta] = useState(null);
    const [parcelaTaxaAdm, setParcelaTaxaAdm] = useState(false);
    const [erroNome, setErroNome] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [erro, setErro] = useState("");
    const { t } = useTranslation();

    const [fornecedores, setFornecedores] = useState([] as IFornecedor []);
    const [planoDeContas, setPlanoDeContas] = useState([] as IPlanoDeconta []);

    useEffect(() => {
        const loadDataPlanoDeContas = async () => {
            const response = await getAll("ListaPlanoDeContas");
            setPlanoDeContas(response.data);
        }
        const loadDataFornecedor = async () => {
            const response = await getAll("ListaFornecedor");
            setFornecedores(response.data);
        }
        loadDataFornecedor()
        loadDataPlanoDeContas()
    }, []);

    const data: IAdministradoCartao = {
        id: 0,
        nome: nome,
        prazoRecebimento: prazoDeRecebimento,
        desconto: desconto,
        gerenciador: gerenciador,
        cieloPremia: cieloPremia,
        modalidade: modalidade,
        ativo: ativo,
        fornecedorId: fornecedorId,
        planoDeContaId: planoDeContaId,
        parcelaTaxaAdm: parcelaTaxaAdm
    };

    async function submit() {

        setErroNome("")
        setIsLoading(true);

        if (!nome.trim()) {
            setErroNome(t('erros.campoObrigatorio').toString())
            setIsLoading(false);
            return;
        }

        if (gerenciador < 0) {
            setErro(t('administradoraCartao.erros.tef').toString())
            setIsLoading(false);
            return;
        }

        if (modalidade < 0) {
            setErro(t('administradoraCartao.erros.modalidade').toString())
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
            <HeaderMainContent title={t('administradoraCartao.title')} IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label={t('textGeneric.nome')}
                                type="text"
                                placeholder={t('textGeneric.digiteNome').toString()}
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
                                label={t('administradoraCartao.propriedade.recebimento')}
                                type="number"
                                value={prazoDeRecebimento}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setPrazoDeRecebimento(MaxLengthNumber(10000, parseInt(e.target.value)))
                                }
                                required={false}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label={t('administradoraCartao.propriedade.desconto')}
                                type="number"
                                value={desconto}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDesconto(MaxLengthNumber(9999999999.99, parseFloat(e.target.value)))
                                }
                                required={false}
                            />
                        </div>
                        <div className="col-4 mt-2">
                            <CheckboxCustom
                                options={[t('administradoraCartao.propriedade.parcelaTaxaAdm')]}
                                check={parcelaTaxaAdm}
                                onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setParcelaTaxaAdm(e.target.checked)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-5">
                            <RadioCustom
                                options={[t('administradoraCartao.propriedade.tef.visa'),
                                t('administradoraCartao.propriedade.tef.banri'),
                                t('administradoraCartao.propriedade.tef.conv'),
                                t('administradoraCartao.propriedade.tef.edm'),
                                t('administradoraCartao.propriedade.tef.hiper'),
                                t('administradoraCartao.propriedade.tef.inte')
                                ]}
                                requerid={true}
                                name="gerenciador"
                                onClickOptions={(value, label) => setGerenciador(value)}
                                titleComponet={t('administradoraCartao.propriedade.tef.title').toString()}
                                value={gerenciador}
                            />
                        </div>
                        <div className="col-5">
                            {gerenciador == 0 &&
                                <RadioCustom
                                    titleComponet={t('administradoraCartao.propriedade.cielo.title').toString()}
                                    options={[t('administradoraCartao.propriedade.cielo.troco'),
                                    t('administradoraCartao.propriedade.cielo.desconto'),
                                    t('administradoraCartao.propriedade.cielo.vias'),
                                    t('administradoraCartao.propriedade.cielo.cupom'),
                                    ]}
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
                                requerid={true}
                                options={[t('administradoraCartao.propriedade.modalidade.credito'),
                                t('administradoraCartao.propriedade.modalidade.debito'),
                                ]}
                                name="modalidade"
                                onClickOptions={(value, label) => setmodalidade(value)}
                                titleComponet={t('administradoraCartao.propriedade.modalidade.title').toString()}
                                value={modalidade}
                            />
                        </div>
                        <div className="col-4 mt-4">
                            <CheckboxCustom
                                options={[t('administradoraCartao.propriedade.ativo')]}
                                check={ativo}
                                onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setAtivo(e.target.checked)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <CustomDropDown
                                data={fornecedores}
                                title={t('textGeneric.selecioneFornecedor')}
                                filter="nomeFornecedor"
                                label={t('fornecedor.fornecedor')}
                                Select={(Id) => setFornecedorId(Id)}
                            />
                        </div>
                        <div className="col-5">
                            <CustomDropDown
                                data={planoDeContas}
                                title={t('textGeneric.selecionePlanoDeContas')}
                                filter="descricao"
                                label={t('planoDeContas.planoDeContas')}
                                Select={(Id) => setPlanoDeConta(Id)}
                            />
                        </div>
                    </div>
                    <p className="text-danger-erro">{erro}</p>
                </Container>
                <LabelObrigatorio />
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="administradoradecartao" />
                    </div>
                </div>
                <SuccessModal show={isOpenSuccess} />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
