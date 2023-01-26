const ItemsMainsParametro = [
  { titulo: "Geral" },
  { titulo: "Manipulação" },
  { titulo: "Acabado" },
];

export const itemsHandles = ItemsMainsParametro.map(x => x.titulo)


const ItemsParametro = [
  { titulo: "Farmácia" },
  { titulo: "Impressão" },
  { titulo: "Cupom Fiscal/NFCe/SAT" },
  { titulo: "Convênios" },
  { titulo: "Cartões/TEF" },
  { titulo: "NFe/sped" },
  { titulo: "NFSe/CFSe" },
  { titulo: "Geral" },
  { titulo: "Test" },
];

export const itemsHandlesChildrenGeral = ItemsParametro.map(x => x.titulo)

const ItensParametroManipulacao = [
  { titulo: "Geral" },
  { titulo: "Opções" },
  { titulo: "Impressão" },
];

export const itemsHandlesChildrenManipulacao = ItensParametroManipulacao.map(x => x.titulo)

const ItensParametroAcabado = [
  { titulo: "Acabado" }
];

export const itemsHandlesChildrenAcabado = ItensParametroAcabado.map(x => x.titulo)
