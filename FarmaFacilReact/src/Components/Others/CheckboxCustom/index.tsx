import { ContainerCheck, TitleContainer } from "./styles";
import { ChangeEvent } from "react";

interface ISelect {
  titleComponet?: string;
  options: string[];
  onClickOptions?: (options: boolean) => void;
  value?: boolean;
}

export function CheckboxCustom({ titleComponet, options, onClickOptions, value }: ISelect) {
  function ReloadCheck(option: boolean) {
    onClickOptions(option);
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
            <input type="checkbox" checked={value} onChange={(e: ChangeEvent<HTMLInputElement>) => ReloadCheck(e.target.checked)} />
            <label>{option}</label>
          </div>
        ))}
      </ContainerCheck>
    </>
  );
}
