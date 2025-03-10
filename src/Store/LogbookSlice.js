import { createSlice } from '@reduxjs/toolkit';

const initialState = { blockTime: '', airTime: '', taxiTime: '' };

const logbookSlice = createSlice({

  name: 'expa',
  initialState,
  reducers: {

    setExpa(state, action) {
      state.blockTime = action.payload.block_time_string,
      state.airTime = action.payload.air_time_string,
      state.taxiTime = action.payload.taxi_time_string;
    },

  },

});

export const { setExpa } = logbookSlice.actions;
export default logbookSlice.reducer;
