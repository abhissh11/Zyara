import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.error = null;
    },
    setUserOrders: (state, action) => {
      state.orders = action.payload;
      state.error = null;
    },
  },
});

export const { clearOrders, setUserOrders } = orderSlice.actions;
export default orderSlice.reducer;
