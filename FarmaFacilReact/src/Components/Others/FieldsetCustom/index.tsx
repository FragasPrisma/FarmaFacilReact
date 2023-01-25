import { ContainerFieldset, CustomLegend } from "./styles";

interface IFieldset {
  legend?: string;
  children: any;
  numberCols?: number
}

export const FieldsetCustom = ({ legend, children, numberCols = 12 }: IFieldset) => {
  return (
    <ContainerFieldset className={`col-${numberCols}`}>
      <CustomLegend>{legend}</CustomLegend>
      {children}
    </ContainerFieldset>
  );
};
