import { ActionsButtonsDefault } from "../../Buttons/ActionsButtonsDefault";
import { TableCustom, TrCustom } from "../TableDefault/styles";
import { ItensButtonExtra } from "../../../Interfaces/ItensButtonExtra/ItensButtonExtra";
import { useTranslation } from "react-i18next";
import { IDuplicatasView } from "../../../Interfaces/DuplicatasContasAPagar/IDuplicatasView";

interface Props {
    data: IDuplicatasView[];
    path: string;
    iconOptions?: boolean;
    itensExtraButton?: ItensButtonExtra[];
    btnsEditExcluir?: boolean;
    btnVisualizar?: boolean;
    actionsButtons?: boolean;
    openModal?: boolean;
    openModalFunction?: (id: string) => void;
}

export function TableDefaultContasAPagar({ data = [],path, iconOptions = false, itensExtraButton, actionsButtons = false, btnsEditExcluir = false, btnVisualizar = false, openModal = false, openModalFunction }: Props) {

    const { t } = useTranslation();

    return (
        <TableCustom>
            <thead>
                <TrCustom>
                    <th style={{ width: "15%" }}>N° do documento</th>
                    <th style={{ width: "45%" }}>Fornecedor</th>
                    {!btnsEditExcluir ?
                        <>
                            <th style={{ width: "18%" }}>Vencimento</th>
                            <th style={{ width: "12%" }}>Valor R$</th>
                        </>
                        :
                        <>
                            <th style={{ width: "18%" }}>Data do pagamento</th>
                            <th style={{ width: "12%" }}>Pagamento R$</th>
                        </>
                    }
                    {!actionsButtons &&
                        <th style={{ textAlign: "end", paddingRight: "1.6rem", width: "270px" }}>
                            {iconOptions &&
                                <label>{t('tableDefault.opcoes')}</label>
                            }
                            {!btnVisualizar &&
                                <label className="mr-4">{t('tableDefault.visualizar')}</label>
                            }
                            {!btnsEditExcluir &&
                                <>
                                    <label className="label-editar">{t('tableDefault.editar')}</label>
                                    <label>{t('tableDefault.excluir')}</label>
                                </>
                            }
                        </th>
                    } 
                </TrCustom>
            </thead>
            <tbody>
                {data.map((item) => (
                    <TrCustom key={item.id}>
                        <td>{item.numeroFatura}</td>
                        <td>{item.nomeFornecedor}</td>
                        {!btnsEditExcluir ?
                            <>
                                <td>{item.dataVencimento}</td>
                                <td>{item.valor}</td>
                            </>
                            :
                            <>
                                <td>{item.dataPagamento}</td>
                                <td>{item.valorPago}</td>
                            </>
                        }
                        {!actionsButtons &&
                            <td
                                style={{
                                    display: "flex",
                                    justifyContent: "end",
                                    paddingRight: "2rem",
                                    border: "none",
                                }}
                            >
                                <ActionsButtonsDefault
                                    id={item.id.toString()}
                                    pathParameters={path}
                                    urlText={path}
                                    iconOptions={iconOptions}
                                    itensExtraButton={itensExtraButton}
                                    btnsEditExcluir={btnsEditExcluir}
                                    btnVisualizar={btnVisualizar}
                                    openModal={openModal}
                                    openModalFunction={openModalFunction}
                                ></ActionsButtonsDefault>
                            </td>
                        }
                    </TrCustom>
                ))}
            </tbody>
        </TableCustom>
    );
}
