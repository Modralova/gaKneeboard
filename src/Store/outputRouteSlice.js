import { createSlice } from '@reduxjs/toolkit';

const initialState = { route: [] };

const routeOutput = createSlice({

  name: 'route',
  initialState,
  reducers: {

    routeSave(state, action) {

      state.route = [...action.payload.newRoute].toReversed();
    },
  },
});

export const { routeSave } = routeOutput.actions;
export default routeOutput.reducer;
