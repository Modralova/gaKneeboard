import { createSlice } from "@reduxjs/toolkit";



const initialState = { profileView: false, mainView: true };


const viewSlice = createSlice({


    name: 'view',
    initialState,
    reducers: {



        setProfileView(state, action) {

            

            state.profileView = state.profileView == false ? true : false,
            state.mainView = state.profileView == true ? false : true

           

        }

    }




});


export const { setProfileView } = viewSlice.actions;
export default viewSlice.reducer; 