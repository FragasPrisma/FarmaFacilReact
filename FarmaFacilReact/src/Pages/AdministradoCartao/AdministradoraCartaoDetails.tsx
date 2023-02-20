import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { IAdministradoCartao } from "../../Interfaces/AdministradoCartao/IAdministradoCartao";
import { useTranslation } from "react-i18next";

export function AdministradoraCartaoDetails() {

    const [administradoraModel, setAdministradoModel] = useState({} as IAdministradoCartao);

    const { id } = useParams();

    const [nomeFornecedor, setNomeFornecedor] = useState("");
    const [descricaoPLanoDeContas, setDescricaoPLanoDeContas] = useState("");
    const { t } = useTranslation();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaAdministradoraDeCartaoPorId", idParams);

            setAdministradoModel(response.data);

            if (response.data.fornecedor) {
                setNomeFornecedor(response.data.fornecedor.nomeFornecedor)
            }
            if (response.data.planoDeConta) {
                setDescricaoPLanoDeContas(response.data.planoDeConta.descricao)
            }
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title={t('administradoraCartao.titleVisualizar')} IncludeButton={false} ReturnButton={true} to="administradoradecartao" />
            <div className="form-group">
                {administradoraModel.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-5">
                                <CustomInput
                                    label={t('textGeneric.nome')}
                                    type="text"
                                    value={administradoraModel.nome}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <CustomInput
                                    label={t('administradoraCartao.propriedade.recebimento')}
                                    type="number"
                                    value={administradoraModel.prazoRecebimento}
                                    required={false}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label={t('administradoraCartao.propriedade.desconto')}
                                    type="number"
                                    value={administradoraModel.desconto}
                                    required={false}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-4 mt-2">
                                <CheckboxCustom
                                    options={[t('administradoraCartao.propriedade.parcelaTaxaAdm')]}
                                    check={administradoraModel.parcelaTaxaAdm}
                                    readOnly={true}
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
                                    readonly={true}
                                    name="gerenciador"
                                    titleComponet={t('administradoraCartao.propriedade.tef.title').toString()}
                                    value={administradoraModel.gerenciador}
                                />
                            </div>
                            <div className="col-5">
                                {administradoraModel.gerenciador == 0 &&
                                    <RadioCustom
                                        titleComponet={t('administradoraCartao.propriedade.cielo.title').toString()}
                                        options={[t('administradoraCartao.propriedade.cielo.troco'),
                                        t('administradoraCartao.propriedade.cielo.desconto'),
                                        t('administradoraCartao.propriedade.cielo.vias'),
                                        t('administradoraCartao.propriedade.cielo.cupom'),
                                        ]}
                                        readonly={true}
                                        name="cieloPremia"
                                        value={administradoraModel.cieloPremia}
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
                                    readonly={true}
                                    titleComponet={t('administradoraCartao.propriedade.modalidade.title').toString()}
                                    value={administradoraModel.modalidade}
                                />
                            </div>
                            <div className="col-2 mt-4">
                                <CheckboxCustom
                                    options={[t('administradoraCartao.propriedade.ativo')]}
                                    check={administradoraModel.ativo}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-5">
                                <CustomInput
                                    label={t('fornecedor.fornecedor')}
                                    type="text"
                                    value={nomeFornecedor}
                                    required={false}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-5">
                                <CustomInput
                                    label={t('planoDeContas.planoDeContas')}
                                    type="text"
                                    value={descricaoPLanoDeContas}
                                    required={false}
                                    readonly={true}
                                />
                            </div>
                        </div>
                    </Container>
                }
            </div>
        </>
    );
}
