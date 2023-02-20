import { ActionsButtonsDefault } from "../../Buttons/ActionsButtonsDefault";
import { TableCustom, TrCustom } from "./styles";
import { ItensButtonExtra } from "../../../Interfaces/ItensButtonExtra/ItensButtonExtra";
import { useTranslation } from "react-i18next";

interface Props {
  data: any[];
  header: string[];
  headerTableView?: string[];
  path: string;
  iconOptions?: boolean;
  itensExtraButton?: ItensButtonExtra[];
  btnsEditExcluir?: boolean;
  btnVisualizar?: boolean;
  actionsButtons?: boolean;
  openModal?: boolean;
  openModalFunction?: (id: string) => void
}

export function TableDefault({ data = [], header, path, iconOptions = false, itensExtraButton, actionsButtons = false, btnsEditExcluir = false, btnVisualizar = false, headerTableView, openModal = false, openModalFunction }: Props) {

  const { t } = useTranslation();

  return (
    <TableCustom>
      <thead>
        <TrCustom>
          {header.map((head, index) => (
            <th style={{ width: "calc(2rem - 100%)" }} key={index}>{headerTableView ? headerTableView[index] : head[0].toUpperCase() + head.substring(1)}</th>
          ))}
          {!actionsButtons &&
            <th style={{ textAlign: "end", paddingRight: "1.6rem", width: "300px" }}>
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
        {data.map((dataItem, indexItem) => (
          <TrCustom key={indexItem}>
            {header.map((item, index) => {
              const props = item.split(".");
              let value = dataItem;
              for (let i = 0; i < props.length; i++) {
                if (value[props[i]]) {
                  value = value[props[i]];
                } else {
                  value = "";
                  break;
                }
              }
              return <td key={index}>{value.toString().slice(0, 30)}</td>;
            })}
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
                  id={dataItem.id.toString()}
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
