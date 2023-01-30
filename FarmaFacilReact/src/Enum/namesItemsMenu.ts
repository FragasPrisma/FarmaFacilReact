
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
    img: Flat,
    titulo: "Estoque",
    hasSubMenu: true,
    subMenu: [
      { titulo: "Fornecedor", link: "/fornecedor" },
      { titulo: "Nbm", link: "/nbm" },
      //{ titulo: "Ncm", link: "/ncm" },
      { titulo: "Pbm", link: "/pbm" },
      { titulo: "Classe", link: "/classe" },
      { titulo: "Dci", link: "/dci" },
      { titulo: "Principio Ativo", link: "principioativo" },
      { titulo: "Laboratorio", link: "laboratorio" },
      //{ titulo: "Produto", link: "produto" },
      { titulo: "Dcb", link: "dcb" },
      //{ titulo: "Grupo", link: "grupo" },
    ],
  },

  {
    img: Flat,
    titulo: "Parametro",
    hasSubMenu: true,
    subMenu: [
      { img: Flat, titulo: "Bairro", link: "/bairro" },
      { img: Flat, titulo: "Cidade", link: "/cidade" },
      //{ img: Flat, titulo: "Parametro", link: "/parametro" },
      { img: Flat, titulo: "Máquina Pós", link: "/maquinapos" },
      { img: Flat, titulo: "País", link: "/pais" },
      { img: Flat, titulo: "Portador", link: "/portador" },
      { img: Flat, titulo: "Farmacopéia", link: "/farmacopeia" },
      { img: Flat, titulo: "Ensaio", link: "/ensaio" },
      { img: Flat, titulo: "Pós Adquirente", link: "/posadquirente" },
      { img: Flat, titulo: "Tributo", link: "/tributo" },
      { img: Flat, titulo: "Banco", link: "/banco" },
      { img: Flat, titulo: "Lista de Controlado", link: "/listaControlado" },
      { img: Flat, titulo: "Natureza de Operação", link: "/naturezaDeOperacao" },
      { img: Flat, titulo: "Transportador", link: "/transportador" },
      { img: Flat, titulo: "Contabilista", link: "/contabilista" },
    ],
  },

  {
    img: Flat,
    titulo: "Venda",
    hasSubMenu: true,
    subMenu: [
      { img: Flat, titulo: "Administradora de Cartão", link: "/administradoradecartao" },
      { img: Flat, titulo: "Forma de Pagamento", link: "/formadepagamento" },
      { img: Flat, titulo: "Especialidade", link: "/especialidade" },
      { img: Flat, titulo: "Mensagens Padrão", link: "/mensagenspadrao" },
      { img: Flat, titulo: "Método", link: "/metodo" },
      { img: Flat, titulo: "Tipo Contato", link: "/tipocontato" },
      { img: Flat, titulo: "Tipo Justificativa", link: "/tipojustificativa" },
      { img: Flat, titulo: "Posologia",link: "/posologia"  },
      { img: Flat, titulo: "Visitador", link: "/visitador" },
      { img: Flat, titulo: "Turno", link: "/turno" },
    ],
  },

  {
    img: Flat,
    titulo: "Produção",
    hasSubMenu: true,
    subMenu: [
      { img: Flat, titulo: "Bula", link: "/bula" },
      { img: Flat, titulo: "Funcionário Laboratório", link: "/funcionariolaboratorio" },
      { img: Flat, titulo: "Especificação Cápsula", link: "/especificacaocapsula" },
    ],
  },

  {
    img: Flat,
    titulo: "Financeiro",
    hasSubMenu: true,
    subMenu: [{ img: Flat, titulo: "Conta Corrente", link: "/contacorrente" }],
  },

  {
    img: Flat,
    titulo: "PCP",
    hasSubMenu: true,
    subMenu: [
      { img: Flat, titulo: "Etapa", link: "/etapa" },
      { img: Flat, titulo: "Motivo", link: "/motivo" },
    ],
  },

  {
    img: Flat,
    titulo: "E-Commerce",
    hasSubMenu: true,
    subMenu: [
      { img: Flat, titulo: "Categoria", link: "/categoria" },
    ],
  }
];