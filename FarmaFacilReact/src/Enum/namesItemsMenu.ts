
// {
  //   img: Archive,
  //   titulo: "Arquivo",
  //   hasSubMenu: true,
  //   subMenu: [
    //     {
      //       titulo: "Bairro",
      //       link: "/bairro",
      //       hasSubSubMenu: [
        //         { titulo: "Lista de Clientes", link: "/lista-clientes" },
        //       ],
        //     },
        //     { titulo: "Lista de Clientes", link: "/lista-clientes" },
        //   ],
        // },
        
import Flat from "../assets/img/bench.png";

export const namesItemsMenu = [

  {
    img: "",
    titulo: "Compras",
    hasSubMenu: true,
    subMenu: [
      { titulo: "Compras", link: "/compras"}
    ]
  },
  // {
  //   img: "",
  //   titulo: "Contas a Pagar",
  //   hasSubMenu: true,
  //   subMenu: [
  //     { titulo: "Contas a Pagar", link: "/contasapagar" },
  //     { titulo: "Pagas", link: "/contaspagas"},
  //     { titulo: "Pagar", link: "/contaspagar"},
  //   ],
  // },

  {
    img: "",
    titulo: "Contas a Pagar",
    hasSubMenu: true,
    subMenu: [
      { 
        hasSubSubMenu: true, 
        titulo: "Movimento", 
        //link: "/contasapagar",
        subSubMenu: [
          { titulo: "Contas a pagar", link: "/contasapagar"},
        ],
      },
      {
        hasSubSubMenu: true,
        titulo: "Relatório",
        link: "/contaspagas",
        subSubMenu: [
          { titulo: "Pagas", link: "/contaspagas"},
          { titulo: "Pagar", link: "/contaspagar"},
        ],
      },
    ],
  },
  












  {
    img: "",
    titulo: "Estoque",
    hasSubMenu: true,
    subMenu: [
      { titulo: "Fornecedor", link: "/fornecedor" },
      { titulo: "Nbm", link: "/nbm" },
      { titulo: "Ncm", link: "/ncm" },
      { titulo: "PBM", link: "/pbm" },
      { titulo: "Classe", link: "/classe" },
      { titulo: "DCI", link: "/dci" },
      { titulo: "Principio Ativo", link: "principioativo" },
      { titulo: "Laboratorio", link: "laboratorio" },
      //{ titulo: "Produto", link: "produto" },
      { titulo: "Dcb", link: "dcb" },
      { titulo: "Grupo", link: "grupo" },
    ],
  },

  {
    img: "",
    titulo: "Venda",
    hasSubMenu: true,
    subMenu: [
      { img: "", titulo: "Prescritor", link: "/prescritor" },
      { img: "", titulo: "Administradora de Cartão", link: "/administradoradecartao" },
      { img: "", titulo: "Forma de Pagamento", link: "/formadepagamento" },
      { img: "", titulo: "Especialidade", link: "/especialidade" },
      { img: "", titulo: "Mensagens Padrão", link: "/mensagenspadrao" },
      { img: "", titulo: "Método", link: "/metodo" },
      { img: "", titulo: "Tabela Floral", link: "/tabelafloral" },
      { img: "", titulo: "Tipo Contato", link: "/tipocontato" },
      { img: "", titulo: "Tipo Justificativa", link: "/tipojustificativa" },
      { img: "", titulo: "Posologia",link: "/posologia"  },
      { img: "", titulo: "Visitador", link: "/visitador" },
      { img: "", titulo: "Turno", link: "/turno" },
      { img: "", titulo: "Convênio", link: "/convenio" },
    ],
  },

  {
    img: "",
    titulo: "Produção",
    hasSubMenu: true,
    subMenu: [
      { img: "", titulo: "Bula", link: "/bula" },
      { img: "", titulo: "Funcionário Laboratório", link: "/funcionariolaboratorio" },
      { img: "", titulo: "Especificação Cápsula", link: "/especificacaocapsula" },
      { img: "", titulo: "Forma Farmacêutica", link: "/formafarmaceutica" },
    ],
  },
  {
    img: "",
    titulo: "PCP",
    hasSubMenu: true,
    subMenu: [
      { img: "", titulo: "Etapa", link: "/etapa" },
      { img: "", titulo: "Motivo", link: "/motivo" },
    ],
  },

  {
    img: "",
    titulo: "Financeiro",
    hasSubMenu: true,
    subMenu: [{ img: "", titulo: "Conta Corrente", link: "/contacorrente" }],
  },
  {
    img: "",
    titulo: "E-Commerce",
    hasSubMenu: true,
    subMenu: [
      { img: "", titulo: "Categoria", link: "/categoria" },
      { img: "", titulo: "Banner", link: "/banner" },
    ],
  },
  {
    img: "",
    titulo: "Parametro",
    hasSubMenu: true,
    subMenu: [
      { img: "", titulo: "Bairro", link: "/bairro" },
      { img: "", titulo: "Cidade", link: "/cidade" },
      { img: "", titulo: "Estado", link: "/estado" },
      //{ img: "", titulo: "Empresa", link: "/empresa" }, 
      { img: "", titulo: "Parametro", link: "/parametro" },
      { img: "", titulo: "Unidade", link: "/unidade" },
      { img: "", titulo: "Máquina Pós", link: "/maquinapos" },
      { img: "", titulo: "País", link: "/pais" },
      { img: "", titulo: "Portador", link: "/portador" },
      { img: "", titulo: "Farmacopéia", link: "/farmacopeia" },
      { img: "", titulo: "Ensaio", link: "/ensaio" },
      { img: "", titulo: "Pós Adquirente", link: "/posadquirente" },
      { img: "", titulo: "Tributo", link: "/tributo" },
      { img: "", titulo: "Banco", link: "/banco" },
      { img: "", titulo: "Lista de Controlado", link: "/listaControlado" },
      { img: "", titulo: "Natureza de Operação", link: "/naturezaDeOperacao" },
      { img: "", titulo: "Transportador", link: "/transportador" },
      { img: "", titulo: "Contabilista", link: "/contabilista" },
      { img: "", titulo: "Plano de Contas", link: "/planodecontas" },
      
    ],
  }
];