import { createSlice } from '@reduxjs/toolkit';

const initialState = { id: '' };

const profileSlice = createSlice({

  name: 'profile',
  initialState,
  reducers: {

    setProfile(state, action) {
      state.id = action.payload.id;
    },

  },

});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
