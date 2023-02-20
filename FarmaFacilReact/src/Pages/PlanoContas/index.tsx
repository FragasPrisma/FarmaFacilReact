import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useEffect, useState } from "react";
import { getAll } from "../../Services/Api";
import { CaretDown, CaretRight, Eye, NotePencil, Plus, Trash, TrashSimple } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { DeleteModal } from "../../Components/Modals/DeleteModal";
import {Modall} from "./ComponentDeleteItem";
import './styles.ts'
import { useDispatch, useSelector } from "react-redux";
import { changePlano } from "../../store/PlanoContas";
import { ModalGeneric } from "../../Components/Modals/ModalGeneric";
import { FailModal } from "../../Components/Modals/FailModal";


export let value: any
export let incluir: boolean
//export let itemSelected: any;

function PlanoContasRecursivo({ children }: any) {
  const [openMap, setOpenMap] = useState(new Map());
  const [showModal, setShowModal] = useState(false);
  const [isModalActive, setModalActive] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {

    const init = async () => {
      let response = await getAll("ListaPlanoDeContas")
    response.data.length == 0 ? incluir = true: incluir = false
    }

    init()
    
}, []);
    


 const state = useSelector((state) => state)
 let valuee:any = state
  
    const openModal = () => {
      setShowModal(!showModal)
    }

  const handleClick = (key:any) => {
   // itemSelected = key;
    dispatch(changePlano(key))
    
    setOpenMap((prevOpenMap) => {
      const newOpenMap = new Map(prevOpenMap);
      newOpenMap.set(key.key, !newOpenMap.get(key.key));
      return newOpenMap;
    });
  };

  const toggleModal = () => {
    setModalActive(!isModalActive);
  };

  return (
    <ul>
      {children.map((item:any) => (
        <li key={item.key} style={{ listStyleType: "none" }}>
          <div style={{ display: "flex", gap: '0.5rem', cursor: 'pointer' }} 
          onClick={() => handleClick(item)}
          //onClick={() => dispatch(increment(item))}
          >
            {item.children.length > 0 && (
              <span>
                {openMap.get(item.key) ? (
                  <CaretDown size={15} color="#0d0d0d" weight="fill" />
                ) : (
                  <CaretRight size={15} color="#0d0d0d" weight="fill" />
                )}
              </span>
            )}
            {item.key + " - " + item.label}{" "}
            <div style={{ paddingLeft: "1rem", position: 'absolute', right: '3rem' }} key={item.key}>
              
              <NavLink to={'/planodecontas/create'}>
              <Plus size={17} color="#cf0209" style={{marginLeft: "5px"}} />
              </NavLink>

              <NavLink to={'/planodecontas/details/:id'}>
              <Eye size={17} color="#cf0209" style={{marginLeft: "5px"}} />
              </NavLink>

              <NavLink to={'/planodecontas/edit/:id'}>
              <NotePencil size={17} color="#cf0209" style={{marginLeft: "5px"}}/>
              </NavLink>

               
              <Trash size={17} color="#cf0209" style={{ marginLeft: "5px" }} onClick={toggleModal} />
             
                 <Modall isActive={isModalActive} toggleModal={toggleModal} >
                    Deseja excluir o registro?
                 </Modall> 
                
                 
            </div>
          </div>
          {item.children.length > 0 && openMap.get(item.key) && (
            <PlanoContasRecursivo children={item.children} />
          )}
        </li>
      ))}
    </ul>
  );
}

export function PlanoContas() {
  const [dataTreeData, setDataTreeData] = useState([]);

  useEffect(() => {
    const loadDataTable = async () => {
      let response = await getAll(`ListaPlanoDeContas`);

      let arr = response.data.map((x:any) => {
        return {
          id: x.id,
          numeroConta: x.numeroConta,
          numeroContaPai: x.numeroContaPai,
          nivelConta: x.nivelConta,
          descricao: x.descricao,
          children: [],
        };
      });

      function buildTree(data:any) {
        const nodes = new Map();

        for (const item of data) {
          if (!nodes.has(item.numeroConta)) {
            nodes.set(item.numeroConta, {
              id: item.id,
              key: item.numeroConta,
              label: item.descricao,
              children: [],
            });
          }
        }

        for (const item of data) {
          const parent = nodes.get(item.numeroContaPai);
          if (parent && item.numeroConta !== item.numeroContaPai)
            parent.children.push(nodes.get(item.numeroConta));
        }

        return Array.from(nodes.values()).filter(
          (item) => item.numeroContaPai === item.numeroConta && !item.key.includes(".") ) .sort((a,b) => a.key  < b.key ? -1 : a.key  > b.key ? 1 : 0) 
      }


     
      value = buildTree(arr);
      setDataTreeData(value);

    };
    loadDataTable();
  }, []);

  return (
    <>
      <HeaderMainContent
        title="Plano de Contas"
        IncludeButton={incluir}
        ReturnButton={false}
      />

      {dataTreeData.length > 0 && (
        <PlanoContasRecursivo children={dataTreeData} />
      )}
    </>
  );
}
