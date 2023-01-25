import { ContainerCheck, TitleContainer } from "./styles";

interface ISelect {
  titleComponet?: string;
  options: string[];
}

export function RadioCustom({ titleComponet, options }: ISelect) {
  return (
    <>
      {titleComponet ? (
        <TitleContainer>{titleComponet + ":"}</TitleContainer>
      ) : (
        <></>
      )}
      <ContainerCheck>
        {options.map((option, index) => (
          <div key={index}>
            <input type="radio" />
            <label>{option}</label>
          </div>
        ))}
      </ContainerCheck>
    </>
  );
}