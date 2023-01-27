import { ContainerCheck, TitleContainer } from "./styles";
import { ChangeEvent} from "react";
interface ISelect {
  titleComponet?: string;
  options: string[];
  check?:boolean;
  onClickOptions?: (e: ChangeEvent<HTMLInputElement>) => void;
  readOnly?:boolean;
}

export function CheckboxCustom({ titleComponet, options, check ,onClickOptions,readOnly}: ISelect) {

  return (
    <>
      {titleComponet ? (
        <TitleContainer>{titleComponet}</TitleContainer>
      ) : (
        <></>
      )}
      <ContainerCheck>
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
