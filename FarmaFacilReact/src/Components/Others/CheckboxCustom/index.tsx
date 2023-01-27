import { ContainerCheck, TitleContainer } from "./styles";
import { ChangeEvent } from "react";

interface ISelect {
  titleComponet?: string;
  options: string[];
  onClickOptions?: (options: boolean) => void;
  value?: boolean;
}

export function CheckboxCustom({ titleComponet, options, onClickOptions, value }: ISelect) {
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
            <input type="checkbox" checked={value} onChange={() => onClickOptions}  />
            <label>{option}</label>
          </div>
        ))}
      </ContainerCheck>
    </>
  );
}
