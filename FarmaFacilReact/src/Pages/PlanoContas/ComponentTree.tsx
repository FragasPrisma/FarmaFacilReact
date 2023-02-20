export {}
// import { X } from "phosphor-react";
// import { useEffect, useState } from "react";
// import { getAll } from "../../Services/Api";

// export let tratandoAllItems

// export function Tree() {
//   const [pai, setPai] = useState([]);

//   useEffect(() => {
//     const loadDataTable = async () => {
//       const response = await getAll(`ListaPlanoDeContas`);

//       tratandoAllItems = response.data.map((x) => {
//         return {
//           numeroConta: x.numeroConta,
//           numeroContaPai: x.numeroContaPai,
//           nivelConta: x.nivelConta,
//           descricao: x.descricao,
//           children: [],
//         };
//       });

//       let float = response.data
//         .filter((x) => x.numeroConta.includes("."))
//         .map((x) => {
//           return {
//             numeroConta: x.numeroConta,
//             numeroContaPai: x.numeroContaPai,
//             nivelConta: x.nivelConta,
//             descricao: x.descricao,
//             children: [],
//           };
//         });

//       let int = response.data
//         .filter((x) => !x.numeroConta.includes("."))
//         .map((x) => {
//           return {
//             numeroConta: x.numeroConta,
//             numeroContaPai: x.numeroContaPai,
//             nivelConta: x.nivelConta,
//             descricao: x.descricao,
//             children: [],
//           };
//         });




//       int.forEach((conta) => {
//         float.forEach((item) => {
//           if (
//             conta.numeroConta === item.numeroContaPai &&
//             item.numeroConta.includes(".")
//           ) {
//             conta.children.push(item);
//           }
//         });
//       });

//     };
//     loadDataTable();
//   }, []);

//   return (
//     <div>
//       {pai.map((x) => (
//         <ul>{x}</ul>
//       ))}
//     </div>
//   );
// }