import { createSlice } from '@reduxjs/toolkit';

const initialState = { route: [] };

const routeSlice = createSlice({

  name: 'route',
  initialState,
  reducers: {

    routeUpdate(state, action) {
      state.route = [...action.payload.newRoute];
    },

    routeDelete(state) {
      state.route = [];
    },

    updateSection(state, action) {
      const toUpdate = { ...action.payload.section };

      const INDEX = state.route.indexOf(state.route.find((section) => section.id === toUpdate.id));

      const newRoute = [...state.route];

      newRoute[INDEX] = toUpdate;

      state.route = [...newRoute];
    },
    removeSection(state, action) {
      state.route = [...state.route.filter((section) => section.id !== action.payload.id)];
    },

  },

});

export const {
  routeUpdate, routeDelete, updateSection, removeSection,
} = routeSlice.actions;
export default routeSlice.reducer;
