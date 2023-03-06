import { createSlice } from "@reduxjs/toolkit";

export const sliceApagar = createSlice({
  name: 'apagar',
  initialState: {
    paga : false
  },
  
  reducers: {
    changeApagar(state, {payload}) {
      return {...state, paga : payload}
    }
  }
})


export const { changeApagar } = sliceApagar.actions

export const selectApagar = (state: any) => [...state]

export default sliceApagar.reducer