import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rootState: {
    scrollStatus: true,
    currentRest: ''
  },
};

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setScrollStatus({ rootState }, { payload }) {
      rootState.scrollStatus = payload;
    },
  },
});

export const {
  actions: { setScrollStatus },
  reducer,
} = rootSlice;

export default reducer;
