import { createSlice } from "@reduxjs/toolkit";



const initialState = {plane: ""};


const planeSlice = createSlice({


    name: 'plane',
    initialState,
    reducers: {

        setSigns(state, action) {

             state.plane = action.payload.plane

        }

        
    }

});


export const { setSigns } = planeSlice.actions;

export default planeSlice.reducer; 