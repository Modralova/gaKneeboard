import { createSlice } from '@reduxjs/toolkit';

const initialState = { id: '', logbookId: '' };

const idSlice = createSlice({

  name: 'id',
  initialState,
  reducers: {

    setId(state, action) {
      state.id = action.payload.id;
    },
    setLogbookId(state, action) {
      state.logbookId = action.payload.logbookId;
    },

  },

});

export const { setId, setLogbookId } = idSlice.actions;
export default idSlice.reducer;
