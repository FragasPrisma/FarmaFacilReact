import { ContainerFieldset, CustomLegend, ContainerFieldsetBorderAll } from "./styles";

interface IFieldset {
  legend?: string;
  children: any;
  numberCols?: number
  borderAll?: boolean
}

export const FieldsetCustom = ({ legend, children, numberCols = 12, borderAll }: IFieldset) => {
  return (
    <>
      { !borderAll ?
        <ContainerFieldset className={`col-${numberCols}`}>
          <CustomLegend>{legend}</CustomLegend>
          {children}
        </ContainerFieldset> 
        :
        <ContainerFieldsetBorderAll className={`col-${numberCols}`}>
          <CustomLegend>{legend}</CustomLegend>
          {children}
        </ContainerFieldsetBorderAll> 
      }
    </>
  );
};
