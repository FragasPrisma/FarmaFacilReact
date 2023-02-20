// import { useEffect, useState } from "react";
// import { getAll } from "../../Services/Api";

import { X } from "phosphor-react";
import { useEffect, useState } from "react";
import { getAll } from "../../Services/Api";

// export function ComponentTree() {
//   const [doubles, setDoubles] = useState([]);
//   const [inteiros, setInteiros] = useState([]);

//   useEffect(() => {
//     const loadDataTable = async () => {
//       const response = await getAll(`ListaPlanoDeContas`);

//       console.log(response)

//       let filtrosDoubles: any = [];
//       let filtrosInteiros: any = [];

//       response.data.filter((x: { numeroConta: string }) =>
//         !x.numeroConta.includes(".")
//           ? filtrosInteiros.push(x)
//           : filtrosDoubles.push(x)
//       );

//       let valorFiltradoInteiro = filtrosInteiros.map(
//         (x: { numeroConta: string; descricao: string }) =>
//           `${x.numeroConta} - ${x.descricao}`
//       );

//       let valorFiltradoDoubles = filtrosDoubles.map(
//         (x: { numeroConta: string; descricao: string }) =>
//           `${x.numeroConta} - ${x.descricao}`
//       );

//       setInteiros(valorFiltradoInteiro);
//       setDoubles(valorFiltradoDoubles);
//     };

//     loadDataTable();
//   }, []);
//   return (
//     <>
//       <ul style={{ listStyleType: "none" }}>
//         {inteiros.map((inteiro) => {
//           return (
//             <li key={inteiro}>
//               {inteiro}
//               <ul style={{ listStyleType: "none" }}>
//                 {doubles.map((double) => {
//                   if (double.startsWith(`${inteiro.split(" ")[0]}.`)) {
//                     return <li key={double}>{double}</li>;
//                   }
//                 })}
//               </ul>
//             </li>
//           );
//         })}
//       </ul>
//     </>
//   );
// }

// const treeData = [
//   {
//     key: "0",
//     label: "Documents",
//     children: [
//       {
//         key: "0-0",
//         label: "Document 1-1",
//         children: [
//           {
//             key: "0-1-1",
//             label: "Document-0-1.doc",
//           },
//           {
//             key: "0-1-2",
//             label: "Document-0-2.doc",
//           },
//         ],
//       },
//     ],
//   },
// ];

// import { useEffect, useState } from "react";
// import { getAll } from "../../Services/Api";

// export let pai: any[] = [];

// export function ComponentTree({node}) {
//   useEffect(() => {
//     const loadDataTable = async () => {
//       const response = await getAll(`ListaPlanoDeContas`);

//       // let filterInteger = response.data
//       //   .filter(
//       //     (x: { numeroConta: string; numeroContaPai: string }) =>
//       //       x.numeroConta == x.numeroContaPai
//       //   )
//       //   .map((x: { numeroContaPai: string; descricao: string }) =>
//       //     pai.push({ key: x.numeroContaPai, label: x.descricao, children: [] })
//       //   );

//       // let filterChildren1 = response.data.filter(
//       //   (x: { numeroConta: string; numeroContaPai: string }) =>
//       //     pai.some(
//       //       (numberCount) =>
//       //         x.numeroContaPai == numberCount.key &&
//       //         x.numeroConta !== x.numeroContaPai
//       //     )
//       // );

//       // filterChildren1.forEach((item: { numeroContaPai: string; numeroConta: string; descricao: string; }) => {
//       //   const parent = pai.find((item1) => item1.key == item.numeroContaPai);
//       //   if (parent) {
//       //     parent.children.push({
//       //       key: item.numeroConta,
//       //       label: item.descricao,
//       //       children: [],
//       //     });
//       //   }
//       // });

//       function buildTree(data) {
//         const nodes = new Map();

//         for (const item of data) {
//           nodes.set(item.numeroConta, { key: item.numeroConta, label: item.descricao , children: [] });
//         }

