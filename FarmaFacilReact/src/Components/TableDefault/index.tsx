import { useState } from "react";
import { ActionsButtonsDefault } from "../ActionsButtonsDefault";
import { TableCustom, TrCustom } from "./styles";

interface Props {
  data: any[];
  header: string[];
  path:string;
}

export function TableDefault({ data = [], header,path }: Props) {
  const [bodyList, setbodyList] = useState([]);

  return (
    <TableCustom>
      <thead>
        <TrCustom>
          {header.map((head, index) => (
              <th key={index}>{head[0].toUpperCase() + head.substring(1)}</th>
              ))}
          <th>
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
            <td>
              <ActionsButtonsDefault id={data.id.toString()} pathParameters={path}></ActionsButtonsDefault>
            </td>
          </TrCustom>
        ))}
      </tbody>
    </TableCustom>
  );
}
