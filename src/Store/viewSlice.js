import { createSlice } from '@reduxjs/toolkit';

const initialState = { profileView: false, mainView: true };

const viewSlice = createSlice({

  name: 'view',
  initialState,
  reducers: {

    setProfileView(state) {
      state.profileView = state.profileView === false,
      state.mainView = state.profileView !== true;
    },

  },

});

export const { setProfileView } = viewSlice.actions;
export default viewSlice.reducer;