//         for (const item of data) {
//           const parent = nodes.get(item.numeroContaPai);
//           if (parent) {
//             parent.children.push(nodes.get(item.numeroConta));
//           }
//         }

//         return Array.from(nodes.values()).filter(item => item.numeroContaPai === item.numeroConta && !item.key.includes('.'));
//       }

//       pai = buildTree(response.data)

//     };

//     loadDataTable();
//   }, []);
//   return <></>;
// }

// export function Tree({ treeData }) {
//   return (
//     <ul>
//       {treeData.map((node) => (
//         <TreeNode node={node} key={node.key} />
//       ))}
//     </ul>
//   );
// }

// export function Tree({ treeData }) {
//   return (
//     <ul>
//       {treeData.map((node) => (
//         <TreeNode node={node} key={node.key} />
//       ))}
//     </ul>
//   );
// }

// export let valSelectedIndex: string
// export let valSelectedText: string
// export let valPaiSelected : string

// function TreeNode({ node }) {
//   const { children, key, label } = node;

//   const [showChildren, setShowChildren] = useState(false);
//   const [botao, setBotao] = useState(false);

//   const handleClick = (e) => {
//     setShowChildren(!showChildren);
//     valSelectedText = e.target.textContent
//     valSelectedIndex = e.target.textContent.split('-')[0]
//   };

//   return (
//     <>
//       <div onClick={handleClick} style={{ marginBottom: "10px" }}>
//         <span style={{ cursor: "pointer" }}>
//           {key} - {label}
//         </span>
//       </div>
//       <ul
//         style={{
//           paddingLeft: "10px",
//           borderLeft: "1px solid black",
//           cursor: "pointer",
//         }}
//       >
//         {showChildren && <Tree treeData={children} />}
//       </ul>
//     </>
//   );
// }

export let tratandoAllItems

export function Tree() {
  const [pai, setPai] = useState([]);

  useEffect(() => {
    const loadDataTable = async () => {
      const response = await getAll(`ListaPlanoDeContas`);

      tratandoAllItems = response.data.map((x) => {
        return {
          numeroConta: x.numeroConta,
          numeroContaPai: x.numeroContaPai,
          nivelConta: x.nivelConta,
          descricao: x.descricao,
          children: [],
        };
      });

      // let int = response.data.filter((x) =>
      //   x.numeroConta === x.numeroContaPai && !x.numeroConta.includes("."))
      //    .map((x) => {
      //     return {
      //       numeroConta: x.numeroConta,
      //       numeroContaPai: x.numeroContaPai,
      //       nivelConta: x.nivelConta,
      //       descricao: x.descricao,
      //       children: [],
      //     }
      //   });

      let float = response.data
        .filter((x) => x.numeroConta.includes("."))
        .map((x) => {
          return {
            numeroConta: x.numeroConta,
            numeroContaPai: x.numeroContaPai,
            nivelConta: x.nivelConta,
            descricao: x.descricao,
            children: [],
          };
        });

      let int = response.data
        .filter((x) => !x.numeroConta.includes("."))
        .map((x) => {
          return {
            numeroConta: x.numeroConta,
            numeroContaPai: x.numeroContaPai,
            nivelConta: x.nivelConta,
            descricao: x.descricao,
            children: [],
          };
        });




      int.forEach((conta) => {
        float.forEach((item) => {
          if (
            conta.numeroConta === item.numeroContaPai &&
            item.numeroConta.includes(".")
          ) {
            conta.children.push(item);
          }
        });
      });




      // const addChildren = (conta, contas) => {
      //   console.log(contas)
      //   contas.forEach((item) => {
      //     if (conta.numeroConta[0] == item.numeroContaPai) {
      //       conta.children.push(item);
      //       addChildren(item, contas);
      //     }
      //   });
      // };
      
      // int.forEach((conta) => addChildren(conta, float));


   console.log(tratandoAllItems)


    };
    loadDataTable();
  }, []);

  return (
    <div>
      {pai.map((x) => (
        <ul>{x}</ul>
      ))}
    </div>
  );
}
