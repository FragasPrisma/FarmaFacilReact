import { IFarmacia } from "./IFarmacia";
import { Farmacia } from "./IFarmacia";

export interface IEmpresa {
    farmacia: IFarmacia;
    //Farmacia: typeof Farmacia
}