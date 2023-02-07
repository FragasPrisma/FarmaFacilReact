import { ITributo } from "./Tributo";

export interface INcmGeral {
    id: 0,
    produtoServico: boolean,
    descricao: string,
    codigoNcm: string,
    codigoNcmEx: number,
    percentualMva: number,
    aliquotaNacional: number,
    aliquotaImportacao: number,
    aliquotaCofins: number,
    aliquotaIcmsProduto: number,
    aliquotaPis: number,
    tributoCstCofinsEntradaId: null,
    tributoCstCofinsEntrada: ITributo | null,
    tributoCstCofinsSaidaId: null,
    tributoCstCofinsSaida: ITributo | null,
    tributoCstPisEntradaId: null,
    tributoCstPisEntrada: ITributo | null,
    tributoCstPisSaidaId: null,
    tributoCstPisSaida: ITributo | null,
    ncmEstados: any[],
}

export let NcmGeral : INcmGeral = {
    id: 0,
    produtoServico: true,
    descricao: "",
    codigoNcm: "",
    codigoNcmEx: 0,
    percentualMva: 0,
    aliquotaNacional: 0,
    aliquotaImportacao: 0,
    aliquotaCofins: 0,
    aliquotaIcmsProduto: 0,
    aliquotaPis: 0,
    tributoCstCofinsEntradaId: null,
    tributoCstCofinsEntrada: null,
    tributoCstCofinsSaidaId: null,
    tributoCstCofinsSaida: null,
    tributoCstPisEntradaId: null,
    tributoCstPisEntrada: null,
    tributoCstPisSaidaId: null,
    tributoCstPisSaida: null,
    ncmEstados: [] as any [],
}