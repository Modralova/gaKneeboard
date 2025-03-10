import { createSlice } from '@reduxjs/toolkit';

const initialState = { routeName: '' };

const routeNameSlice = createSlice({

  name: 'routeName',
  initialState,
  reducers: {

    setRouteNameR(state, action) {
      state.routeName = action.payload.routeName;
    },

  },

});

export const { setRouteNameR } = routeNameSlice.actions;
export default routeNameSlice.reducer;
