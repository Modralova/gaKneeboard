import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false, showQuery: false, message: '', issue: 'info', data: {},
};

const alertSlice = createSlice({

  name: 'alert',
  initialState,
  reducers: {

    setAlert(state, action) {
      state.show = true,
      state.message = action.payload.message,
      state.issue = action.payload.issue,
      state.data = action.payload.data;
    },
    alertQuery(state, action) {
      state.showQuery = true,
      state.issue = action.payload.issue,
      state.message = action.payload.message,
      state.data = action.payload.data;
    },
    alertResponse(state, action) {
      state.showQuery = false,
      state.show = true,
      state.issue = 'success',
      state.message = action.payload.message,
      state.data = {};
    },
    unsetAlert(state) {
      state.show = false,
      state.showQuery = false,
      state.data = {},
      state.message = '';
    },

  },

});

export const {
  setAlert, alertQuery, alertResponse, unsetAlert,
} = alertSlice.actions;
export default alertSlice.reducer;
