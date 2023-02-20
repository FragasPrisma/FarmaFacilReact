import { IFormaFarmaceuticaMargens } from "./IFormaFarmaceuticaMargens";

export interface IFormaFarmaceuticaValores {
    formaFarmaceuticaMargens: IFormaFarmaceuticaMargens[],
    custoAdicional: number,
    valorMinimo: number,
    ncmId: number | null,
}