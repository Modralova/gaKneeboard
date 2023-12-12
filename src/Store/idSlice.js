import { createSlice } from "@reduxjs/toolkit";



const initialState = {id:""};


const idSlice = createSlice({


    name: 'id',
    initialState,
    reducers: {

        setId(state, action) {

             state.id = action.payload.id

        }

        
    }

});


export const { setId } = idSlice.actions;
export default idSlice.reducer; 