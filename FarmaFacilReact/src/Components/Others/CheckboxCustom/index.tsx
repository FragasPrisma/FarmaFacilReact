import { ContainerCheck, TitleContainer } from "./styles";
import { ChangeEvent } from "react";

interface ISelect {
  titleComponet?: string;
  options: string[];
  check?:boolean;
  onClickOptions: (check:boolean) => void;
  readOnly?:boolean;
}

export function CheckboxCustom({ titleComponet, options, check ,onClickOptions,readOnly}: ISelect) {

  function ReloadCheck(check:boolean){
    onClickOptions(check);
  };

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
            <input type="checkbox" checked={check} onChange={(e) => ReloadCheck(e.target.checked)} disabled={readOnly}/>
            <label>{option}</label>
          </div>
        ))}
      </ContainerCheck>
    </>
  );
}
