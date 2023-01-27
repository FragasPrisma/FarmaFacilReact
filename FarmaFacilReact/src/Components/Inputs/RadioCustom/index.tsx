import { ContainerCheck, TitleContainer } from "./styles";

interface ISelect {
  titleComponet?: string;
  options: string[];
  name: string;
  onClickOptions?: (options: number, label: string) => void ;
  value: number;
}

export function RadioCustom({ titleComponet, options, name, onClickOptions, value}: ISelect) {

  function ReloadOption(option:number, label:string){
    onClickOptions(option, label);
  };
  
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
            {
              value == index ? 
                <input type="radio" name={name} onChange={() => ReloadOption(index, option)} checked={true} disabled={true}/>
                :
                <input type="radio" name={name} onChange={() => ReloadOption(index, option)} checked={false} disabled={true}/>
            }
            <label>{option}</label>
          </div>
        ))}
      </ContainerCheck>
    </>
  );
}