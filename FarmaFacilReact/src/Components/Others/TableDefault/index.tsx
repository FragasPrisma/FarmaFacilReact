import Table from "react-bootstrap/Table";
import { useState } from "react";
import { ActionsButtonsDefault } from "../../Buttons/ActionsButtonsDefault";
import { TableCustom, TrCustom } from "./styles";

interface Props {
  data: any[];
  header: string[];
  path: string;
}

export function TableDefault({ data = [], header, path }: Props) {
  const [bodyList, setbodyList] = useState([]);

  return (
    <TableCustom>
      <thead>
        <TrCustom>
          {header.map((head, index) => (
            <th style={{width:"calc(2rem - 100%)"}} key={index}>{head}</th>
          ))}
          <th className="col-3">
            <label>Visualizar</label>
            <label>Editar</label>
            <label className="labelExcluir">Excluir</label>
          </th>
        </TrCustom>
      </thead>
      <tbody>
        {data.map((data, index) => (
          <TrCustom key={index}>
            {header.map((header, index) => (
                <td key={index}>{data[header]}</td>
            ))}
            <td className="col-3">
              <ActionsButtonsDefault id={data.id.toString()} pathParameters={path} urlText={path}></ActionsButtonsDefault>
            </td>
          </TrCustom>
        ))}
      </tbody>
    </TableCustom>
  );
}
