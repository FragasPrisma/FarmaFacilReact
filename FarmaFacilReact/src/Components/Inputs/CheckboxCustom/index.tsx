import { ContainerCheck, TitleContainer } from "./styles";
import { ChangeEvent} from "react";
interface ISelect {
  titleComponet?: string;
  options: string[];
  check?:boolean;
  onClickOptions?: (e: ChangeEvent<HTMLInputElement>) => void;
  readOnly?:boolean;
  color?: string;
}

export function CheckboxCustom({ titleComponet, options, check ,onClickOptions ,readOnly, color}: ISelect) {

  return (
    <>
      {titleComponet ? (
        <TitleContainer>{titleComponet}</TitleContainer>
      ) : (
        <></>
      )}
      <ContainerCheck style={{backgroundColor: color}}>
        {options.map((option, index) => (
          <div key={index}>
            <input type="checkbox" checked={check} onChange={onClickOptions} disabled={readOnly}/>
            <label>{option}</label>
          </div>
        ))}
      </ContainerCheck>
    </>
  );
}
