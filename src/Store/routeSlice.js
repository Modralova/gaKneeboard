import { createSlice } from "@reduxjs/toolkit";

const initialState = { route: [] };

const routeSlice = createSlice({


    name: 'route',
    initialState,
    reducers: {

        routeUpdate(state, action) {

            console.log("state: ", state.route)

            state.route = [...action.payload.newRoute];
            console.log("state: ", state.route)
        },

        routeDelete(state, action) {

            state.route = [];

        },

        updateSection(state, action) {

         

            let toUpdate = { ...action.payload.section };

            let INDEX = state.route.indexOf(state.route.find(section => section.id === toUpdate.id));

            let newRoute = [...state.route];

            newRoute[INDEX] = toUpdate;

            state.route = [...newRoute];

        },
        removeSection(state,action){

            console.log("removeSecton: ", action)

           state.route =  [...state.route.filter(section => section.id !== action.payload.id)]
        }



    }

});


export const { routeUpdate, routeDelete, updateSection, removeSection } = routeSlice.actions;
export default routeSlice.reducer; 