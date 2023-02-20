// import { createSlice } from '@reduxjs/toolkit'


// export const planoDeContas = createSlice({
//   name: 'objectsSelected',
//   initialState: {
//     //value: 0,
    
//     id:  0,
//     key: "",
//     label: "",
//     children: []
//   },
//   reducers: {
//     objectSelected: (state, action) => {
      
//        state.id = action.payload.id
//        state.key = action.payload.key
//        state.label = action.payload.label
//        state.children = action.payload.children
       
//       // console.log("ser voce lindo", action)

//       },
//     //state.value += 1
//     // increment: (state) => {
//     //   state.value += 1
//     // },
//     // decrement: (state) => {
//     //   state.value -= 1
//     // },
//     // incrementByAmount: (state, action) => {
//     //   state.value += action.payload
//     // },
//   },
// })

// //Action creators are generated for each case reducer function
// //export const { increment, decrement, incrementByAmount } = counterSlice.actions


// export const { objectSelected } = planoDeContas.actions
// export default planoDeContas.reducer













// import redux from 'redux';
// const createStore = redux.createStore

// const OBJECT = 'OBJECT'

// //actions 
// function getObject(objt){
//  return {
//   type: OBJECT,
//   info: 'object plano de contas',
//   payload: objt
//  }
// }

// const initialState = {
//     id:  0,
//     key: "",
//     label: "",
//     children: []
// }

// //reducer 
// function reducer (prevState = initialState, action){
//   switch(action.type) {
//    case OBJECT: 
//    return {
//     ...prevState,
//        id: action.payload.id,
//        key: action.payload.key,
//        label: action.payload.label,
//        children: action.payload.children
//     }
//     default:
//       return prevState
//   }
// }

// //store
// export const store = createStore(reducer)


// console.log("Initial state", store.getState())
// store.dispatch(getObject("Cespdev"))
// console.log("New state", store.getState())





import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: 'plano',
  initialState: {
    id:  0,
    key: "",
    label: "",
    children: []
  },
  
  reducers: {
    changePlano(state, {payload}) {
      return {...state, id: payload.id, key: payload.key, label: payload.label, children: payload.children}
    }
  }
})


export const { changePlano } = slice.actions

export const selectPlano = (state: any) => [...state]

export default slice.reducer