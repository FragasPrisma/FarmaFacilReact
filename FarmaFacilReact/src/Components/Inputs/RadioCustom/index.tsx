import { ContainerCheck, TitleContainer } from "./styles";

interface ISelect {
  titleComponet?: string;
  options: string[];
  name: string;
  onClickOptions?: (options: number, label: string) => void ;
  value: number;
  readonly?:boolean
}

export function RadioCustom({ titleComponet, options, name, onClickOptions, value,readonly}: ISelect) {

  function ReloadOption(option:number, label:string){
    if (onClickOptions) {
      onClickOptions(option, label);
    }
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
                <input type="radio" name={name} onChange={() => ReloadOption(index, option)} checked={true} disabled={readonly}/>
                :
                <input type="radio" name={name} onChange={() => ReloadOption(index, option)} checked={false} disabled={readonly}/>
            }
            <label>{option}</label>
          </div>
        ))}
      </ContainerCheck>
    </>
  );
}