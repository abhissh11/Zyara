import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === product._id
      );

      if (existingItem) {
        // Increase quantity of existing product
        existingItem.quantity += 1;
      } else {
        // Add new product to cart with quantity 1
        state.cartItems.push({ ...product, quantity: 1 });
      }

      // Update total quantity and price
      state.totalQuantity += 1;
      state.totalPrice += product.price;
    },

    removeFromCart: (state, action) => {
      const productId = action.payload._id;
      const existingItem = state.cartItems.find(
        (item) => item._id === productId
      );

      if (existingItem) {
        if (existingItem.quantity === 1) {
          // Remove item if it's the last one
          state.cartItems = state.cartItems.filter(
            (item) => item._id !== productId
          );
        } else {
          // Reduce quantity if more than 1
          existingItem.quantity -= 1;
        }

        // Update total quantity and price
        state.totalQuantity -= 1;
        state.totalPrice -= existingItem.price;
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
