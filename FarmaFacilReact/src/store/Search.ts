import { createSlice } from "@reduxjs/toolkit";

export const search = createSlice({
    name: 'search',
    initialState: {
        searchSelect: "",
        location : window.location.pathname
    },

    reducers: {
        changeSearch(state, { payload }) {
            return { ...state, searchSelect: payload.value , location : payload.location}
        },
        // resetSearch(state) {
        //     return { ...state, searchSelect: "" }
        // }
    }
})


export const { changeSearch } = search.actions

export const selectLanguage = (state: any) => [...state]

export default search.reducer