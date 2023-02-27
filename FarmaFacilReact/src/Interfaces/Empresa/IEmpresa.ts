import { IFarmacia } from "./IFarmacia";
import { Farmacia } from "./IFarmacia";

export interface IEmpresa {
    //Farmacia: IFarmacia;
    Farmacia: typeof Farmacia
}