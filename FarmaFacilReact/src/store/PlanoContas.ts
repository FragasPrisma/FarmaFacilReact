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