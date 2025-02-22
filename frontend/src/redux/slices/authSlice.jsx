import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: storedUser,
  addresses: storedUser?.addresses || [],
  isAuthenticated: !!storedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.addresses = user.addresses || [];
      state.isAuthenticated = true;

      // Persist user details in localStorage (not the token)
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.addresses = [];
      state.isAuthenticated = false;

      // Clear storage
      localStorage.removeItem("user");
    },
  },
});

export const { signInSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
