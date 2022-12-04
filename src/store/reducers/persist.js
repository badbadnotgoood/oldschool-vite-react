import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  persistState: {
    basket: [],
  },
};

const staticSlice = createSlice({
  name: 'persist',
  initialState,
  reducers: {
    addToBasket({ persistState }, { payload }) {
      persistState.basket.push(payload);
    },
    clearBasket({ persistState }) {
      persistState.basket = [];
    },
  },
});

export const {
  actions: { addToBasket, clearBasket },
  reducer,
} = staticSlice;

export default reducer;
