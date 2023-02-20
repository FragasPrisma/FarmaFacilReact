import { ContainerCheck, TitleContainer } from "./styles";

interface ISelect {
  titleComponet?: string;
  options: string[];
  name: string;
  onClickOptions?: (options: number, label: string) => void;
  value: number | null;
  readonly?: boolean;
  requerid?: boolean
}

export function RadioCustom({ titleComponet, options, name, onClickOptions, value, readonly, requerid }: ISelect) {

  function ReloadOption(option: number, label: string) {
    if (onClickOptions) {
      onClickOptions(option, label);
    }
  };

  return (
    <>
      {titleComponet ? (
        <TitleContainer>{requerid ? <>{titleComponet} : <span className="text-danger-erro">*</span></> : `${titleComponet}  :`}</TitleContainer>
      ) : (
        <></>
      )}
      <ContainerCheck>
        {options.map((option, index) => (
          <div key={index}>
            {
              value == index ?
                <input type="radio" name={name} onChange={() => ReloadOption(index, option)} checked={true} disabled={readonly} />
                :
                <input type="radio" name={name} onChange={() => ReloadOption(index, option)} checked={false} disabled={readonly} />
            }
            <label>{option}</label>
          </div>
        ))}
      </ContainerCheck>
    </>
  );
}