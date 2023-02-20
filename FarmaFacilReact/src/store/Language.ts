import { createSlice } from "@reduxjs/toolkit";

export const sliceIdioma = createSlice({
  name: 'language',
  initialState: {
    idioma : "pt"
  },
  
  reducers: {
    changeLanguage(state, {payload}) {
      return {...state, idioma : payload.language, name : payload.name}
    }
  }
})


export const { changeLanguage } = sliceIdioma.actions

export const selectLanguage = (state: any) => [...state]

export default sliceIdioma.reducer