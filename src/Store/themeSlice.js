import { createSlice } from "@reduxjs/toolkit";



const initialState = {theme: "ligth"};


const themeSlice = createSlice({


    name: 'id',
    initialState,
    reducers: {

        setTheme(state, action) {

             state.theme = state.theme === "ligth" ? "dark" : "ligth"

        }

        
    }

});


export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer; 