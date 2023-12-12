import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { logged: false, login: "" };



 export const fetchLogged = createAsyncThunk(
    'logged/fetchLogged',

    async () => {
        const response = await axios.post("http://localhost:8080/api/", { logged: true });

        return response.data;

    },
);


const loginSlice = createSlice({


    name: 'logged',
    initialState,
    reducers: {

        setLogin(state, action) {

            state.logged = true;
            state.login = action.payload.login;

        },

        setLogout(state, action) {

            state.logged = false;
        },

        
    },
    extraReducers: (builder) => {

        builder.addCase(fetchLogged.fulfilled, (state, action) => {

           
            state.logged = action.payload.logged;

        })
    }
        
});


export const { setLogin, setLogout } = loginSlice.actions;
export default loginSlice.reducer; 